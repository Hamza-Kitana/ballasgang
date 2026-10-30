import { useId } from "react";
import { cn } from "@/lib/utils";

type CrownMarkProps = {
  className?: string;
};

export function CrownMark({ className }: CrownMarkProps) {
  const id = useId();
  const fillId = `crownFill-${id}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-violet-glow", className)}
      aria-hidden
    >
      <path
        d="M8 44 L12 22 L24 34 L32 14 L40 34 L52 22 L56 44 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill={`url(#${fillId})`}
      />
      <path d="M10 48 H54" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="20" r="2.5" fill="currentColor" />
      <circle cx="32" cy="12" r="2.5" fill="currentColor" />
      <circle cx="52" cy="20" r="2.5" fill="currentColor" />
      <defs>
        <linearGradient id={fillId} x1="8" y1="14" x2="56" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.55 0.28 305)" stopOpacity="0.35" />
          <stop offset="1" stopColor="oklch(0.75 0.2 310)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  );
}
