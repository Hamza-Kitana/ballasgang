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
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        <div className="ballas-rise ballas-logo-float relative flex w-full justify-center overflow-visible">
          <BallasLogo size="hero" glow={false} markClassName="!h-[clamp(10rem,42vw,18rem)] !max-w-[min(94vw,32rem)] ballas-logo-hero-clean" />
        </div>

        <p
          className="ballas-rise mt-5 max-w-xl text-sm tracking-[0.08em] text-violet-soft sm:mt-6 sm:text-base"
          style={{ animationDelay: "80ms" }}
        >
          {t.home.welcome}
        </p>

        <p
          className="ballas-rise ballas-home-power mt-3 max-w-xl font-display text-[clamp(1.35rem,5.5vw,2.35rem)] leading-snug tracking-[0.04em] text-white sm:mt-4"
          style={{ animationDelay: "140ms" }}
        >
          {t.powerWord}
        </p>

        <p
          className="ballas-rise mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:mt-4 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          {t.home.pitch}
        </p>

        <div
          className="ballas-rise mt-7 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
          style={{ animationDelay: "280ms" }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("join")}
            className="ballas-home-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-sm font-bold tracking-[0.18em] text-white transition active:scale-[0.98] hover:scale-[1.04] hover:bg-violet-glow sm:w-auto"
          >
            {t.home.ctaJoin}
            <span className="rtl:rotate-180">→</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("members")}
            className="ballas-home-ghost inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-10 py-4 text-sm tracking-[0.16em] text-white backdrop-blur-md transition active:scale-[0.98] hover:scale-[1.04] hover:border-primary/60 hover:bg-primary/20 sm:w-auto"
          >
            {t.home.ctaCrew}
          </button>
        </div>

        <p
          className="ballas-rise mt-7 text-[10px] tracking-[0.28em] text-white/40 uppercase"
          style={{ animationDelay: "340ms" }}
        >
          {GANG.turf} · {t.home.cityStamp}
        </p>
      </div>
    </div>
  );
}
