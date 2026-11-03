import { useMemo, useState } from "react";
import { gangRules, loc, type GangRule } from "@/data/gang";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { fill, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type SeverityFilter = "all" | GangRule["severity"];

function highlight(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const needle = q.toLowerCase();
  const parts: Array<{ t: string; hit: boolean }> = [];
  let i = 0;
  while (i < text.length) {
    const at = lower.indexOf(needle, i);
    if (at === -1) {
      parts.push({ t: text.slice(i), hit: false });
      break;
    }
    if (at > i) parts.push({ t: text.slice(i, at), hit: false });
    parts.push({ t: text.slice(at, at + q.length), hit: true });
    i = at + q.length;
  }
  return (
    <>
      {parts.map((part, idx) =>
        part.hit ? (
          <mark key={idx} className="ballas-rules-hit rounded px-0.5">
            {part.t}
          </mark>
        ) : (
          <span key={idx}>{part.t}</span>
        ),
      )}
    </>
  );
}

export function RulesPanel() {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SeverityFilter>("all");

  const counts = useMemo(() => {
    const base = { all: gangRules.length, law: 0, blood: 0, street: 0 };
    for (const rule of gangRules) base[rule.severity] += 1;
    return base;
  }, []);

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
        locale === "ar" ? "قانون" : "LAW",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, filter, locale, t.rules.severity]);

  const filters: { id: SeverityFilter; label: string; count: number }[] = [
    { id: "all", label: t.rules.all, count: counts.all },
    { id: "law", label: t.rules.severity.law, count: counts.law },
    { id: "blood", label: t.rules.severity.blood, count: counts.blood },
    { id: "street", label: t.rules.severity.street, count: counts.street },
  ];

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
        {/* Epic banner — original look */}
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

        {/* Search command dock */}
        <section className="ballas-rules-dock sticky top-0 z-20 overflow-hidden rounded-[1.35rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,oklch(0.55_0.26_305/0.28),transparent_55%)]" />
          <div className="relative space-y-3 p-3.5 sm:p-4">
            <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
              <label className="relative min-w-0 flex-1">
                <span className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-base text-violet-soft">
                  ⌕
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.rules.search}
                  className="ballas-rules-search w-full rounded-2xl border border-white/20 bg-[oklch(0.14_0.06_305)] py-3.5 ps-11 pe-24 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-primary/65 focus:ring-2 focus:ring-primary/30 sm:text-[15px]"
                />
                <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 rounded-full border border-primary/35 bg-primary/15 px-2.5 py-1 text-[9px] tracking-[0.14em] text-violet-soft">
                  {fill(t.rules.results, { count: filtered.length })}
                </span>
              </label>

              {(query || filter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFilter("all");
                  }}
                  className="shrink-0 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-[11px] tracking-[0.14em] text-white/70 transition hover:border-primary/45 hover:text-violet-soft"
                >
                  {t.rules.clear}
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {filters.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[10px] tracking-[0.14em] uppercase transition",
                      active
                        ? item.id === "blood"
                          ? "bg-red-500 text-white shadow-[0_0_22px_oklch(0.65_0.22_25/0.45)]"
                          : item.id === "street"
                            ? "bg-white/20 text-white shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                            : "bg-primary text-white shadow-[0_0_22px_oklch(0.64_0.28_305/0.45)]"
                        : "border border-white/15 bg-[oklch(0.16_0.07_305)] text-white/65 hover:border-primary/40 hover:text-violet-soft",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[9px] font-bold",
                        active ? "bg-black/25 text-white" : "bg-white/10 text-white/70",
                      )}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {filtered.length === 0 ? (
          <div className="rounded-[1.4rem] border border-white/15 bg-[oklch(0.16_0.07_305)] px-5 py-12 text-center">
            <p className="font-display text-3xl tracking-[0.08em] text-white/80">{t.rules.emptySearch}</p>
            <p className="mt-2 text-sm text-white/50">{t.rules.emptyHint}</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold tracking-[0.14em] text-white transition hover:bg-violet-glow"
            >
              {t.rules.clear}
            </button>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {filtered.map((rule, index) => {
              const title = loc(rule.title, locale);
              const detail = loc(rule.detail, locale);
              return (
                <article
                  key={rule.id}
                  className="ballas-rise ballas-rule-card group relative overflow-hidden rounded-[1.4rem]"
                  style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
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
                            {highlight(title, query)}
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
                      {highlight(detail, query)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="rounded-[1.25rem] border border-primary/45 bg-[oklch(0.18_0.09_305)] px-5 py-4 text-center text-xs tracking-[0.14em] text-violet-soft shadow-[0_14px_36px_rgba(0,0,0,0.45)]">
          {t.rules.footer}
        </p>
      </div>
    </div>
  );
}
