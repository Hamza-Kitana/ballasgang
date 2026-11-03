import { GANG } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { useLanguage } from "@/i18n/LanguageProvider";

type HomePanelProps = {
  onNavigate?: (tab: "members" | "join") => void;
};

export function HomePanel({ onNavigate }: HomePanelProps) {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center overflow-hidden px-3 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,oklch(0.55_0.28_305/0.32),transparent_55%)]" />
        <div className="ballas-home-ring absolute start-1/2 top-[36%] h-[min(52vw,420px)] w-[min(52vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 shadow-[0_0_60px_oklch(0.64_0.28_305/0.18)]" />
        <div className="ballas-home-ring-slow absolute start-1/2 top-[36%] h-[min(70vw,580px)] w-[min(70vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-soft/15" />
        <div className="absolute start-1/2 top-[36%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <div className="ballas-rise ballas-logo-float">
          <BallasLogo size="hero" />
        </div>

        <div
          className="ballas-rise mt-6 flex w-full max-w-3xl items-center gap-3"
          style={{ animationDelay: "70ms" }}
        >
          <span className="h-px flex-1 bg-gradient-to-l from-primary/70 to-transparent" />
          <p className="shrink-0 text-[10px] tracking-[0.32em] text-violet-soft uppercase sm:text-[11px]">
            {t.home.tag}
          </p>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/70 to-transparent" />
        </div>

        <h2
          className="ballas-rise ballas-home-welcome mt-5 max-w-4xl px-2"
          style={{ animationDelay: "120ms" }}
        >
          {t.home.welcome}
        </h2>

        <p
          className="ballas-rise mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-xl sm:leading-relaxed"
          style={{ animationDelay: "180ms" }}
        >
          {t.home.pitch}
        </p>

        <div
          className="ballas-rise ballas-power-hero mt-8"
          style={{ animationDelay: "240ms" }}
        >
          <p className="ballas-shimmer-text ballas-power-line font-display">{t.powerWord}</p>
          <p className="mt-2 text-xs tracking-[0.28em] text-violet-soft sm:text-sm">{t.motto}</p>
        </div>

        <p
          className="ballas-rise mt-5 text-[11px] tracking-[0.26em] text-white/55 uppercase"
          style={{ animationDelay: "280ms" }}
        >
          {t.home.mission}
        </p>

        <div
          className="ballas-rise mt-8 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("join")}
            className="ballas-home-cta inline-flex items-center gap-2 rounded-full bg-primary px-9 py-3.5 text-sm font-bold tracking-[0.18em] text-white transition hover:scale-[1.04] hover:bg-violet-glow"
          >
            {t.home.ctaJoin}
            <span className="rtl:rotate-180">→</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("members")}
            className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-black/50 px-9 py-3.5 text-sm tracking-[0.16em] text-white shadow-[0_0_24px_oklch(0.64_0.28_305/0.15)] transition hover:scale-[1.04] hover:border-primary hover:bg-primary/25"
          >
            {t.home.ctaCrew}
          </button>
        </div>

        <p
          className="ballas-rise mt-8 rounded-full border border-primary/35 bg-black/45 px-5 py-1.5 text-[10px] tracking-[0.3em] text-violet-soft uppercase"
          style={{ animationDelay: "380ms" }}
        >
          {GANG.turf} · {t.home.cityStamp}
        </p>
      </div>
    </div>
  );
}
