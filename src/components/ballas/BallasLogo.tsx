import { useId } from "react";
import { cn } from "@/lib/utils";

type BallasLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizes = {
  sm: { mark: "h-9 w-9", word: "text-xl tracking-[0.18em]" },
  md: { mark: "h-11 w-11", word: "text-2xl tracking-[0.18em]" },
  lg: { mark: "h-14 w-14", word: "text-3xl tracking-[0.16em]" },
  hero: {
    mark: "h-16 w-16 sm:h-20 sm:w-20",
    word: "text-[clamp(2.6rem,9vw,5.8rem)] tracking-[0.14em]",
  },
};

export function BallasLogo({
  className,
  markClassName,
  showWordmark = true,
  size = "md",
}: BallasLogoProps) {
  const id = useId();
  const fillId = `ballas-logo-${id}`;
  const ringId = `ballas-ring-${id}`;
  const glowId = `ballas-glow-${id}`;
  const s = sizes[size];

  return (
    <div className={cn("inline-flex items-center gap-3 sm:gap-4", className)}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(s.mark, "ballas-logo-mark shrink-0", markClassName)}
        aria-hidden
      >
        {/* Soft purple aura only — no solid white/light plate behind */}
        <circle cx="40" cy="40" r="28" fill={`url(#${glowId})`} opacity="0.55" />
        <circle
          cx="40"
          cy="40"
          r="34"
          stroke={`url(#${ringId})`}
          strokeWidth="2.2"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="29"
          stroke="oklch(0.55 0.24 305 / 0.45)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 3"
        />

        <path
          d="M22 48 L26 28 L36 40 L40 18 L44 40 L54 28 L58 48 Z"
          fill={`url(#${fillId})`}
          stroke="oklch(0.72 0.22 310)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M24 52 H56" stroke="oklch(0.68 0.24 305)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="26" cy="26" r="2" fill="oklch(0.78 0.2 320)" />
        <circle cx="40" cy="16" r="2.2" fill="oklch(0.82 0.18 310)" />
        <circle cx="54" cy="26" r="2" fill="oklch(0.78 0.2 320)" />
        <text
          x="40"
          y="66"
          textAnchor="middle"
          fill="oklch(0.78 0.18 310)"
          fontSize="10"
          fontFamily="Black Ops One, Bebas Neue, sans-serif"
          letterSpacing="2"
        >
          B
        </text>

        <defs>
          <radialGradient id={glowId} cx="40" cy="40" r="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.5 0.26 305 / 0.55)" />
            <stop offset="0.55" stopColor="oklch(0.35 0.2 305 / 0.2)" />
            <stop offset="1" stopColor="oklch(0.2 0.1 305 / 0)" />
          </radialGradient>
          <linearGradient id={fillId} x1="22" y1="18" x2="58" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.7 0.28 310)">
              <animate
                attributeName="stop-color"
                values="oklch(0.7 0.28 310);oklch(0.62 0.26 330);oklch(0.58 0.24 290);oklch(0.7 0.28 310)"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1" stopColor="oklch(0.32 0.18 305)">
              <animate
                attributeName="stop-color"
                values="oklch(0.32 0.18 305);oklch(0.38 0.2 318);oklch(0.28 0.16 295);oklch(0.32 0.18 305)"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id={ringId} x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.82 0.2 315)">
              <animate
                attributeName="stop-color"
                values="oklch(0.82 0.2 315);oklch(0.7 0.26 330);oklch(0.75 0.22 290);oklch(0.82 0.2 315)"
                dur="6s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1" stopColor="oklch(0.42 0.22 305)" />
          </linearGradient>
        </defs>
      </svg>

      {showWordmark ? (
        <span className={cn("ballas-wordmark", s.word)} aria-label="Ballas">
          BALLAS
        </span>
      ) : null}
    </div>
  );
}
