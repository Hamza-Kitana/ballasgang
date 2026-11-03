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
      {/* Cinematic stage light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ballas-home-stage-glow absolute start-1/2 top-[42%] h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="ballas-home-ring absolute start-1/2 top-[42%] h-[min(58vw,380px)] w-[min(58vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25" />
        <div className="ballas-home-ring-slow absolute start-1/2 top-[42%] h-[min(78vw,520px)] w-[min(78vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-soft/12" />
        <div className="ballas-home-beam absolute start-1/2 top-[18%] h-[55%] w-[min(70vw,420px)] -translate-x-1/2 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        {/* Brand = hero */}
        <div className="ballas-rise ballas-logo-float relative flex w-full justify-center">
          <BallasLogo size="hero" glow markClassName="!h-[clamp(10rem,42vw,18rem)] !max-w-[min(94vw,32rem)]" />
        </div>

        <p
          className="ballas-rise mt-5 text-[10px] tracking-[0.38em] text-violet-soft uppercase sm:mt-6 sm:text-[11px]"
          style={{ animationDelay: "80ms" }}
        >
          {t.home.tag}
        </p>

        <p
          className="ballas-rise ballas-home-power mt-4 max-w-xl font-display text-[clamp(1.35rem,5.5vw,2.35rem)] leading-snug tracking-[0.04em] text-white sm:mt-5"
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
