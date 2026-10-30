import { GANG, joinSteps, loc } from "@/data/gang";
import { CrownMark } from "@/components/ballas/CrownMark";
import { fill, useLanguage } from "@/i18n/LanguageProvider";

export function JoinPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs tracking-[0.28em] text-violet-soft">{t.join.eyebrow}</p>
        <h2 className="font-display mt-1 text-[clamp(2.4rem,7vw,4.5rem)] leading-none tracking-[0.06em]">
          {t.join.title}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t.join.subtitle}</p>
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-5">
        <div className="ballas-recruit relative overflow-hidden p-5 sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,oklch(0.55_0.28_305/0.35),transparent_55%)]" />
          <div className="pointer-events-none absolute -end-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <CrownMark className="h-14 w-14 shrink-0 drop-shadow-[0_0_20px_oklch(0.72_0.28_310/0.65)]" />
              <div>
                <p className="text-xs tracking-[0.22em] text-violet-soft">{t.join.path}</p>
                <h3 className="font-display mt-1 text-[clamp(1.8rem,4vw,2.8rem)] leading-none tracking-[0.04em]">
                  {t.join.ctaLead}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{t.join.ctaBody}</p>
              </div>
            </div>

            <a
              href={`https://${GANG.discord}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center border border-primary/80 bg-primary/50 px-7 py-4 text-lg font-bold tracking-[0.14em] text-white shadow-[0_0_30px_oklch(0.64_0.28_305/0.35)] transition hover:bg-primary"
            >
              {t.join.discord}
            </a>
          </div>

          <div className="relative z-10 mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {t.join.rules.map((rule) => (
              <span
                key={rule}
                className="border border-primary/40 bg-primary/15 px-3 py-1 text-[10px] tracking-[0.18em] text-violet-soft"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {joinSteps.map((step) => (
            <article
              key={step.step}
              className="ballas-step group relative flex min-h-[200px] flex-col overflow-hidden p-4 transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-display text-6xl leading-none text-primary/90">
                  {String(step.step).padStart(2, "0")}
                </span>
                <span className="border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] tracking-[0.14em] text-muted-foreground">
                  {fill(t.join.stepLabel, { step: step.step })}
                </span>
              </div>

              <div className="mt-auto pt-8">
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
          className="group flex items-center justify-between gap-4 border border-primary/55 bg-black/60 px-5 py-4 transition hover:border-violet-glow hover:bg-primary/20"
        >
          <div>
            <p className="text-xs tracking-[0.2em] text-violet-soft">{GANG.discord}</p>
            <p className="mt-1 font-display text-3xl tracking-[0.06em]">{t.join.discord}</p>
          </div>
          <span className="text-3xl text-primary transition group-hover:text-violet-soft rtl:rotate-180">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
