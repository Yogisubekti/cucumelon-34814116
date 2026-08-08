import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PixelDecor } from "@/components/PixelDecor";
import { OPENSEA_URL } from "@/lib/constants";

export function OpenSeaCTA() {
  return (
    <section className="relative overflow-hidden border-b-4 border-border bg-darkgreen">
      <PixelDecor className="opacity-70" />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
        <h2 className="break-words font-display text-[clamp(1.25rem,5.5vw,3rem)] text-lime">
          Ready to meet your Cucumelon?
        </h2>
        <p className="mt-6 text-base font-medium text-paper/80">
          Explore the collection on OpenSea.
        </p>
        <Button asChild variant="pixelLime" size="xl" className="mt-10 w-full sm:w-auto">
          <a href={OPENSEA_URL} target="_blank" rel="noreferrer noopener">
            Open Cucumelon on OpenSea <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}
