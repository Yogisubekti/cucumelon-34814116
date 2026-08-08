export type NFTItem = {
  id: string;
  image: string;
  name: string;
  rarity: string;
};

export function NFTCard({ item }: { item: NFTItem }) {
  return (
    <article className="group border-4 border-border bg-card shadow-pixel transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.03]">
      <div className="scanlines overflow-hidden border-b-4 border-border">
        <img
          src={item.image}
          alt={`${item.name} pixel art NFT`}
          width={640}
          height={640}
          loading="lazy"
          className="pixelated aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <h3 className="font-display text-[11px] tracking-tight">{item.name}</h3>
        <span className="border-2 border-border bg-lime px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
          {item.rarity}
        </span>
      </div>
    </article>
  );
}
