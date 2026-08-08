type Square = { top: string; left: string; size: number; delay: string; tone: string };

const squares: Square[] = [
  { top: "12%", left: "6%", size: 14, delay: "0s", tone: "bg-emerald" },
  { top: "26%", left: "88%", size: 10, delay: "1.2s", tone: "bg-ink" },
  { top: "62%", left: "10%", size: 18, delay: "2.1s", tone: "bg-lime" },
  { top: "78%", left: "80%", size: 12, delay: "0.6s", tone: "bg-emerald" },
  { top: "44%", left: "50%", size: 8, delay: "1.7s", tone: "bg-ink" },
  { top: "88%", left: "38%", size: 14, delay: "2.6s", tone: "bg-lime" },
];

export function PixelDecor({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {squares.map((s, i) => (
        <span
          key={i}
          className={`absolute animate-float border-2 border-border ${s.tone}`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
