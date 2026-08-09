import heroAsset from "@/assets/cuke-8.asset.json";

export function About() {
  return (
    <section id="about" className="border-b-4 border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[1fr_auto] md:px-8 md:py-28">
        <div>
          <h2 className="font-display text-[clamp(1.25rem,5vw,2.5rem)]">What is Cucumelon?</h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base font-medium text-foreground/80 md:text-lg">
            <p>
              Cucumelon is a collection of unique pixel characters created from a simple idea: take
              something fresh, turn it weird, and give every character its own personality.
            </p>
            <p>
              Built for collectors who love pixel art, internet culture and playful digital
              collectibles.
            </p>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="scanlines border-4 border-border bg-lime p-6 shadow-pixel">
            <img
              src={heroImg}
              alt="Small pixel cucumber melon icon"
              width={1024}
              height={1024}
              loading="lazy"
              className="pixelated h-32 w-32 object-contain md:h-44 md:w-44"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
