const traits = [
  {
    name: "Body",
    rarity: "Common",
    icon: [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [0, 1, 1, 0],
    ],
    values: ["Zombie", "Classic", "Special"],
  },
  {
    name: "Glasses",
    rarity: "Uncommon",
    icon: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [0, 0, 0, 0],
    ],
    values: ["3D", "Classic", "Rare"],
  },
  {
    name: "Hat",
    rarity: "Rare",
    icon: [
      [0, 1, 1, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    values: ["Crown", "Cap", "Special"],
  },
  {
    name: "Background",
    rarity: "Epic",
    icon: [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ],
    values: ["Light Lime", "Lime", "Emerald", "Dark Green", "Other rare colors"],
  },
  {
    name: "Accessories",
    rarity: "Legendary",
    icon: [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 1],
    ],
    values: ["Various unique accessories"],
  },
];

function PixelIcon({ grid }: { grid: number[][] }) {
  return (
    <div className="grid w-fit grid-cols-4 gap-0.5" aria-hidden>
      {grid.flat().map((cell, i) => (
        <span key={i} className={`h-2.5 w-2.5 ${cell ? "bg-ink" : "bg-transparent"}`} />
      ))}
    </div>
  );
}

export function Traits() {
  return (
    <section id="traits" className="border-b-4 border-border bg-card pixel-grid">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-[clamp(1.25rem,5vw,2.5rem)]">Build your Cucumelon</h2>
        <p className="mt-4 max-w-lg text-base font-medium text-muted-foreground">
          No two Cucumelons have to feel the same.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {traits.map((t) => (
            <div
              key={t.name}
              className="border-4 border-border bg-background p-6 shadow-pixel-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <PixelIcon grid={t.icon} />
                <span className="border-2 border-border bg-emerald px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {t.rarity}
                </span>
              </div>
              <h3 className="mt-5 font-display text-sm">{t.name}</h3>
              <ul className="mt-4 space-y-1.5">
                {t.values.map((v) => (
                  <li key={v} className="flex items-center gap-2 text-sm font-medium">
                    <span className="inline-block h-1.5 w-1.5 bg-ink" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
