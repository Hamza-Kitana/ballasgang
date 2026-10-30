import { CrownMark } from "@/components/ballas/CrownMark";
import { useLanguage } from "@/i18n/LanguageProvider";

type EnterGateProps = {
  onEnter: () => void;
};

export function EnterGate({ onEnter }: EnterGateProps) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={onEnter}
      className="absolute inset-0 z-40 flex cursor-pointer flex-col items-center justify-center border-0 bg-[oklch(0.08_0.04_305/0.4)] text-inherit outline-none"
      aria-label={t.gateTitle}
    >
      <div className="ballas-gate-ring pointer-events-none absolute h-44 w-44 rounded-full border border-primary/40" />
      <div className="ballas-gate-ring ballas-gate-ring-delayed pointer-events-none absolute h-64 w-64 rounded-full border border-primary/20" />
      <div className="ballas-gate-ring ballas-gate-ring-slow pointer-events-none absolute h-96 w-96 rounded-full border border-violet-soft/10" />

      <div className="ballas-slam gta-street-plate relative z-10 mb-6 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
        {t.streetPlate}
      </div>

      <CrownMark className="ballas-breathe relative z-10 h-14 w-14 drop-shadow-[0_0_24px_oklch(0.72_0.28_310/0.7)]" />

      <p
        className="ballas-rise relative z-10 mt-8 text-sm tracking-[0.2em] text-violet-soft"
        style={{ animationDelay: "120ms" }}
      >
        {t.gateLead}
      </p>
      <h2
        className="ballas-slam ballas-shimmer-text relative z-10 mt-4 text-5xl font-bold tracking-[0.12em] sm:text-7xl"
        style={{ animationDelay: "200ms" }}
      >
        {t.gateTitle}
      </h2>

      <p
        className="ballas-rise relative z-10 mt-5 max-w-xl px-6 text-center text-sm leading-relaxed text-white/85 sm:text-base"
        style={{ animationDelay: "300ms" }}
      >
        {t.gatePitch}
      </p>

      <div
        className="ballas-line-draw relative z-10 mt-6 h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ animationDelay: "380ms" }}
      />
      <p
        className="ballas-rise ballas-cta-pulse relative z-10 mt-6 text-xs tracking-[0.18em] text-foreground/70"
        style={{ animationDelay: "460ms" }}
      >
        {t.gateHint}
      </p>
    </button>
  );
}
