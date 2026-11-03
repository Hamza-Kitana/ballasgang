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
  const strokeId = `ballas-stroke-${id}`;
  const ringId = `ballas-ring-${id}`;
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
        {/* Hollow mark only — fully cut out, no plate behind */}
        <circle
          cx="40"
          cy="40"
          r="34"
          stroke={`url(#${ringId})`}
          strokeWidth="2.4"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="28.5"
          stroke="oklch(0.62 0.24 305 / 0.55)"
          strokeWidth="1.1"
          fill="none"
          strokeDasharray="3 4"
        />

        {/* Crown outline — hollow / cut out */}
        <path
          d="M22 48 L26 28 L36 40 L40 18 L44 40 L54 28 L58 48 Z"
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M24 52 H56"
          stroke={`url(#${strokeId})`}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="26" cy="26" r="2.1" fill="none" stroke={`url(#${strokeId})`} strokeWidth="1.6" />
        <circle cx="40" cy="16" r="2.3" fill="none" stroke={`url(#${strokeId})`} strokeWidth="1.6" />
        <circle cx="54" cy="26" r="2.1" fill="none" stroke={`url(#${strokeId})`} strokeWidth="1.6" />

        <text
          x="40"
          y="66"
          textAnchor="middle"
          fill="none"
          stroke={`url(#${strokeId})`}
          strokeWidth="1.1"
          fontSize="11"
          fontFamily="Black Ops One, Bebas Neue, sans-serif"
          letterSpacing="2"
        >
          B
        </text>

        <defs>
          <linearGradient id={strokeId} x1="20" y1="16" x2="60" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.82 0.2 315)">
              <animate
                attributeName="stop-color"
                values="oklch(0.82 0.2 315);oklch(0.72 0.28 330);oklch(0.78 0.22 290);oklch(0.82 0.2 315)"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1" stopColor="oklch(0.55 0.26 305)">
              <animate
                attributeName="stop-color"
                values="oklch(0.55 0.26 305);oklch(0.48 0.24 320);oklch(0.58 0.22 295);oklch(0.55 0.26 305)"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <linearGradient id={ringId} x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(0.85 0.16 310)">
              <animate
                attributeName="stop-color"
                values="oklch(0.85 0.16 310);oklch(0.7 0.26 330);oklch(0.78 0.2 290);oklch(0.85 0.16 310)"
                dur="5.5s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1" stopColor="oklch(0.48 0.24 305)" />
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
