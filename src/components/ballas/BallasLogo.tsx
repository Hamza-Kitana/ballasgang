import { useId } from "react";
import { cn } from "@/lib/utils";

type BallasLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizes = {
  sm: { mark: "h-9 w-9", word: "text-xl tracking-[0.16em]" },
  md: { mark: "h-11 w-11", word: "text-2xl tracking-[0.16em]" },
  lg: { mark: "h-14 w-14", word: "text-3xl tracking-[0.14em]" },
  hero: {
    mark: "h-16 w-16 sm:h-20 sm:w-20",
    word: "text-[clamp(2.6rem,9vw,5.8rem)] tracking-[0.1em]",
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
  const s = sizes[size];

  return (
    <div className={cn("inline-flex items-center gap-3 sm:gap-4", className)}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(s.mark, "shrink-0 drop-shadow-[0_0_22px_oklch(0.72_0.28_310/0.55)]", markClassName)}
        aria-hidden
      >
        <circle cx="40" cy="40" r="36" stroke={`url(#${ringId})`} strokeWidth="2" />
        <circle
          cx="40"
          cy="40"
          r="30"
          fill="oklch(0.12 0.06 305 / 0.85)"
          stroke="oklch(0.72 0.2 310 / 0.35)"
          strokeWidth="1"
        />
        <path
          d="M22 48 L26 28 L36 40 L40 20 L44 40 L54 28 L58 48 Z"
          fill={`url(#${fillId})`}
          stroke="oklch(0.85 0.12 310)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M24 52 H56" stroke="oklch(0.8 0.14 310)" strokeWidth="2" />
        <circle cx="26" cy="26" r="2.2" fill="oklch(0.9 0.1 310)" />
        <circle cx="40" cy="18" r="2.4" fill="oklch(0.95 0.08 310)" />
        <circle cx="54" cy="26" r="2.2" fill="oklch(0.9 0.1 310)" />
        <text
          x="40"
          y="66"
          textAnchor="middle"
          fill="oklch(0.86 0.12 310)"
          fontSize="9"
          fontFamily="Oswald, Bebas Neue, sans-serif"
          letterSpacing="1.5"
        >
          B
        </text>
        <defs>
          <linearGradient id={fillId} x1="22" y1="20" x2="58" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.62 0.28 305)">
              <animate
                attributeName="stop-color"
                values="oklch(0.62 0.28 305);oklch(0.72 0.26 330);oklch(0.58 0.24 285);oklch(0.62 0.28 305)"
                dur="6.5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1" stopColor="oklch(0.35 0.18 305)">
              <animate
                attributeName="stop-color"
                values="oklch(0.35 0.18 305);oklch(0.42 0.2 320);oklch(0.32 0.16 290);oklch(0.35 0.18 305)"
                dur="6.5s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id={ringId} x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.78 0.2 310)">
              <animate
                attributeName="stop-color"
                values="oklch(0.78 0.2 310);oklch(0.85 0.18 330);oklch(0.72 0.22 285);oklch(0.78 0.2 310)"
                dur="6.5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1" stopColor="oklch(0.45 0.22 305)">
              <animate
                attributeName="stop-color"
                values="oklch(0.45 0.22 305);oklch(0.55 0.24 320);oklch(0.4 0.2 290);oklch(0.45 0.22 305)"
                dur="6.5s"
                repeatCount="indefinite"
              />
            </stop>
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
