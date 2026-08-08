import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NFTCard, type NFTItem } from "@/components/NFTCard";
import { OPENSEA_URL } from "@/lib/constants";
import n1 from "@/assets/cuke-1.asset.json";
import n2 from "@/assets/cuke-2.asset.json";
import n3 from "@/assets/cuke-3.asset.json";
import n5 from "@/assets/cuke-5.asset.json";
import n6 from "@/assets/cuke-6.asset.json";
import n7 from "@/assets/cuke-7.asset.json";

const items: NFTItem[] = [
  { id: "001", image: n1.url, name: "Cucumelon #001", rarity: "Rare" },
  { id: "002", image: n2.url, name: "Cucumelon #002", rarity: "Legendary" },
  { id: "003", image: n3.url, name: "Cucumelon #003", rarity: "Common" },
  { id: "004", image: n5.url, name: "Cucumelon #004", rarity: "Uncommon" },
  { id: "005", image: n6.url, name: "Cucumelon #005", rarity: "Epic" },
  { id: "006", image: n7.url, name: "Cucumelon #006", rarity: "Rare" },
];

export function CollectionGrid() {
  return (
    <section id="collection" className="border-b-4 border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <h2 className="font-display text-[clamp(1.25rem,5vw,2.5rem)]">Meet the Cucumelons</h2>
        <p className="mt-4 max-w-lg text-base font-medium text-muted-foreground">
          Every Cucumelon has its own personality.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NFTCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-12">
          <Button asChild variant="pixel" size="xl" className="w-full sm:w-auto">
            <a href={OPENSEA_URL} target="_blank" rel="noreferrer noopener">
              View all on OpenSea <ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
