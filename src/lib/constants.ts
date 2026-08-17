export const BRAND_NAME = "CUCUMELON CLOUD";

export const OPENSEA_URL = "https://opensea.io/collection/cucumelon";
export const TWITTER_URL = "https://x.com/cucumelonNFT";

// The Saudishood — next drop
export const SAUDISHOOD_URL = "https://opensea.io/collection/the-saudishood";
// 20 August 2026, 21:00 WIB (UTC+7)
export const SAUDISHOOD_MINT_DATE = new Date("2026-08-20T14:00:00Z");

// Target date for the "Minting Soon" countdown (next upcoming mint).
export const MINT_DATE = SAUDISHOOD_MINT_DATE;

export const CONTACT_EMAIL = "waitlist@cucumelon.online";

// Whitelist form closes 5 hours before the next mint (20 Aug 2026, 16:00 WIB)
export const FORM_DEADLINE = new Date("2026-08-20T09:00:00Z");

export const RARITY_COLORS: Record<string, { bg: string; text: string }> = {
  Common: { bg: "bg-muted-foreground/25", text: "text-foreground" },
  Uncommon: { bg: "bg-emerald", text: "text-ink" },
  Rare: { bg: "bg-rare", text: "text-paper" },
  Epic: { bg: "bg-epic", text: "text-paper" },
  Legendary: { bg: "bg-legendary", text: "text-ink" },
};
