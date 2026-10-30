import { gangRules, loc } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function RulesPanel() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs tracking-[0.28em] text-violet-soft">{t.rules.eyebrow}</p>
        <h2 className="font-display mt-1 text-[clamp(2.6rem,8vw,5rem)] leading-none tracking-[0.06em]">
          {t.rules.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t.rules.subtitle}</p>
        <div className="mt-3 h-px w-32 bg-gradient-to-r from-primary via-violet-glow to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {gangRules.map((rule, index) => (
            <article
              key={rule.id}
              className={cn(
                "ballas-rule group relative flex min-h-[210px] flex-col overflow-hidden p-4 transition duration-300",
                "hover:-translate-y-1",
                rule.severity === "blood" && "ballas-rule-blood",
                rule.severity === "law" && "ballas-rule-law",
                rule.severity === "street" && "ballas-rule-street",
              )}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="pointer-events-none absolute -end-2 -top-6 font-display text-[6.5rem] leading-none text-white/[0.04] transition group-hover:text-primary/15">
                {rule.code}
              </div>

              <div className="relative z-10 flex items-start justify-between gap-2">
                <span className="font-display text-4xl tracking-wider text-primary">
                  {rule.code}
                </span>
                <span className="border border-white/15 bg-black/40 px-2 py-0.5 text-[9px] tracking-[0.18em] text-violet-soft uppercase">
                  {t.rules.severity[rule.severity]}
                </span>
              </div>

              <div className="relative z-10 mt-auto pt-8">
                <h3 className="text-xl font-bold tracking-wide sm:text-2xl">
                  {loc(rule.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {loc(rule.detail, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 border border-primary/30 bg-primary/10 px-4 py-3 text-xs tracking-[0.12em] text-violet-soft">
          {t.rules.footer}
        </p>
      </div>
    </div>
  );
}
