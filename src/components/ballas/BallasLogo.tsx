import { cn } from "@/lib/utils";

type BallasLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizes = {
  sm: { mark: "h-9 w-auto", word: "text-xl tracking-[0.18em]" },
  md: { mark: "h-11 w-auto", word: "text-2xl tracking-[0.18em]" },
  lg: { mark: "h-14 w-auto", word: "text-3xl tracking-[0.16em]" },
  hero: {
    mark: "h-14 w-auto sm:h-20",
    word: "text-[clamp(2.1rem,11vw,5.8rem)] tracking-[0.12em] sm:tracking-[0.14em]",
  },
};

export function BallasLogo({
  className,
  markClassName,
  showWordmark = true,
  size = "md",
}: BallasLogoProps) {
  const s = sizes[size];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center gap-2.5 sm:gap-4",
        size === "hero" && "flex-wrap",
        className,
      )}
    >
      <img
        src="/ballas-b.png"
        alt=""
        aria-hidden
        draggable={false}
        className={cn(
          s.mark,
          "ballas-logo-mark shrink-0 object-contain select-none",
          markClassName,
        )}
      />

      {showWordmark ? (
        <span className={cn("ballas-wordmark", s.word)} aria-label="Ballas">
          BALLAS
        </span>
      ) : null}
    </div>
  );
}
