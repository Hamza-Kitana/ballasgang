import { achievements, loc } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";

export function AchievementsPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs tracking-[0.28em] text-violet-soft">{t.achievements.eyebrow}</p>
        <h2 className="font-display mt-1 text-[clamp(2.4rem,7vw,4.5rem)] leading-none tracking-[0.06em]">
          {t.achievements.title}
        </h2>
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map((item, index) => (
            <article
              key={item.id}
              className="ballas-mission group relative flex min-h-[180px] flex-col overflow-hidden p-4 transition duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,oklch(0.55_0.28_305/0.22),transparent_55%)] opacity-80 transition group-hover:opacity-100" />
              <div className="relative z-10 flex items-start justify-between gap-3">
                <span className="font-display text-5xl leading-none text-primary/90">{item.year}</span>
                <span className="border border-primary/35 bg-primary/15 px-2 py-0.5 text-[9px] tracking-[0.18em] text-violet-soft">
                  {t.achievements.mission}
                </span>
              </div>
              <div className="relative z-10 mt-auto pt-6">
                <h3 className="text-2xl font-bold tracking-wide sm:text-3xl">
                  {loc(item.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {loc(item.detail, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
