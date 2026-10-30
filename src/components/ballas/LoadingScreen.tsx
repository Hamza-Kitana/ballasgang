import { CrownMark } from "@/components/ballas/CrownMark";

type LoadingScreenProps = {
  progress: number;
};

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[oklch(0.08_0.04_305)]">
      <div className="ballas-drift pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,oklch(0.42_0.24_305/0.5),transparent_52%)]" />
      <div className="ballas-grain absolute inset-0" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6">
        <CrownMark className="ballas-rise h-14 w-14" />

        <p
          className="font-display mt-6 text-xs tracking-[0.6em] text-violet-soft/85"
          style={{ animationDelay: "80ms" }}
        >
          FIVE M · LOS SANTOS
        </p>

        <h1 className="ballas-glitch font-display mt-4 text-7xl tracking-[0.14em] text-glow sm:text-8xl">
          BALLAS
        </h1>
        <p className="ballas-shimmer-text font-display mt-1 text-2xl tracking-[0.4em] sm:text-3xl">
          PURPLE DYNASTY
        </p>

        <div className="relative mt-16 h-[2px] w-full overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-violet-glow to-accent transition-[width] duration-200 ease-out"
            style={{ width: `${clamped}%` }}
          />
          <div className="ballas-scan absolute inset-x-0 -top-6 h-12 bg-gradient-to-b from-violet-glow/35 to-transparent" />
        </div>

        <div className="mt-4 flex w-full items-center justify-between text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          <span>Syncing the streets</span>
          <span className="tabular-nums text-violet-soft">{clamped}%</span>
        </div>
      </div>
    </div>
  );
}
