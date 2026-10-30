import { gangRules, loc } from "@/data/gang";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function RulesPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <PanelChrome eyebrow={t.rules.eyebrow} title={t.rules.title} subtitle={t.rules.subtitle} />

      <div className="panel-scroll min-h-0 flex-1 space-y-4 pb-2">
        <div className="grid gap-3 lg:grid-cols-2">
          {gangRules.map((rule, index) => (
            <article
              key={rule.id}
              className="ballas-rise ballas-rule-card group relative overflow-hidden rounded-[1.35rem]"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div
                className={cn(
                  "absolute inset-y-0 start-0 w-1.5",
                  rule.severity === "blood" && "bg-gradient-to-b from-red-400 to-red-600",
                  rule.severity === "law" && "bg-gradient-to-b from-violet-soft to-primary",
                  rule.severity === "street" && "bg-gradient-to-b from-white/70 to-white/25",
                )}
              />

              <div className="relative flex h-full flex-col gap-4 p-4 ps-5 sm:p-5 sm:ps-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/35 bg-primary/15 text-3xl leading-none text-primary shadow-[0_0_24px_oklch(0.64_0.28_305/0.25)]">
                      {rule.code}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.22em] text-white/45 uppercase">
                        {locale === "ar" ? "قانون" : "LAW"} {rule.code}
                      </p>
                      <h3 className="mt-1 text-xl font-bold tracking-wide sm:text-2xl">
                        {loc(rule.title, locale)}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-[9px] tracking-[0.16em] uppercase",
                      rule.severity === "blood" &&
                        "border border-red-400/30 bg-red-500/20 text-red-200",
                      rule.severity === "law" &&
                        "border border-primary/35 bg-primary/20 text-violet-soft",
                      rule.severity === "street" &&
                        "border border-white/15 bg-white/10 text-white/70",
                    )}
                  >
                    {t.rules.severity[rule.severity]}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-white/80">
                  {loc(rule.detail, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="rounded-[1.25rem] border border-primary/35 bg-gradient-to-r from-primary/20 to-black/40 px-5 py-4 text-center text-xs tracking-[0.14em] text-violet-soft shadow-[0_0_28px_oklch(0.64_0.28_305/0.15)]">
          {t.rules.footer}
        </p>
      </div>
    </div>
  );
}
