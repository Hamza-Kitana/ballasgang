import { GANG } from "@/data/gang";
import { CrownMark } from "@/components/ballas/CrownMark";
import { useLanguage } from "@/i18n/LanguageProvider";

type HomePanelProps = {
  onNavigate?: (tab: "members" | "join") => void;
};

const embers = [
  { left: "8%", delay: "0s", dur: "7s", size: "4px" },
  { left: "18%", delay: "1.2s", dur: "9s", size: "3px" },
  { left: "32%", delay: "0.4s", dur: "8s", size: "5px" },
  { left: "48%", delay: "2s", dur: "10s", size: "3px" },
  { left: "62%", delay: "0.8s", dur: "7.5s", size: "4px" },
  { left: "74%", delay: "1.6s", dur: "9.5s", size: "3px" },
  { left: "86%", delay: "0.2s", dur: "8.5s", size: "5px" },
  { left: "94%", delay: "2.4s", dur: "11s", size: "3px" },
];

export function HomePanel({ onNavigate }: HomePanelProps) {
  const { t } = useLanguage();

  return (
    <div className="ballas-home relative flex h-full min-h-0 flex-col justify-end overflow-hidden pb-1 sm:justify-center sm:pb-0">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ballas-home-wash absolute inset-0" />
        <div className="ballas-home-beam absolute -top-1/4 start-1/2 h-[70%] w-[70%] -translate-x-1/2" />
        <div className="ballas-home-orbit absolute start-[12%] top-[22%] h-40 w-40 rounded-full border border-primary/25" />
        <div className="ballas-home-orbit ballas-home-orbit-rev absolute end-[10%] top-[30%] h-56 w-56 rounded-full border border-violet-soft/15" />
        <div className="ballas-home-scan absolute inset-x-0 top-0 h-24" />

        <p className="ballas-home-stamp font-display absolute start-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,28vw,22rem)] leading-none tracking-[0.08em]">
          {t.home.cityStamp}
        </p>

        <CrownMark className="ballas-home-crown absolute end-[6%] top-[18%] hidden h-24 w-24 opacity-50 sm:block lg:h-32 lg:w-32" />

        {embers.map((ember) => (
          <span
            key={ember.left}
            className="ballas-ember absolute bottom-0 rounded-full bg-violet-glow"
            style={{
              left: ember.left,
              width: ember.size,
              height: ember.size,
              animationDelay: ember.delay,
              animationDuration: ember.dur,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl">
        <p
          className="ballas-slam text-sm tracking-[0.12em] text-violet-soft sm:text-base"
          style={{ animationDelay: "60ms" }}
        >
          {t.home.welcome}
        </p>
        <p
          className="ballas-rise mt-2 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base"
          style={{ animationDelay: "110ms" }}
        >
          {t.home.pitch}
        </p>
        <p
          className="ballas-rise mt-2 text-[10px] tracking-[0.28em] text-muted-foreground sm:text-[11px]"
          style={{ animationDelay: "160ms" }}
        >
          {t.home.tag}
        </p>

        <h1
          className="ballas-slam ballas-home-title font-display mt-3 text-[clamp(5rem,20vw,12rem)] leading-[0.78] tracking-[0.04em]"
          style={{ animationDelay: "180ms" }}
        >
          <span className="ballas-shimmer-text ballas-glitch">{GANG.name}</span>
        </h1>

        <p
          className="ballas-rise mt-2 text-[clamp(1.35rem,4vw,2.6rem)] font-semibold tracking-[0.22em] text-violet-soft"
          style={{ animationDelay: "320ms" }}
        >
          {t.brandTag}
        </p>

        <div
          className="ballas-slam ballas-power mt-6 w-fit max-w-full"
          style={{ animationDelay: "420ms" }}
        >
          <div className="ballas-power-frame ballas-power-glow">
            <span className="ballas-power-mark" aria-hidden>
              ✦
            </span>
            <p className="ballas-power-word font-display">{t.powerWord}</p>
            <span className="ballas-power-mark" aria-hidden>
              ✦
            </span>
          </div>
          <p className="mt-3 text-sm tracking-[0.2em] text-violet-soft/90 sm:text-base">{t.motto}</p>
        </div>

        <div
          className="ballas-rise mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "560ms" }}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("join")}
            className="ballas-home-cta ballas-cta-pulse inline-flex items-center gap-2 bg-primary px-6 py-3.5 text-sm font-bold tracking-[0.18em] text-white transition hover:bg-violet-glow"
          >
            {t.home.ctaJoin}
            <span className="ballas-arrow-nudge rtl:rotate-180">→</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("members")}
            className="inline-flex items-center gap-2 border border-white/30 bg-black/40 px-6 py-3.5 text-sm tracking-[0.16em] text-white/90 backdrop-blur-[2px] transition hover:border-primary hover:bg-primary/20 hover:scale-[1.03]"
          >
            {t.home.ctaCrew}
          </button>
        </div>

        <p
          className="ballas-rise mt-6 gta-street-plate inline-flex w-fit px-3 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-white uppercase"
          style={{ animationDelay: "680ms" }}
        >
          {GANG.turf}
        </p>
      </div>
    </div>
  );
}
