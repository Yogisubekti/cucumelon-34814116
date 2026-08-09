export const OPENSEA_URL = "https://opensea.io/collection/cucumelon";
export const TWITTER_URL = "https://x.com/_cucumelon";

// Target date for the "Minting Soon" countdown.
// Update this to the real mint launch date.
export const MINT_DATE = new Date("2026-09-01T00:00:00Z");

export const RARITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Common: { bg: "bg-muted-foreground/20", text: "text-foreground", border: "border-border" },
  Uncommon: { bg: "bg-emerald", text: "text-ink", border: "border-border" },
  Rare: { bg: "bg-blue-500", text: "text-white", border: "border-border" },
  Epic: { bg: "bg-purple-500", text: "text-white", border: "border-border" },
  Legendary: { bg: "bg-yellow-400", text: "text-ink", border: "border-border" },
};
