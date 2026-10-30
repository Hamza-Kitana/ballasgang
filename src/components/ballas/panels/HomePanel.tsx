import { GANG } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { useLanguage } from "@/i18n/LanguageProvider";

type HomePanelProps = {
  onNavigate?: (tab: "members" | "join") => void;
};

export function HomePanel({ onNavigate }: HomePanelProps) {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center overflow-hidden px-2 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,oklch(0.5_0.26_305/0.28),transparent_52%)]" />
        <div className="ballas-home-ring absolute start-1/2 top-[38%] h-[min(52vw,420px)] w-[min(52vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 shadow-[0_0_60px_oklch(0.64_0.28_305/0.15)]" />
        <div className="ballas-home-ring-slow absolute start-1/2 top-[38%] h-[min(68vw,560px)] w-[min(68vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-soft/15" />
        <div className="absolute start-1/2 top-[38%] h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center">
        <div className="ballas-rise ballas-logo-float">
          <BallasLogo size="hero" className="flex-col gap-4 sm:gap-5" markClassName="mb-1" />
        </div>

        <p
          className="ballas-rise mt-5 text-sm tracking-[0.16em] text-violet-soft sm:text-base"
          style={{ animationDelay: "80ms" }}
        >
          {t.home.welcome}
        </p>

        <p
          className="ballas-rise mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-lg"
          style={{ animationDelay: "140ms" }}
        >
          {t.home.pitch}
        </p>

        <div
          className="ballas-rise ballas-power-hero mt-8 w-full max-w-2xl"
          style={{ animationDelay: "220ms" }}
        >
          <p className="ballas-shimmer-text font-display text-[clamp(1.8rem,6vw,3.4rem)] leading-[1.15] tracking-[0.08em]">
            {t.powerWord}
          </p>
          <p className="mt-3 text-xs tracking-[0.24em] text-violet-soft/90 sm:text-sm">{t.motto}</p>
        </div>

        <div
          className="ballas-rise mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "300ms" }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("join")}
            className="ballas-home-cta inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold tracking-[0.18em] text-white transition hover:scale-[1.03] hover:bg-violet-glow"
          >
            {t.home.ctaJoin}
            <span className="rtl:rotate-180">→</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("members")}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/40 px-8 py-3.5 text-sm tracking-[0.16em] text-white transition hover:scale-[1.03] hover:border-primary hover:bg-primary/20"
          >
            {t.home.ctaCrew}
          </button>
        </div>

        <p
          className="ballas-rise mt-8 rounded-full border border-white/15 bg-black/35 px-4 py-1.5 text-[10px] tracking-[0.28em] text-white/60 uppercase"
          style={{ animationDelay: "360ms" }}
        >
          {GANG.turf}
        </p>
      </div>
    </div>
  );
}
