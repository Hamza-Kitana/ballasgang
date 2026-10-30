type WantedStarsProps = {
  count: number;
  max?: number;
};

export function WantedStars({ count, max = 5 }: WantedStarsProps) {
  const active = Math.min(max, Math.max(0, count));
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-[11px] leading-none ${i < active ? "text-amber-300" : "text-white/20"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
