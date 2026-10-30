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
      <div className="pointer-events-none absolute h-48 w-48 rounded-full border border-primary/30" />
      <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-primary/15" />

      <div className="gta-street-plate relative z-10 mb-6 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
        {t.streetPlate}
      </div>

      <CrownMark className="relative z-10 h-12 w-12" />

      <p className="relative z-10 mt-8 text-sm tracking-[0.2em] text-violet-soft">{t.gateLead}</p>
      <h2 className="relative z-10 mt-4 text-5xl font-bold tracking-[0.12em] text-glow sm:text-7xl">
        {t.gateTitle}
      </h2>
      <div className="relative z-10 mt-6 h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <p className="relative z-10 mt-6 text-xs tracking-[0.18em] text-foreground/65">{t.gateHint}</p>
    </button>
  );
}
