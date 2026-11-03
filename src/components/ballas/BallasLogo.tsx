import { cn } from "@/lib/utils";

type BallasLogoProps = {
  className?: string;
  markClassName?: string;
  /** @deprecated Wordmark removed — logo graphic includes THE BALLAS */
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
  glow?: boolean;
};

const sizes = {
  sm: "h-9 w-auto max-w-[7.5rem]",
  md: "h-12 w-auto max-w-[10rem]",
  lg: "h-16 w-auto max-w-[14rem] sm:h-20 sm:max-w-[16rem]",
  hero: "h-[clamp(8.5rem,34vw,16rem)] w-auto max-w-[min(92vw,28rem)]",
};

export function BallasLogo({
  className,
  markClassName,
  size = "md",
  glow = size === "hero" || size === "lg",
}: BallasLogoProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        glow && "ballas-logo-glow-wrap",
        className,
      )}
      aria-label="The Ballas"
    >
      {glow ? (
        <>
          <span className="ballas-logo-aura ballas-logo-aura-a" aria-hidden />
          <span className="ballas-logo-aura ballas-logo-aura-b" aria-hidden />
          <span className="ballas-logo-aura ballas-logo-aura-c" aria-hidden />
        </>
      ) : null}

      <img
        src="/ballas-logo.png"
        alt="The Ballas"
        draggable={false}
        className={cn(
          sizes[size],
          "ballas-logo-mark relative z-10 object-contain select-none",
          markClassName,
        )}
      />
    </div>
  );
}
