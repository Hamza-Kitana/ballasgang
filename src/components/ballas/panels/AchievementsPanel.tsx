import { achievements, loc } from "@/data/gang";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { useLanguage } from "@/i18n/LanguageProvider";

export function AchievementsPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PanelChrome
        eyebrow={t.achievements.eyebrow}
        title={t.achievements.title}
        end={
          <span className="rounded-full border border-primary/45 bg-primary/20 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-violet-soft">
            {String(achievements.length).padStart(2, "0")} {t.achievements.opsCount}
          </span>
        }
      />

      <div className="panel-scroll min-h-0 flex-1 space-y-5 pb-2">
        {/* Ops archive banner */}
        <section className="ballas-ops-banner relative overflow-hidden rounded-[1.5rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,oklch(0.55_0.28_305/0.42),transparent_52%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/55 to-transparent" />
          <div className="pointer-events-none absolute -end-10 top-0 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />

          <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div className="min-w-0 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/40 bg-black/45 px-3 py-1 text-[10px] tracking-[0.18em] text-violet-soft">
                  {t.achievements.eyebrow}
                </span>
                <span className="rounded-full border border-emerald-400/35 bg-emerald-500/20 px-3 py-1 text-[10px] tracking-[0.16em] text-emerald-200">
                  {t.achievements.bannerBadge}
                </span>
              </div>
              <h3 className="font-display mt-3 text-[clamp(2rem,5vw,3.3rem)] leading-none tracking-[0.05em] text-glow">
                {t.achievements.bannerTitle}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {t.achievements.bannerBody}
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 text-start backdrop-blur-sm">
              <p className="text-[9px] tracking-[0.2em] text-white/45 uppercase">Los Santos</p>
              <p className="font-display mt-1 text-3xl tracking-[0.06em] text-primary">
                {achievements[0]?.year}–{achievements.at(-1)?.year}
              </p>
            </div>
          </div>
        </section>

        {/* Mission dossier cards */}
        <div className="relative space-y-4">
          <div className="pointer-events-none absolute start-[1.65rem] top-3 bottom-3 hidden w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent sm:block" />

          {achievements.map((item, index) => {
            const code = `M-${String(index + 1).padStart(2, "0")}`;
            return (
              <article
                key={item.id}
                className="ballas-rise ballas-mission-card group relative overflow-hidden rounded-[1.4rem]"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <div className="pointer-events-none absolute -end-8 -top-8 h-36 w-36 rounded-full bg-primary/20 blur-3xl transition duration-500 group-hover:bg-primary/35" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/45 to-transparent" />

                {/* COMPLETED stamp */}
                <div className="ballas-mission-stamp pointer-events-none absolute end-3 top-3 sm:end-5 sm:top-5">
                  {t.achievements.completed}
                </div>

                <div className="relative grid gap-4 p-4 sm:grid-cols-[auto_1fr] sm:gap-5 sm:p-5">
                  <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:gap-2">
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/55 bg-primary/25 font-display text-sm text-primary shadow-[0_0_20px_oklch(0.64_0.28_305/0.35)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="text-start sm:text-center">
                      <p className="font-display text-4xl leading-none tracking-[0.04em] text-primary drop-shadow-[0_0_20px_oklch(0.64_0.28_305/0.35)] sm:text-5xl">
                        {item.year}
                      </p>
                      <p className="mt-1 text-[10px] tracking-[0.18em] text-violet-soft">{code}</p>
                    </div>
                  </div>

                  <div className="min-w-0 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-primary/40 bg-primary/20 px-2.5 py-1 text-[9px] tracking-[0.16em] text-violet-soft">
                        {t.achievements.mission} {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] tracking-[0.14em] text-white/70">
                        {loc(item.zone, locale)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-extrabold leading-snug tracking-wide text-white sm:text-3xl">
                      {loc(item.title, locale)}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/88 sm:text-[15px]">
                      {loc(item.detail, locale)}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-white/15 pt-4">
                      <div className="rounded-xl border border-white/15 bg-black/40 px-3 py-2">
                        <p className="text-[9px] tracking-[0.16em] text-white/45 uppercase">
                          {t.achievements.zone}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-white/90">
                          {loc(item.zone, locale)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-3 py-2">
                        <p className="text-[9px] tracking-[0.16em] text-emerald-200/70 uppercase">
                          {t.achievements.outcome}
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-emerald-100">
                          {loc(item.outcome, locale)}
                        </p>
                      </div>
                      <div className="rounded-xl border border-primary/30 bg-primary/10 px-3 py-2">
                        <p className="text-[9px] tracking-[0.16em] text-violet-soft/70 uppercase">
                          Ballas
                        </p>
                        <p className="mt-0.5 text-xs font-semibold text-violet-soft">Los Santos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
