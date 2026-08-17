import { ArrowUpRight, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OPENSEA_URL, SAUDISHOOD_URL } from "@/lib/constants";

const drops = [
  {
    name: "CUCUMELON",
    status: "Freemint",
    date: "16 August 2026 — 20:00 WIB",
    supply: "3,333 NFT",
    url: OPENSEA_URL,
  },
  {
    name: "THE SAUDISHOOD",
    status: "Next drop",
    date: "20 August 2026 — 21:00 WIB",
    supply: "New collection",
    url: SAUDISHOOD_URL,
  },
];

export function MintSchedule() {
  return (
    <section id="mint-schedule" className="border-b-4 border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 border-2 border-border bg-lime px-3 py-1 font-display text-[0.6rem] text-ink">
              <CalendarClock size={12} /> MINT SCHEDULE
            </span>
            <h2 className="mt-5 break-words font-display text-[clamp(1.1rem,5vw,2.5rem)]">
              Upcoming Drops
            </h2>
          </div>
          <p className="max-w-sm text-sm font-medium text-muted-foreground">
            Two pixel drops from the Cucumelon Cloud universe. Set your alarms — times are in WIB
            (UTC+7).
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {drops.map((d) => (
            <article key={d.name} className="border-4 border-border bg-card p-6 shadow-pixel md:p-8">
              <span className="inline-block border-2 border-border bg-emerald px-2 py-1 font-display text-[0.55rem] text-ink">
                {d.status}
              </span>
              <h3 className="mt-5 break-words font-display text-[clamp(0.9rem,3.5vw,1.4rem)]">
                {d.name}
              </h3>
              <dl className="mt-5 space-y-3 text-sm font-medium">
                <div className="flex justify-between gap-4 border-b-2 border-border/40 pb-2">
                  <dt className="text-muted-foreground">Mint date</dt>
                  <dd className="text-right font-semibold text-foreground">{d.date}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Supply</dt>
                  <dd className="text-right font-semibold text-foreground">{d.supply}</dd>
                </div>
              </dl>
              <Button asChild variant="pixelOutline" size="lg" className="mt-7 w-full sm:w-auto">
                <a href={d.url} target="_blank" rel="noreferrer noopener">
                  View on OpenSea <ArrowUpRight />
                </a>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 border-4 border-border bg-darkgreen p-6 md:flex-row md:p-8">
          <video
            src="/saudishood.mp4"
            poster="/saudishood-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="The Saudishood pixel art animation"
            className="pixelated w-[min(100%,16rem)] border-4 border-border"
          />
          <div>
            <h3 className="break-words font-display text-[clamp(0.9rem,3.5vw,1.4rem)] text-lime">
              The Saudishood
            </h3>
            <p className="mt-4 text-sm font-medium text-paper/80">
              A fresh pixel crew joining the Cucumelon Cloud lineup. Minting 20 August 2026 at 21:00
              WIB.
            </p>
            <Button asChild variant="pixelLime" size="lg" className="mt-6 w-full sm:w-auto">
              <a href={SAUDISHOOD_URL} target="_blank" rel="noreferrer noopener">
                Explore The Saudishood <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
