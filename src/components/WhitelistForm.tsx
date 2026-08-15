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
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80, "Name must be at most 80 characters"),
  twitter_username: z
    .string()
    .trim()
    .transform((v) => v.replace(/^@/, ""))
    .pipe(
      z
        .string()
        .min(2, "X username must be at least 2 characters")
        .max(40, "X username must be at most 40 characters")
        .regex(/^[A-Za-z0-9_]+$/, "X username can only contain letters, numbers, and underscores"),
    ),
  wallet_address: z
    .string()
    .trim()
    .min(8, "Wallet address is invalid")
    .max(120, "Wallet address is too long")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Use a valid EVM address (0x...)"),
  note: z.string().trim().max(300, "Note can be at most 300 characters").optional(),
});

const STAGES = [
  { value: "GTD", label: "GTD", desc: "Guaranteed spot — guaranteed mint slot." },
  { value: "FCFS", label: "FCFS", desc: "First come, first served — fight for remaining slots." },
] as const;

const TASKS = [
  { key: "followed", icon: UserPlus, label: "Follow @cucumelonNFT on X" },
  { key: "liked", icon: Heart, label: "Like the freemint announcement post" },
  { key: "shared", icon: Repeat2, label: "Repost / share that post" },
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
      toast.error("Please check your data.");
      return;
    }

    if (!allTasksDone) {
      toast.error("You must complete follow, like, and share first.");
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
        toast.error("This X username or wallet address is already registered.");
        return;
      }
      toast.error("Submission failed. Please try again shortly.");
      return;
    }

    setDone(true);
    toast.success("Entry submitted! Your data will be reviewed.");
  }

  return (
    <section id="whitelist" className="relative overflow-hidden border-b-4 border-border bg-darkgreen">
      <PixelDecor className="opacity-60" />
      <div className="relative mx-auto max-w-3xl px-5 py-24 md:px-8 md:py-32">
        <div className="text-center">
          <span className="inline-block border-2 border-lime px-3 py-1 font-display text-[0.6rem] text-lime">
            FREEMINT WAITLIST
          </span>
          <h2 className="mt-6 break-words font-display text-[clamp(1.1rem,5vw,2.5rem)] text-lime">
            Claim Your Spot
          </h2>
          <p className="mt-5 text-base font-medium text-paper/80">
            Fill out this form to compete for the <strong className="text-paper">GTD</strong> and{" "}
            <strong className="text-paper">FCFS</strong> lists in the freemint stage. All data will be reviewed
            manually.
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
              Thank you! Your data is in the review queue. Make sure you keep following @cucumelonNFT so you don't miss
              the GTD & FCFS list announcement.
            </p>
          </div>
        ) : closed && ready ? (
          <div className="mt-12 border-4 border-border bg-background/95 p-8 text-center">
            <h3 className="font-display text-sm text-foreground">Registration Closed</h3>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              The waitlist form has closed 5 hours before mint begins. Follow our X for the final list announcement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 border-4 border-border bg-background/95 p-6 md:p-8">
            {/* Tasks */}
            <fieldset>
              <legend className="font-display text-[0.65rem] text-foreground">1. Mandatory Tasks</legend>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                All tasks are mandatory. We manually verify each one before finalizing the list.
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
                    placeholder="Name or nickname"
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
                    placeholder="Your contribution to the community, repost link, etc."
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
                "Submit Waitlist Entry"
              )}
            </Button>
            {!allTasksDone && (
              <p className="mt-3 text-center text-xs font-semibold text-muted-foreground">
                Complete all three tasks first to enable the button.
              </p>
            )}
            <p className="mt-4 text-center text-xs font-medium text-muted-foreground">
              One entry per person. Duplicate X usernames and wallets will be rejected automatically.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
