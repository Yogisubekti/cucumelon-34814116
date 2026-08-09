"use client";

import { useEffect, useState } from "react";
import { MINT_DATE } from "@/lib/constants";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getTimeLeft(target: Date) {
  const now = Date.now();
  const end = target.getTime();
  const diff = Math.max(0, end - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, expired: diff === 0 };
}

export function Countdown() {
  const [time, setTime] = useState(getTimeLeft(MINT_DATE));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft(MINT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex items-center gap-2 border-2 border-border bg-card px-3 py-1.5 font-display text-[10px] tracking-tight">
        <span className="inline-block h-2 w-2 animate-blink bg-emerald" />
        MINTING SOON
      </span>
    );
  }

  if (time.expired) {
    return (
      <span className="inline-flex items-center gap-2 border-2 border-border bg-lime px-3 py-1.5 font-display text-[10px] tracking-tight text-ink">
        <span className="inline-block h-2 w-2 animate-blink bg-ink" />
        MINT IS LIVE
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col gap-2 border-2 border-border bg-card p-3 font-display sm:inline-flex sm:flex-row sm:items-center">
      <span className="inline-flex items-center gap-2 text-[10px] tracking-tight">
        <span className="inline-block h-2 w-2 animate-blink bg-emerald" />
        MINTING IN
      </span>
      <div className="flex gap-2 text-center text-[10px] leading-none">
        <div className="border-2 border-border bg-background px-2 py-1">
          <span className="block">{pad(time.days)}</span>
          <span className="mt-1 block text-[8px] text-muted-foreground">D</span>
        </div>
        <div className="border-2 border-border bg-background px-2 py-1">
          <span className="block">{pad(time.hours)}</span>
          <span className="mt-1 block text-[8px] text-muted-foreground">H</span>
        </div>
        <div className="border-2 border-border bg-background px-2 py-1">
          <span className="block">{pad(time.minutes)}</span>
          <span className="mt-1 block text-[8px] text-muted-foreground">M</span>
        </div>
        <div className="border-2 border-border bg-background px-2 py-1">
          <span className="block">{pad(time.seconds)}</span>
          <span className="mt-1 block text-[8px] text-muted-foreground">S</span>
        </div>
      </div>
    </div>
  );
}
