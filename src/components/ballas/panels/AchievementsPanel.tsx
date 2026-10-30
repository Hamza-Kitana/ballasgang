import { achievements, loc } from "@/data/gang";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { useLanguage } from "@/i18n/LanguageProvider";

export function AchievementsPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PanelChrome eyebrow={t.achievements.eyebrow} title={t.achievements.title} />

      <div className="panel-scroll min-h-0 flex-1 pb-2">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {achievements.map((item, index) => (
            <article
              key={item.id}
              className="ballas-rise ballas-mission-card group relative overflow-hidden rounded-[1.4rem]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-3xl transition duration-500 group-hover:bg-primary/35" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/50 to-transparent" />

              <div className="relative flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-6xl leading-none tracking-[0.04em] text-primary drop-shadow-[0_0_24px_oklch(0.64_0.28_305/0.4)]">
                    {item.year}
                  </span>
                  <span className="rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-[9px] tracking-[0.18em] text-violet-soft">
                    {t.achievements.mission} {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 h-px w-16 bg-gradient-to-r from-primary to-transparent" />

                <h3 className="mt-4 text-2xl font-bold tracking-wide leading-snug">
                  {loc(item.title, locale)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/80">
                  {loc(item.detail, locale)}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_oklch(0.64_0.28_305/0.7)]" />
                  Ballas · LS
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
