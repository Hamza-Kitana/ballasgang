import { GANG, gangRules, joinSteps, loc } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { fill, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function JoinPanel() {
  const { t, locale } = useLanguage();
  const discordUrl = `https://${GANG.discord}`;

  return (
    <div className="flex h-full flex-col">
      <PanelChrome eyebrow={t.join.eyebrow} title={t.join.title} subtitle={t.join.subtitle} />

      <div className="panel-scroll min-h-0 flex-1 space-y-7 pb-2">
        {/* Apply CTA */}
        <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/45 bg-gradient-to-br from-primary/25 via-black/50 to-black/70 p-5 sm:p-7">
          <div className="pointer-events-none absolute -end-10 top-0 h-44 w-44 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <BallasLogo showWordmark={false} size="md" />
              <div>
                <p className="text-xs tracking-[0.2em] text-violet-soft">{t.join.path}</p>
                <h3 className="font-display mt-1 text-[clamp(1.8rem,4vw,2.8rem)] leading-none tracking-[0.04em]">
                  {t.join.ctaLead}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                  {t.join.ctaBody}
                </p>
                <p className="mt-3 text-[11px] tracking-[0.12em] text-white/50">{t.join.applyNote}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {t.join.rules.map((rule) => (
                    <span
                      key={rule}
                      className="rounded-full border border-primary/35 bg-black/35 px-3 py-1 text-[10px] tracking-[0.14em] text-violet-soft"
                    >
                      {rule}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="ballas-home-cta inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-bold tracking-[0.14em] text-white transition hover:scale-[1.03] hover:bg-violet-glow"
            >
              {t.join.discord}
            </a>
          </div>
        </div>

        {/* How to apply */}
        <section>
          <div className="mb-4">
            <p className="text-[10px] tracking-[0.28em] text-violet-soft uppercase">{t.join.path}</p>
            <h3 className="mt-1 font-display text-4xl tracking-[0.05em] sm:text-5xl">
              {t.join.howTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-white/60">{t.join.howSubtitle}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {joinSteps.map((step, index) => (
              <div
                key={step.step}
                className="ballas-rise ballas-join-step relative overflow-hidden rounded-[1.35rem] p-4 sm:p-5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-3xl leading-none text-primary">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/50">
                    {fill(t.join.stepLabel, { step: step.step })}
                  </span>
                </div>
                <h4 className="mt-5 text-xl font-bold tracking-wide">{loc(step.title, locale)}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {loc(step.detail, locale)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Laws applicants must accept */}
        <section>
          <div className="mb-4">
            <p className="text-[10px] tracking-[0.28em] text-violet-soft uppercase">
              {t.rules.eyebrow}
            </p>
            <h3 className="mt-1 font-display text-4xl tracking-[0.05em] sm:text-5xl">
              {t.join.lawsTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-white/60">{t.join.lawsSubtitle}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {gangRules.map((rule, index) => (
              <article
                key={rule.id}
                className="ballas-rise relative overflow-hidden rounded-[1.25rem] border border-white/12 bg-black/40 p-4 backdrop-blur-sm"
                style={{ animationDelay: `${index * 35}ms` }}
              >
                <div
                  className={cn(
                    "absolute inset-y-0 start-0 w-1",
                    rule.severity === "blood" && "bg-red-500",
                    rule.severity === "law" && "bg-primary",
                    rule.severity === "street" && "bg-white/40",
                  )}
                />
                <div className="flex items-start gap-3 ps-2">
                  <span className="font-display text-3xl leading-none text-primary">
                    {rule.code}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-lg font-bold tracking-wide">
                        {loc(rule.title, locale)}
                      </h4>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[9px] tracking-[0.14em] uppercase",
                          rule.severity === "blood" && "bg-red-500/20 text-red-200",
                          rule.severity === "law" && "bg-primary/20 text-violet-soft",
                          rule.severity === "street" && "bg-white/10 text-white/65",
                        )}
                      >
                        {t.rules.severity[rule.severity]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      {loc(rule.detail, locale)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Final Discord strip */}
        <a
          href={discordUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-4 rounded-[1.35rem] border border-primary/50 bg-gradient-to-r from-primary/20 to-black/50 px-5 py-5 transition hover:border-violet-glow hover:from-primary/30"
        >
          <div>
            <p className="text-xs tracking-[0.18em] text-violet-soft">{GANG.discord}</p>
            <p className="mt-1 font-display text-3xl tracking-[0.05em] sm:text-4xl">
              {t.join.discord}
            </p>
            <p className="mt-1 text-xs text-white/50">{t.join.applyNote}</p>
          </div>
          <span className="text-3xl text-primary transition group-hover:translate-x-1 group-hover:text-violet-soft rtl:rotate-180 rtl:group-hover:-translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
