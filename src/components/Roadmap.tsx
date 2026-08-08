const stages = [
  {
    id: "01",
    title: "The Sprout",
    items: ["Collection identity", "Artwork", "Community building"],
  },
  {
    id: "02",
    title: "The Growth",
    items: ["Collection launch", "Collector community", "Social expansion"],
  },
  {
    id: "03",
    title: "The Melonverse",
    items: ["Future collaborations", "New characters", "New experiments"],
  },
];

export function Roadmap() {
  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-[clamp(1.25rem,5vw,2.5rem)]">The Journey</h2>

        <ol className="mt-12 grid gap-6 lg:grid-cols-3">
          {stages.map((s) => (
            <li key={s.id} className="border-4 border-border bg-card p-6 shadow-pixel">
              <div className="flex items-center gap-3">
                <span className="border-2 border-border bg-ink px-2 py-1 font-display text-[10px] text-lime">
                  {s.id}
                </span>
                <h3 className="font-display text-sm">{s.title}</h3>
              </div>
              <ul className="mt-5 space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-medium">
                    <span className="inline-block h-1.5 w-1.5 bg-emerald" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Roadmap is subject to change as Cucumelon grows.
        </p>
      </div>
    </section>
  );
}
