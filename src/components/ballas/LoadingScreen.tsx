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

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6">
        <div className="mb-4 border border-white/20 bg-black/50 px-3 py-1 text-[10px] tracking-[0.28em] text-violet-soft uppercase">
          GTA V · FiveM
        </div>
        <CrownMark className="h-14 w-14" />

        <p className="mt-6 text-xs tracking-[0.28em] text-violet-soft/85">{t.loadingSub}</p>

        <h1 className="font-display mt-4 text-7xl tracking-[0.14em] text-glow sm:text-8xl">BALLAS</h1>
        <p className="mt-2 text-xl font-semibold tracking-[0.18em] text-violet-soft sm:text-2xl">
          {t.brandTag}
        </p>

        <div className="relative mt-16 h-[2px] w-full overflow-hidden bg-white/10">
          <div
            className="absolute inset-y-0 start-0 bg-gradient-to-r from-primary via-violet-glow to-accent transition-[width] duration-100 ease-out"
            style={{ width: `${clamped}%` }}
          />
        </div>

        <div className="mt-4 flex w-full items-center justify-between text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
          <span>{t.loadingLabel}</span>
          <span className="tabular-nums text-violet-soft">{clamped}%</span>
        </div>
      </div>
    </div>
  );
}
