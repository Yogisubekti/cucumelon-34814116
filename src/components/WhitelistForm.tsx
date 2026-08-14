import { useEffect, useState } from "react";
import { z } from "zod";
import { Check, Loader2, ArrowUpRight, Heart, Repeat2, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PixelDecor } from "@/components/PixelDecor";
import { supabase } from "@/integrations/supabase/client";
import { FORM_DEADLINE, TWITTER_URL } from "@/lib/constants";

const schema = z.object({
  name: z.string().trim().min(2, "Name minimal 2 karakter").max(80, "Name maksimal 80 karakter"),
  twitter_username: z
    .string()
    .trim()
    .transform((v) => v.replace(/^@/, ""))
    .pipe(
      z
        .string()
        .min(2, "Username X minimal 2 karakter")
        .max(40, "Username X maksimal 40 karakter")
        .regex(/^[A-Za-z0-9_]+$/, "Username X hanya huruf, angka, dan underscore"),
    ),
  wallet_address: z
    .string()
    .trim()
    .min(8, "Alamat dompet tidak valid")
    .max(120, "Alamat dompet terlalu panjang")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Gunakan alamat EVM yang valid (0x...)"),
  note: z.string().trim().max(300, "Catatan maksimal 300 karakter").optional(),
});

const STAGES = [
  { value: "GTD", label: "GTD", desc: "Guaranteed spot — dijamin kebagian slot mint." },
  { value: "FCFS", label: "FCFS", desc: "First come, first served — rebutan sisa slot." },
] as const;

