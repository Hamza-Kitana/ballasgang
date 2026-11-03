import { GANG } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { useLanguage } from "@/i18n/LanguageProvider";

type HomePanelProps = {
  onNavigate?: (tab: "members" | "join") => void;
};

export function HomePanel({ onNavigate }: HomePanelProps) {
  const { t } = useLanguage();

  return (
    <div className="panel-scroll relative flex h-full min-h-0 flex-col items-center overflow-x-hidden px-1 text-center sm:justify-center sm:overflow-hidden sm:px-3">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,oklch(0.55_0.28_305/0.28),transparent_58%)]" />
        <div className="ballas-home-ring absolute start-1/2 top-[32%] hidden h-[min(52vw,420px)] w-[min(52vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 shadow-[0_0_60px_oklch(0.64_0.28_305/0.18)] sm:block" />
        <div className="ballas-home-ring-slow absolute start-1/2 top-[32%] hidden h-[min(70vw,580px)] w-[min(70vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-soft/15 sm:block" />
        <div className="absolute start-1/2 top-[30%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl sm:h-40 sm:w-40 sm:top-[32%]" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center py-4 sm:py-0">
        <div className="ballas-rise ballas-logo-float scale-[0.92] sm:scale-100">
          <BallasLogo size="hero" />
        </div>

        <div
          className="ballas-rise mt-4 flex w-full max-w-3xl items-center gap-2 sm:mt-6 sm:gap-3"
          style={{ animationDelay: "70ms" }}
        >
          <span className="h-px flex-1 bg-gradient-to-l from-primary/70 to-transparent" />
          <p className="shrink-0 text-[9px] tracking-[0.22em] text-violet-soft uppercase sm:text-[11px] sm:tracking-[0.32em]">
            {t.home.tag}
          </p>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/70 to-transparent" />
        </div>

        <h2
          className="ballas-rise ballas-home-welcome mt-3 max-w-4xl px-1 sm:mt-5 sm:px-2"
          style={{ animationDelay: "120ms" }}
        >
          {t.home.welcome}
        </h2>

        <p
          className="ballas-rise mt-3 max-w-xl text-[13px] leading-relaxed text-white/88 sm:mt-4 sm:max-w-2xl sm:text-xl"
          style={{ animationDelay: "180ms" }}
        >
          {t.home.pitch}
        </p>

        <div
          className="ballas-rise ballas-power-hero mt-5 w-full sm:mt-8"
          style={{ animationDelay: "240ms" }}
        >
          <p className="ballas-shimmer-text ballas-power-line font-display">{t.powerWord}</p>
          <p className="mt-1.5 text-[10px] tracking-[0.22em] text-violet-soft sm:mt-2 sm:text-sm sm:tracking-[0.28em]">
            {t.motto}
          </p>
        </div>

        <p
          className="ballas-rise mt-4 text-[10px] tracking-[0.2em] text-white/55 uppercase sm:mt-5 sm:text-[11px] sm:tracking-[0.26em]"
          style={{ animationDelay: "280ms" }}
        >
          {t.home.mission}
        </p>

        <div
          className="ballas-rise mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("join")}
            className="ballas-home-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold tracking-[0.16em] text-white transition active:scale-[0.98] hover:scale-[1.04] hover:bg-violet-glow sm:w-auto sm:px-9"
          >
            {t.home.ctaJoin}
            <span className="rtl:rotate-180">→</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("members")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/45 bg-black/50 px-7 py-3.5 text-sm tracking-[0.14em] text-white shadow-[0_0_24px_oklch(0.64_0.28_305/0.15)] transition active:scale-[0.98] hover:scale-[1.04] hover:border-primary hover:bg-primary/25 sm:w-auto sm:px-9 sm:tracking-[0.16em]"
          >
            {t.home.ctaCrew}
          </button>
        </div>

        <p
          className="ballas-rise mt-5 mb-2 rounded-full border border-primary/35 bg-black/45 px-4 py-1.5 text-[9px] tracking-[0.22em] text-violet-soft uppercase sm:mt-8 sm:mb-0 sm:px-5 sm:text-[10px] sm:tracking-[0.3em]"
          style={{ animationDelay: "380ms" }}
        >
          {GANG.turf} · {t.home.cityStamp}
        </p>
      </div>
    </div>
  );
}
