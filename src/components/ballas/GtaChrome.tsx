import { WantedStars } from "@/components/ballas/WantedStars";
import { getLiveMembers } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Compact GTA/FiveM identity strip — sits under the main header. */
export function GtaChrome() {
  const { t } = useLanguage();
  const liveCount = getLiveMembers().length;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 border border-emerald-400/35 bg-emerald-500/10 px-2.5 py-1 text-[10px] tracking-[0.16em] text-emerald-200 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {t.serverBadge}
      </span>
      <span className="gta-street-plate px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-white uppercase">
        {t.streetPlate}
      </span>
      <span className="border border-primary/35 bg-primary/10 px-2.5 py-1 text-[10px] tracking-[0.14em] text-violet-soft uppercase">
        {t.turfLabel}: {t.turfValue}
      </span>
      <span className="ms-auto inline-flex items-center gap-2 border border-amber-300/25 bg-black/40 px-2.5 py-1">
        <span className="text-[9px] tracking-[0.16em] text-amber-200/80 uppercase">{t.wantedLabel}</span>
        <WantedStars count={liveCount} />
      </span>
    </div>
  );
}
