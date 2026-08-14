export const OPENSEA_URL = "https://opensea.io/collection/cucumelon";
export const TWITTER_URL = "https://x.com/_cucumelon";

// Target date for the "Minting Soon" countdown.
// Update this to the real mint launch date.
// 16 August 2026, 20:00 WIB (UTC+7)
export const MINT_DATE = new Date("2026-08-16T13:00:00Z");

export const CONTACT_EMAIL = "waitlist@cucumelon.online";

export const RARITY_COLORS: Record<string, { bg: string; text: string }> = {
  Common: { bg: "bg-muted-foreground/25", text: "text-foreground" },
  Uncommon: { bg: "bg-emerald", text: "text-ink" },
  Rare: { bg: "bg-rare", text: "text-paper" },
  Epic: { bg: "bg-epic", text: "text-paper" },
  Legendary: { bg: "bg-legendary", text: "text-ink" },
};
