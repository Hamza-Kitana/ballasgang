import { useMemo, useState } from "react";
import { gangRules, loc, type GangRule } from "@/data/gang";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { fill, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type SeverityFilter = "all" | GangRule["severity"];

export function RulesPanel() {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SeverityFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return gangRules.filter((rule) => {
      if (filter !== "all" && rule.severity !== filter) return false;
      if (!q) return true;
      const haystack = [
        rule.code,
        loc(rule.title, locale),
        loc(rule.detail, locale),
        t.rules.severity[rule.severity],
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, filter, locale, t.rules.severity]);

  const filters: { id: SeverityFilter; label: string }[] = [
    { id: "all", label: t.rules.all },
    { id: "law", label: t.rules.severity.law },
    { id: "blood", label: t.rules.severity.blood },
    { id: "street", label: t.rules.severity.street },
  ];

  return (
    <div className="flex h-full flex-col">
      <PanelChrome
        eyebrow={t.rules.eyebrow}
        title={t.rules.title}
        subtitle={t.rules.subtitle}
        end={
          <span className="rounded-full border border-primary/45 bg-primary/20 px-3 py-1 text-[10px] tracking-[0.16em] text-violet-soft">
            {String(gangRules.length).padStart(2, "0")} {t.rules.countLabel}
          </span>
        }
      />

      <div className="panel-scroll min-h-0 flex-1 space-y-4 pb-2">
        {/* Compact header strip */}
        <section className="ballas-rules-banner relative overflow-hidden rounded-2xl px-4 py-3.5 sm:px-5">
          <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-red-400/35 bg-red-500/20 px-2.5 py-0.5 text-[9px] tracking-[0.14em] text-red-200">
                  {t.rules.bannerBadge}
                </span>
              </div>
              <h3 className="font-display mt-1.5 text-[clamp(1.5rem,3.5vw,2.2rem)] leading-none tracking-[0.05em] text-white">
                {t.rules.bannerTitle}
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-white/75 sm:text-sm">
                {t.rules.bannerBody}
              </p>
            </div>
          </div>
        </section>

        {/* Search + filters */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-sm text-violet-soft/80">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.rules.search}
              className="ballas-rules-search w-full rounded-full border border-white/20 bg-[oklch(0.16_0.07_305)] py-2.5 ps-9 pe-4 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
            />
          </label>

          <div className="flex flex-wrap items-center gap-1.5">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase transition",
                  filter === item.id
                    ? item.id === "blood"
                      ? "bg-red-500 text-white"
                      : item.id === "street"
                        ? "bg-white/20 text-white"
                        : "bg-primary text-white"
                    : "border border-white/15 bg-[oklch(0.16_0.07_305)] text-white/65 hover:border-primary/40 hover:text-violet-soft",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-start text-[10px] tracking-[0.16em] text-white/45">
          {fill(t.rules.results, { count: filtered.length })}
        </p>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-white/15 bg-[oklch(0.16_0.07_305)] px-4 py-8 text-center text-sm text-white/70">
            {t.rules.emptySearch}
          </p>
        ) : (
          <div className="grid gap-2.5 lg:grid-cols-2">
            {filtered.map((rule, index) => (
              <article
                key={rule.id}
                className="ballas-rise ballas-rule-card group relative overflow-hidden rounded-xl"
                style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
              >
                <div
                  className={cn(
                    "absolute inset-y-0 start-0 w-1",
                    rule.severity === "blood" && "bg-red-500",
                    rule.severity === "law" && "bg-primary",
                    rule.severity === "street" && "bg-white/50",
                  )}
                />

                <div className="relative flex gap-3 p-3 ps-3.5 sm:p-3.5 sm:ps-4">
                  <span className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/45 bg-primary/20 text-xl leading-none text-primary">
                    {rule.code}
                  </span>

                  <div className="min-w-0 flex-1 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold tracking-wide text-white sm:text-lg">
                        {loc(rule.title, locale)}
                      </h3>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[8px] font-semibold tracking-[0.14em] uppercase",
                          rule.severity === "blood" && "bg-red-500/25 text-red-100",
                          rule.severity === "law" && "bg-primary/25 text-violet-soft",
                          rule.severity === "street" && "bg-white/15 text-white/80",
                        )}
                      >
                        {t.rules.severity[rule.severity]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-white/80 sm:text-[13px]">
                      {loc(rule.detail, locale)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="rounded-xl border border-primary/40 bg-[oklch(0.18_0.09_305)] px-4 py-3 text-center text-[11px] tracking-[0.12em] text-violet-soft">
          {t.rules.footer}
        </p>
      </div>
    </div>
  );
}
