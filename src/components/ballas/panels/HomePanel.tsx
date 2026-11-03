import { GANG } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { useLanguage } from "@/i18n/LanguageProvider";

const REEL_ID = "-v1nh3KeKAM";
const REEL_SRC = [
  `https://www.youtube-nocookie.com/embed/${REEL_ID}`,
  `?autoplay=0`,
  `&rel=0`,
  `&modestbranding=1`,
  `&playsinline=1`,
  `&color=white`,
].join("");

type HomePanelProps = {
  onNavigate?: (tab: "members" | "join") => void;
};

export function HomePanel({ onNavigate }: HomePanelProps) {
  const { t } = useLanguage();

  return (
    <div className="panel-scroll relative flex h-full min-h-0 flex-col items-center overflow-x-hidden px-3 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="ballas-home-stage-glow absolute start-1/2 top-[28%] h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="ballas-home-ring absolute start-1/2 top-[28%] hidden h-[min(48vw,320px)] w-[min(48vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 sm:block" />
        <div className="ballas-home-beam absolute start-1/2 top-[8%] h-[40%] w-[min(70vw,420px)] -translate-x-1/2 opacity-60" />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center py-4 sm:py-6">
        <div className="ballas-rise ballas-logo-float relative flex w-full justify-center">
          <BallasLogo size="hero" glow markClassName="!h-[clamp(8.5rem,36vw,15rem)] !max-w-[min(92vw,28rem)]" />
        </div>

        <p
          className="ballas-rise mt-4 text-[10px] tracking-[0.38em] text-violet-soft uppercase sm:mt-5 sm:text-[11px]"
          style={{ animationDelay: "80ms" }}
        >
          {t.home.tag}
        </p>

        <p
          className="ballas-rise ballas-home-power mt-3 max-w-xl font-display text-[clamp(1.25rem,5vw,2.1rem)] leading-snug tracking-[0.04em] text-white sm:mt-4"
          style={{ animationDelay: "140ms" }}
        >
          {t.powerWord}
        </p>

        <p
          className="ballas-rise mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          {t.home.pitch}
        </p>

        <div
          className="ballas-rise mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-7 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
          style={{ animationDelay: "260ms" }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("join")}
            className="ballas-home-cta inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-10 py-3.5 text-sm font-bold tracking-[0.18em] text-white transition active:scale-[0.98] hover:scale-[1.04] hover:bg-violet-glow sm:w-auto"
          >
            {t.home.ctaJoin}
            <span className="rtl:rotate-180">→</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("members")}
            className="ballas-home-ghost inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-10 py-3.5 text-sm tracking-[0.16em] text-white backdrop-blur-md transition active:scale-[0.98] hover:scale-[1.04] hover:border-primary/60 hover:bg-primary/20 sm:w-auto"
          >
            {t.home.ctaCrew}
          </button>
        </div>

        {/* Cinematic reel frame */}
        <section
          className="ballas-rise ballas-home-reel mt-8 w-full max-w-3xl sm:mt-10"
          style={{ animationDelay: "320ms" }}
        >
          <div className="mb-3 flex flex-col items-center gap-1 sm:mb-4">
            <p className="text-[10px] tracking-[0.32em] text-violet-soft uppercase">{t.home.reelEyebrow}</p>
            <h3 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] tracking-[0.06em] text-white">
              {t.home.reelTitle}
            </h3>
            <p className="max-w-md text-xs text-white/60 sm:text-sm">{t.home.reelBody}</p>
          </div>

          <div className="ballas-home-reel-frame relative overflow-hidden rounded-[1.35rem]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-violet-soft/80 to-transparent" />
            <div className="pointer-events-none absolute -end-10 -top-12 z-0 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative z-[1] aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={REEL_SRC}
                title={t.home.reelTitle}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <p
          className="ballas-rise mt-6 mb-3 text-[10px] tracking-[0.28em] text-white/40 uppercase"
          style={{ animationDelay: "380ms" }}
        >
          {GANG.turf} · {t.home.cityStamp}
        </p>
      </div>
    </div>
  );
}
