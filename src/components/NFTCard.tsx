import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { OPENSEA_URL, RARITY_COLORS } from "@/lib/constants";

export type NFTItem = {
  id: string;
  image: string;
  name: string;
  rarity: string;
};

function RarityBadge({ rarity }: { rarity: string }) {
  const style = RARITY_COLORS[rarity] ?? RARITY_COLORS["Common"];
  return (
    <span
      className={`border-2 border-border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${style?.bg ?? "bg-muted-foreground/25"} ${style?.text ?? "text-foreground"}`}
    >
      {rarity}
    </span>
  );
}

export function NFTCard({ item }: { item: NFTItem }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <article className="group cursor-pointer border-4 border-border bg-card shadow-pixel transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.03]">
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
            <RarityBadge rarity={item.rarity} />
          </div>
        </article>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-none border-4 border-border bg-card p-0 shadow-pixel">
        <div className="scanlines border-b-4 border-border">
          <img
            src={item.image}
            alt={`${item.name} pixel art NFT`}
            width={1024}
            height={1024}
            className="pixelated aspect-square w-full object-cover"
          />
        </div>
        <DialogHeader className="p-6 text-left">
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="font-display text-base uppercase tracking-tight">
              {item.name}
            </DialogTitle>
            <RarityBadge rarity={item.rarity} />
          </div>
          <DialogDescription className="text-sm font-medium text-muted-foreground">
            Cucumelon #{item.id} — part of the pixel-powered collection. Every character has its
            own personality and traits.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6">
          <Button asChild variant="pixel" size="lg" className="w-full">
            <a href={OPENSEA_URL} target="_blank" rel="noreferrer noopener">
              View on OpenSea <ArrowUpRight />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
