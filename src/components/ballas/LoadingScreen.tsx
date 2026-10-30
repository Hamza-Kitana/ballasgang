import { CrownMark } from "@/components/ballas/CrownMark";
import { useLanguage } from "@/i18n/LanguageProvider";

type LoadingScreenProps = {
  progress: number;
};

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const { t } = useLanguage();
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[oklch(0.08_0.04_305)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,oklch(0.42_0.24_305/0.4),transparent_52%)]" />
      <div className="ballas-home-beam pointer-events-none absolute top-[20%] start-1/2 h-[50%] w-[60%] -translate-x-1/2" />
      <div className="ballas-home-scan pointer-events-none absolute inset-x-0 top-0 h-28" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6">
        <div className="ballas-rise mb-4 border border-white/20 bg-black/50 px-3 py-1 text-[10px] tracking-[0.28em] text-violet-soft uppercase">
          GTA V · FiveM
        </div>
        <CrownMark className="ballas-breathe h-14 w-14 drop-shadow-[0_0_20px_oklch(0.72_0.28_310/0.65)]" />

        <p className="ballas-rise mt-6 text-xs tracking-[0.28em] text-violet-soft/85" style={{ animationDelay: "80ms" }}>
          {t.loadingSub}
        </p>

        <h1
          className="ballas-slam ballas-shimmer-text font-display mt-4 text-7xl tracking-[0.14em] sm:text-8xl"
          style={{ animationDelay: "120ms" }}
        >
          BALLAS
        </h1>
        <p
          className="ballas-rise mt-2 text-xl font-semibold tracking-[0.18em] text-violet-soft sm:text-2xl"
          style={{ animationDelay: "220ms" }}
        >
          {t.brandTag}
        </p>

        <div className="relative mt-16 h-[2px] w-full overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 start-0 bg-gradient-to-r from-primary via-violet-glow to-accent transition-[width] duration-100 ease-out"
            style={{ width: `${clamped}%` }}
          />
          <div className="ballas-load-sheen absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        <div className="mt-4 flex w-full items-center justify-between text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          <span>{t.loadingLabel}</span>
          <span className="tabular-nums text-violet-soft">{clamped}%</span>
        </div>
      </div>
    </div>
  );
}
