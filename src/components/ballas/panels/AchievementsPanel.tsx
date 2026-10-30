import { achievements, loc } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";

export function AchievementsPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs tracking-[0.28em] text-violet-soft">{t.achievements.eyebrow}</p>
        <h2 className="mt-1 text-4xl font-bold tracking-[0.08em] sm:text-6xl">
          {t.achievements.title}
        </h2>
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-3">
        {achievements.map((item) => (
          <article
            key={item.id}
            className="group grid grid-cols-[auto_1fr] gap-4 border border-white/10 border-s-2 border-s-primary/80 bg-black/55 p-4 transition hover:border-primary/40"
          >
            <span className="font-display text-3xl text-primary/85 sm:text-4xl">{item.year}</span>
            <div>
              <h3 className="text-2xl font-semibold tracking-wide sm:text-3xl">
                {loc(item.title, locale)}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {loc(item.detail, locale)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