const TASKS = [
  { key: "followed", icon: UserPlus, label: "Follow @_cucumelon di X" },
  { key: "liked", icon: Heart, label: "Like postingan pengumuman freemint" },
  { key: "shared", icon: Repeat2, label: "Repost / share postingan tersebut" },
] as const;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function useDeadline() {
  const [state, setState] = useState<{ ready: boolean; closed: boolean; label: string }>({
    ready: false,
    closed: false,
    label: "",
  });

  useEffect(() => {
    const tick = () => {
      const diff = FORM_DEADLINE.getTime() - Date.now();
      if (diff <= 0) {
        setState({ ready: true, closed: true, label: "Closed" });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setState({ ready: true, closed: false, label: `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s` });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return state;
}

export function WhitelistForm() {
  const { ready, closed, label } = useDeadline();
  const [stage, setStage] = useState<"GTD" | "FCFS">("GTD");
  const [tasks, setTasks] = useState({ followed: false, liked: false, shared: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const allTasksDone = tasks.followed && tasks.liked && tasks.shared;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (closed || submitting) return;

    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(form.get("name") ?? ""),
      twitter_username: String(form.get("twitter_username") ?? ""),
      wallet_address: String(form.get("wallet_address") ?? ""),
      note: String(form.get("note") ?? "") || undefined,
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Periksa lagi datamu.");
      return;
    }

    if (!allTasksDone) {
      toast.error("Wajib follow, like, dan share dulu ya.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    const { error } = await supabase.from("whitelist_entries").insert({
      ...parsed.data,
      note: parsed.data.note ?? null,
      stage,
      followed: true,
      liked: true,
      shared: true,
    });

    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast.error("Username X atau alamat dompet ini sudah terdaftar.");
        return;
      }
      toast.error("Gagal mengirim. Coba lagi sebentar lagi.");
      return;
    }

    setDone(true);
    toast.success("Pendaftaran terkirim! Data kamu akan kami tinjau.");
  }

  return (
    <section id="whitelist" className="relative overflow-hidden border-b-4 border-border bg-darkgreen">
      <PixelDecor className="opacity-60" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
        <div className="text-center">
          <span className="inline-block border-2 border-lime px-3 py-1 font-display text-[0.6rem] text-lime">
            FREEMINT WHITELIST
          </span>
          <h2 className="mt-6 break-words font-display text-[clamp(1.1rem,5vw,2.5rem)] text-lime">
            Claim Your Spot
          </h2>
          <p className="mt-5 text-base font-medium text-paper/80">
            Isi formulir ini untuk berlomba masuk daftar <strong className="text-paper">GTD</strong> dan{" "}
            <strong className="text-paper">FCFS</strong> di stage freemint. Semua data akan ditinjau manual.
          </p>
          <p className="mt-4 font-display text-[0.65rem] text-paper/70" aria-live="polite">
            {ready ? (closed ? "FORM CLOSED" : `CLOSES IN ${label}`) : "LOADING…"}
          </p>
        </div>

        {done ? (
          <div className="mt-12 border-4 border-lime bg-background/95 p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border-4 border-border bg-lime">
              <Check className="text-ink" />
            </div>
            <h3 className="mt-6 font-display text-sm text-foreground">Submission Received</h3>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Terima kasih! Datamu masuk antrean review. Pastikan kamu tetap follow @_cucumelon supaya tidak
              terlewat pengumuman daftar GTD & FCFS.
            </p>
          </div>
        ) : closed && ready ? (
          <div className="mt-12 border-4 border-border bg-background/95 p-8 text-center">
            <h3 className="font-display text-sm text-foreground">Pendaftaran Ditutup</h3>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              Formulir whitelist sudah ditutup 5 jam sebelum mint dimulai. Pantau X kami untuk pengumuman
              daftar final.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 border-4 border-border bg-background/95 p-6 md:p-8">
            {/* Tasks */}
            <fieldset>
              <legend className="font-display text-[0.65rem] text-foreground">1. Mandatory Tasks</legend>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                Wajib selesai semua. Kami cek manual sebelum menetapkan daftar.
              </p>
              <div className="mt-5 space-y-3">
                {TASKS.map(({ key, icon: Icon, label: taskLabel }) => {
                  const checked = tasks[key];
                  return (
                    <div
                      key={key}
                      className="flex flex-wrap items-center gap-3 border-2 border-border bg-card p-3"
                    >
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        aria-label={taskLabel}
                        onClick={() => setTasks((t) => ({ ...t, [key]: !t[key] }))}
                        className={`flex h-7 w-7 shrink-0 items-center justify-center border-2 border-border ${
                          checked ? "bg-emerald" : "bg-background"
                        }`}
                      >
                        {checked && <Check size={16} className="text-ink" />}
                      </button>
                      <Icon size={16} className="shrink-0 text-muted-foreground" />
                      <span className="flex-1 text-sm font-semibold text-foreground">{taskLabel}</span>
                      <a
                        href={TWITTER_URL}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-emerald hover:underline"
                      >
                        Open <ArrowUpRight size={12} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Stage */}
            <fieldset className="mt-9">
              <legend className="font-display text-[0.65rem] text-foreground">2. Target Stage</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {STAGES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    aria-pressed={stage === s.value}
                    onClick={() => setStage(s.value)}
                    className={`border-2 border-border p-4 text-left transition-colors ${
                      stage === s.value ? "bg-lime" : "bg-card hover:bg-muted"
                    }`}
                  >
                    <span className="font-display text-[0.7rem] text-ink">{s.label}</span>
                    <span className="mt-2 block text-xs font-medium text-ink/70">{s.desc}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Data */}
            <fieldset className="mt-9">
              <legend className="font-display text-[0.65rem] text-foreground">3. Your Data</legend>
              <div className="mt-5 space-y-5">
                <div>
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    maxLength={80}
                    required
                    placeholder="Nama atau nickname"
                    className="mt-2 rounded-none border-2 border-border"
                  />
                  {errors['name'] && <p className="mt-2 text-xs font-semibold text-destructive">{errors['name']}</p>}
                </div>

                <div>
                  <Label htmlFor="twitter_username" className="text-xs font-bold uppercase tracking-widest">
                    X (Twitter) Username
                  </Label>
                  <Input
                    id="twitter_username"
                    name="twitter_username"
                    maxLength={41}
                    required
                    placeholder="@username"
                    className="mt-2 rounded-none border-2 border-border"
                  />
                  {errors['twitter_username'] && (
                    <p className="mt-2 text-xs font-semibold text-destructive">{errors['twitter_username']}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="wallet_address" className="text-xs font-bold uppercase tracking-widest">
                    Wallet Address
                  </Label>
                  <Input
                    id="wallet_address"
                    name="wallet_address"
                    maxLength={120}
                    required
                    placeholder="0x..."
                    className="mt-2 rounded-none border-2 border-border font-mono"
                  />
                  {errors['wallet_address'] && (
                    <p className="mt-2 text-xs font-semibold text-destructive">{errors['wallet_address']}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="note" className="text-xs font-bold uppercase tracking-widest">
                    Note <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="note"
                    name="note"
                    maxLength={300}
                    rows={3}
                    placeholder="Kontribusi kamu ke komunitas, link repost, dll."
                    className="mt-2 rounded-none border-2 border-border"
                  />
                  {errors['note'] && <p className="mt-2 text-xs font-semibold text-destructive">{errors['note']}</p>}
                </div>
              </div>
            </fieldset>

            <Button
              type="submit"
              variant="pixel"
              size="xl"
              disabled={submitting || !allTasksDone}
              className="mt-9 w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" /> Submitting…
                </>
              ) : (
                "Submit Whitelist Entry"
              )}
            </Button>
            {!allTasksDone && (
              <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">
                Centang ketiga task dulu untuk mengaktifkan tombol.
              </p>
            )}
            <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
              Satu orang satu entry. Username X & wallet ganda otomatis ditolak.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
