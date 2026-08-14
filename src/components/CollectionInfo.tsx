const stats = [
  { value: "3,333", label: "NFTs" },
  { value: "Pixel", label: "Art style" },
  { value: "Robinhood", label: "Chain" },
  { value: "Open", label: "Collection" },
];

export function CollectionInfo() {
  return (
    <section className="border-b-4 border-border bg-emerald">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-4 border-border bg-background p-6 shadow-pixel">
            <p className="break-words font-display text-lg md:text-xl">{s.value}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
