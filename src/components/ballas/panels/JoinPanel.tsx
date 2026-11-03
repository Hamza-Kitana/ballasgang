import { GANG, joinSteps, loc } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { fill, useLanguage } from "@/i18n/LanguageProvider";

export function JoinPanel() {
  const { t, locale } = useLanguage();
  const discordUrl = GANG.discordUrl;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="panel-scroll min-h-0 flex-1 pb-2">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-1 py-2 text-center sm:py-4">
          {/* Hero apply card — centered */}
          <section className="ballas-join-hero ballas-rise relative w-full overflow-hidden rounded-[1.75rem] px-5 py-8 sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.55_0.28_305/0.4),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/70 to-transparent" />
            <div className="pointer-events-none absolute -start-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
            <div className="pointer-events-none absolute -end-10 top-1/3 h-40 w-40 rounded-full bg-violet-glow/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center">
              <BallasLogo size="lg" glow />

              <p className="mt-5 text-[10px] tracking-[0.32em] text-violet-soft uppercase sm:text-[11px]">
                {t.join.eyebrow}
              </p>
              <h2 className="font-display mt-2 text-[clamp(2.4rem,9vw,4.4rem)] leading-none tracking-[0.05em] text-white text-glow">
                {t.join.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                {t.join.ctaBody}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {t.join.rules.map((rule) => (
                  <span
                    key={rule}
                    className="rounded-full border border-primary/40 bg-black/35 px-3.5 py-1.5 text-[10px] tracking-[0.14em] text-violet-soft"
                  >
                    {rule}
                  </span>
                ))}
              </div>

              <a
                href={discordUrl}
                target="_blank"
                rel="noreferrer"
                className="ballas-join-discord ballas-home-cta group mt-8 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-[#5865F2] px-8 py-4 text-base font-bold tracking-[0.12em] text-white transition hover:scale-[1.03] hover:brightness-110 sm:w-auto sm:px-12 sm:py-5 sm:text-lg"
              >
                <DiscordGlyph className="h-6 w-6 shrink-0" />
                <span>{t.join.discord}</span>
                <span className="text-white/80 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
                  →
                </span>
              </a>

              <p className="mt-3 text-[11px] tracking-[0.14em] text-white/50">{t.join.discordHint}</p>
              <p className="mt-4 max-w-md text-[11px] leading-relaxed tracking-[0.06em] text-white/40">
                {t.join.applyNote}
              </p>
            </div>
          </section>

          {/* Steps */}
          <section className="mt-8 w-full sm:mt-10">
            <p className="text-[10px] tracking-[0.28em] text-violet-soft uppercase">{t.join.path}</p>
            <h3 className="mt-1 font-display text-[clamp(2rem,6vw,3.2rem)] tracking-[0.05em] text-white">
              {t.join.howTitle}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">{t.join.howSubtitle}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {joinSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="ballas-rise ballas-join-step relative overflow-hidden rounded-[1.35rem] p-4 text-start sm:p-5"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-2xl leading-none text-primary">
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/50">
                      {fill(t.join.stepLabel, { step: step.step })}
                    </span>
                  </div>
                  <h4 className="mt-4 text-lg font-bold tracking-wide text-white">
                    {loc(step.title, locale)}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {loc(step.detail, locale)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom clear CTA again */}
          <a
            href={discordUrl}
            target="_blank"
            rel="noreferrer"
            className="ballas-rise group mt-8 inline-flex w-full max-w-lg flex-col items-center gap-2 rounded-[1.35rem] border border-primary/45 bg-[oklch(0.16_0.08_305)] px-6 py-6 transition hover:border-violet-glow hover:bg-[oklch(0.2_0.1_305)] sm:mt-10"
          >
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-violet-soft">
              <DiscordGlyph className="h-4 w-4" />
              {GANG.discord}
            </span>
            <span className="font-display text-[clamp(1.8rem,5vw,2.6rem)] tracking-[0.06em] text-white">
              {t.join.ctaLead}
            </span>
            <span className="rounded-full bg-[#5865F2] px-6 py-2.5 text-sm font-bold tracking-[0.14em] text-white transition group-hover:brightness-110">
              {t.join.discord} →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function DiscordGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.07.07 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
