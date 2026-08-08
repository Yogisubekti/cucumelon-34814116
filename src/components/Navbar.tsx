import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OPENSEA_URL } from "@/lib/constants";

const links = [
  { label: "Home", href: "#home" },
  { label: "Collection", href: "#collection" },
  { label: "Traits", href: "#traits" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-block h-4 w-4 border-2 border-border bg-emerald" />
          <span className="font-display text-sm tracking-tight md:text-base">CUCUMELON</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-emerald"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button asChild variant="pixel" size="lg">
            <a href={OPENSEA_URL} target="_blank" rel="noreferrer noopener">
              View on OpenSea <ArrowUpRight />
            </a>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border-2 border-border bg-card md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t-4 border-border bg-background px-5 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-semibold uppercase tracking-widest"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="pixel" size="lg" className="mt-5 w-full">
            <a href={OPENSEA_URL} target="_blank" rel="noreferrer noopener">
              View on OpenSea <ArrowUpRight />
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
