import { CONTACT_EMAIL, OPENSEA_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p className="font-display text-base text-lime">CUCUMELON</p>
          <p className="mt-3 text-sm font-medium text-paper/70">Fresh pixels. Weird characters.</p>
        </div>

        <nav className="flex flex-col gap-3 md:items-end">
          <a
            href={OPENSEA_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:text-lime"
          >
            OpenSea
          </a>
          <a
            href="https://x.com/_cucumelon"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:text-lime"
          >
            X
          </a>
          <a
            href="https://m.debox.pro/moment?id=sajvvg6m&invite_code=xul8dhrq"
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:text-lime"
          >
            Community
          </a>
        </nav>
      </div>
      <div className="border-t-2 border-paper/15 px-5 py-6 text-center text-xs font-medium text-paper/50 md:px-8">
        © 2026 Cucumelon. All rights reserved.
      </div>
    </footer>
  );
}
