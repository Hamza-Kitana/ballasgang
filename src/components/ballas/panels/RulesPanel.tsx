import { gangRules, loc } from "@/data/gang";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function RulesPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PanelChrome
        eyebrow={t.rules.eyebrow}
        title={t.rules.title}
        subtitle={t.rules.subtitle}
        end={
          <span className="rounded-full border border-primary/45 bg-primary/20 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-violet-soft">
            {String(gangRules.length).padStart(2, "0")} {t.rules.countLabel}
          </span>
        }
      />

      <div className="panel-scroll min-h-0 flex-1 space-y-5 pb-2">
        {/* Top banner */}
        <section className="ballas-rules-banner relative overflow-hidden rounded-[1.5rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,oklch(0.55_0.28_305/0.4),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/60 to-transparent" />
          <div className="pointer-events-none absolute -end-8 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />

          <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div className="min-w-0 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/40 bg-black/40 px-3 py-1 text-[10px] tracking-[0.18em] text-violet-soft">
                  {t.rules.eyebrow}
                </span>
                <span className="rounded-full border border-red-400/35 bg-red-500/20 px-3 py-1 text-[10px] tracking-[0.16em] text-red-200">
                  {t.rules.bannerBadge}
                </span>
              </div>
              <h3 className="font-display mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-none tracking-[0.05em] text-glow">
                {t.rules.bannerTitle}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {t.rules.bannerBody}
              </p>
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col sm:items-end">
              {(
                [
                  ["law", t.rules.severity.law],
                  ["blood", t.rules.severity.blood],
                  ["street", t.rules.severity.street],
                ] as const
              ).map(([key, label]) => (
                <span
                  key={key}
                  className={cn(
                    "rounded-full px-3 py-1 text-[9px] tracking-[0.16em] uppercase",
                    key === "blood" && "border border-red-400/40 bg-red-500/25 text-red-100",
                    key === "law" && "border border-primary/45 bg-primary/25 text-violet-soft",
                    key === "street" && "border border-white/25 bg-white/10 text-white/80",
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Clear rule cards */}
        <div className="grid gap-4 lg:grid-cols-2">
          {gangRules.map((rule, index) => (
            <article
              key={rule.id}
              className="ballas-rise ballas-rule-card group relative overflow-hidden rounded-[1.4rem]"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div
                className={cn(
                  "absolute inset-y-0 start-0 w-1.5",
                  rule.severity === "blood" && "bg-gradient-to-b from-red-300 to-red-600",
                  rule.severity === "law" && "bg-gradient-to-b from-violet-soft to-primary",
                  rule.severity === "street" && "bg-gradient-to-b from-white/80 to-white/30",
                )}
              />
              <div className="pointer-events-none absolute -end-6 top-0 h-28 w-28 rounded-full bg-primary/15 blur-2xl transition group-hover:bg-primary/25" />

              <div className="relative flex h-full flex-col gap-4 p-4 ps-5 sm:p-5 sm:ps-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <span className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/50 bg-primary/20 text-3xl leading-none text-primary shadow-[0_0_28px_oklch(0.64_0.28_305/0.35)] ring-1 ring-white/10">
                      {rule.code}
                    </span>
                    <div className="min-w-0 text-start">
                      <p className="text-[10px] font-semibold tracking-[0.22em] text-violet-soft uppercase">
                        {locale === "ar" ? "قانون" : "LAW"} {rule.code}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold tracking-wide text-white sm:text-2xl">
                        {loc(rule.title, locale)}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-[0.16em] uppercase",
                      rule.severity === "blood" &&
                        "border border-red-400/45 bg-red-500/30 text-red-100",
                      rule.severity === "law" &&
                        "border border-primary/50 bg-primary/30 text-violet-soft",
                      rule.severity === "street" &&
                        "border border-white/25 bg-white/15 text-white/85",
                    )}
                  >
                    {t.rules.severity[rule.severity]}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-white/90 sm:text-[15px]">
                  {loc(rule.detail, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="rounded-[1.25rem] border border-primary/45 bg-[oklch(0.18_0.09_305)] px-5 py-4 text-center text-xs tracking-[0.14em] text-violet-soft shadow-[0_14px_36px_rgba(0,0,0,0.45)]">
          {t.rules.footer}
        </p>
      </div>
    </div>
  );
}
