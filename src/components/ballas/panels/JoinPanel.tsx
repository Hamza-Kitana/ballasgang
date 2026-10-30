import { GANG, joinSteps, loc } from "@/data/gang";
import { CrownMark } from "@/components/ballas/CrownMark";
import { fill, useLanguage } from "@/i18n/LanguageProvider";

export function JoinPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs tracking-[0.28em] text-violet-soft">{t.join.eyebrow}</p>
        <h2 className="mt-1 text-4xl font-bold tracking-[0.08em] sm:text-6xl">{t.join.title}</h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t.join.subtitle}</p>
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-5">
        <div className="relative overflow-hidden border border-primary/35 bg-black/55 p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,oklch(0.55_0.28_305/0.28),transparent_55%)]" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <CrownMark className="h-12 w-12 shrink-0" />
              <div>
                <p className="text-xs tracking-[0.22em] text-violet-soft">{t.join.path}</p>
                <h3 className="mt-1 text-2xl font-bold tracking-wide sm:text-3xl">{t.join.ctaLead}</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{t.join.ctaBody}</p>
              </div>
            </div>

            <a
              href={`https://${GANG.discord}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center border border-primary/70 bg-primary/40 px-6 py-3.5 text-lg font-bold tracking-[0.14em] text-white transition hover:bg-primary"
            >
              {t.join.discord}
            </a>
          </div>

          <div className="relative z-10 mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {t.join.rules.map((rule) => (
              <span
                key={rule}
                className="border border-primary/35 bg-primary/10 px-3 py-1 text-[10px] tracking-[0.18em] text-violet-soft"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {joinSteps.map((step) => (
            <article
              key={step.step}
              className="group relative flex min-h-[190px] flex-col overflow-hidden border border-white/10 bg-black/55 p-4 transition duration-200 hover:border-primary/55"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-display text-5xl leading-none text-primary/85">
                  {String(step.step).padStart(2, "0")}
                </span>
                <span className="border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tracking-[0.14em] text-muted-foreground">
                  {fill(t.join.stepLabel, { step: step.step })}
                </span>
              </div>

              <div className="mt-auto pt-6">
                <h3 className="text-xl font-bold tracking-wide sm:text-2xl">
                  {loc(step.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {loc(step.detail, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <a
          href={`https://${GANG.discord}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between gap-4 border border-primary/50 bg-black/55 px-5 py-4 transition hover:border-violet-glow hover:bg-primary/15"
        >
          <div>
            <p className="text-xs tracking-[0.2em] text-violet-soft">{GANG.discord}</p>
            <p className="mt-1 text-xl font-bold tracking-wide sm:text-2xl">{t.join.discord}</p>
          </div>
          <span className="text-2xl text-primary transition group-hover:text-violet-soft rtl:rotate-180">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
