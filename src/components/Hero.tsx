import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PixelDecor } from "@/components/PixelDecor";
import { OPENSEA_URL } from "@/lib/constants";
import heroImg from "@/assets/hero-cucumelon.png";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pixel-grid border-b-4 border-border">
      <PixelDecor />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-2">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 font-display text-[10px] tracking-tight">
            <span className="inline-block h-2 w-2 animate-blink bg-emerald" />
            MINTING SOON
          </span>

          <h1 className="mt-6 break-words font-display text-[clamp(1.5rem,4.8vw,3.5rem)] leading-none">
            CUCUMELON
          </h1>


          <h2 className="mt-5 font-display text-[clamp(0.85rem,3.2vw,1.5rem)] leading-relaxed text-emerald">
            Fresh pixels.
            <br />
            Weird characters.
          </h2>

          <p className="mt-5 max-w-md text-base font-medium text-muted-foreground">
            A pixel-powered NFT collection growing on Robinhood Chain.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="pixel" size="xl" className="w-full sm:w-auto">
              <a href={OPENSEA_URL} target="_blank" rel="noreferrer noopener">
                View collection <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="pixelOutline" size="xl" className="w-full sm:w-auto">
              <a href="#traits">Explore the traits</a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-x-8 top-8 bottom-8 border-2 border-border bg-lime" />
          <img
            src={heroImg}
            alt="Cucumelon pixel art character wearing a crown and 3D glasses"
            width={1024}
            height={1024}
            className="pixelated relative w-[min(100%,26rem)] animate-float drop-shadow-[8px_8px_0_var(--ink)]"
          />
        </div>
      </div>
    </section>
  );
}
