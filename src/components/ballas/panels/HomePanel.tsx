import { GANG, getLiveMembers, members } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";

export function HomePanel() {
  const { t } = useLanguage();
  const live = getLiveMembers();

  return (
    <div className="relative flex h-full flex-col justify-end pb-2 sm:justify-center sm:pb-0">
      <p className="text-xs tracking-[0.22em] text-violet-soft sm:text-sm">{t.home.tag}</p>
      <p className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground uppercase">{t.cityLine}</p>

      <h1 className="font-display mt-3 text-[clamp(4rem,16vw,9.5rem)] leading-[0.82] tracking-[0.06em] text-glow">
        {GANG.name}
      </h1>

      <p className="mt-2 text-[clamp(1.4rem,4vw,2.6rem)] font-semibold tracking-[0.16em] text-violet-soft">
        {t.brandTag}
      </p>

      <div className="mt-5 h-px w-48 bg-gradient-to-r from-primary via-violet-glow to-transparent" />

      <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/85 sm:text-base">{t.motto}</p>
      <p className="mt-2 max-w-lg text-xs tracking-[0.12em] text-violet-soft/80">{t.home.mission}</p>

      <div className="mt-8 gta-street-plate inline-flex w-fit px-3 py-2 text-[11px] font-semibold tracking-[0.18em] text-white uppercase">
        {GANG.turf}
      </div>

      <div className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-6">
        <Stat label={t.home.family} value={String(members.length).padStart(2, "0")} />
        <Stat label={t.home.liveNow} value={String(live.length).padStart(2, "0")} />
        <Stat label={t.home.colors} value={t.home.purple} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-3xl tracking-wider text-white sm:text-5xl">{value}</p>
      <p className="mt-1 text-[10px] tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}
