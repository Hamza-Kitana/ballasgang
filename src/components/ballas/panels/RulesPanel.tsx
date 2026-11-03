import { useEffect, useMemo, useState } from "react";
import {
  gangRules,
  loc,
  ruleCategories,
  type GangRule,
  type RuleCategory,
} from "@/data/gang";
import { fill, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const READ_KEY = "ballas-rules-read-v1";

function loadRead(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function saveRead(ids: Set<string>) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

export function RulesPanel() {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<RuleCategory>("leadership");
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setReadIds(loadRead());
  }, []);

  const toggleRead = (id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveRead(next);
      return next;
    });
  };

  const categoryStats = useMemo(() => {
    return ruleCategories.map((id) => {
      const list = gangRules.filter((r) => r.category === id);
      const read = list.filter((r) => readIds.has(r.id)).length;
      return { id, total: list.length, read };
    });
  }, [readIds]);

  const totalRead = readIds.size;
  const totalRules = gangRules.length;
  const progress = totalRules === 0 ? 0 : Math.round((totalRead / totalRules) * 100);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return gangRules.filter((rule) => {
      if (!q && rule.category !== category) return false;
      if (q) {
        const haystack = [
          rule.code,
          loc(rule.title, locale),
          loc(rule.detail, locale),
          t.rules.categories[rule.category],
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, locale, t.rules.categories]);

  const activeLabel = t.rules.categories[category];
  const searching = query.trim().length > 0;

  const sidebar = (
    <aside className="ballas-codex-sidebar ballas-rise order-2 w-full shrink-0 lg:sticky lg:top-0 lg:order-none lg:w-[17.5rem]">
      <div className="overflow-hidden rounded-[1.35rem] border border-white/12 bg-[oklch(0.13_0.06_305)] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.45)]">
        <p className="text-[10px] tracking-[0.28em] text-primary uppercase">{t.rules.centerBrand}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="text-xl font-bold tracking-wide text-white">{t.rules.centerTitle}</h3>
          <span className="font-display text-2xl leading-none text-violet-soft">
            {totalRead}/{totalRules}
          </span>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[10px] tracking-[0.14em] text-white/50">
            <span>{t.rules.progressLabel}</span>
            <span className="text-violet-soft">{progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-l from-violet-soft to-primary transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          {categoryStats.map((item) => {
            const active = !searching && category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCategory(item.id);
                  setQuery("");
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-start transition",
                  active
                    ? "border-primary/60 bg-primary/20 text-white shadow-[0_0_24px_oklch(0.64_0.28_305/0.28)]"
                    : "border-transparent bg-white/[0.03] text-white/70 hover:border-white/10 hover:bg-white/[0.06] hover:text-white",
                )}
              >
                <span className="text-[13px] font-medium tracking-wide">
                  {t.rules.categories[item.id]}
                </span>
                <span
                  className={cn(
                    "shrink-0 text-[11px] tabular-nums tracking-wider",
                    active ? "text-violet-soft" : "text-white/40",
                  )}
                >
                  {item.read}/{item.total}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );

  const main = (
    <div className="order-1 min-w-0 flex-1 space-y-5 lg:order-none">
      <header className="ballas-rise text-center">
        <p className="text-[10px] tracking-[0.35em] text-violet-soft uppercase">{t.rules.centerBrand}</p>
        <h2 className="font-display mt-2 text-[clamp(2.2rem,8vw,4.2rem)] leading-none tracking-[0.04em] text-white text-glow">
          {t.rules.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
          {t.rules.subtitle}
        </p>
      </header>

      <div className="ballas-codex-search-row ballas-rise flex flex-col gap-3 sm:flex-row sm:items-center">
        {!searching ? (
          <div className="inline-flex shrink-0 items-center gap-2 self-center rounded-full border border-primary/40 bg-primary/15 px-3.5 py-2 text-[11px] tracking-[0.08em] text-violet-soft sm:self-auto">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_oklch(0.78_0.18_155)]" />
            {activeLabel}
          </div>
        ) : (
          <div className="inline-flex shrink-0 items-center gap-2 self-center rounded-full border border-violet-soft/40 bg-violet-soft/10 px-3.5 py-2 text-[11px] tracking-[0.08em] text-violet-soft sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-violet-soft" />
            {fill(t.rules.results, { count: filtered.length })}
          </div>
        )}

        <label className="relative min-w-0 flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.rules.search}
            className="ballas-codex-search w-full rounded-2xl border border-white/15 bg-[oklch(0.14_0.05_305)] py-3.5 pe-12 ps-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-primary/55 focus:ring-2 focus:ring-primary/25"
          />
          <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-lg text-white/35">
            ⌕
          </span>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/12 bg-[oklch(0.14_0.05_305)] px-5 py-14 text-center">
          <p className="text-lg text-white/75">{t.rules.emptySearch}</p>
          <p className="mt-2 text-sm text-white/45">{t.rules.emptyHint}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((rule, index) => (
            <RuleCodexCard
              key={rule.id}
              rule={rule}
              index={index}
              read={readIds.has(rule.id)}
              onToggle={() => toggleRead(rule.id)}
              ruleTag={t.rules.ruleTag}
              confirmLabel={t.rules.confirmRead}
              confirmedLabel={t.rules.confirmed}
              locale={locale}
            />
          ))}
        </div>
      )}

      <p className="ballas-rise py-4 text-center font-display text-[clamp(1.6rem,5vw,2.8rem)] tracking-[0.18em] text-white/25">
        {t.rules.footer}
      </p>
    </div>
  );

  return (
    <div className="ballas-codex relative flex h-full min-h-0 flex-col">
      <div className="panel-scroll min-h-0 flex-1 pb-2">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 lg:flex-row lg:items-start lg:gap-6">
          {/* AR: sidebar first so it sits on the visual right under RTL */}
          {locale === "ar" ? (
            <>
              {sidebar}
              {main}
            </>
          ) : (
            <>
              {main}
              {sidebar}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RuleCodexCard({
  rule,
  index,
  read,
  onToggle,
  ruleTag,
  confirmLabel,
  confirmedLabel,
  locale,
}: {
  rule: GangRule;
  index: number;
  read: boolean;
  onToggle: () => void;
  ruleTag: string;
  confirmLabel: string;
  confirmedLabel: string;
  locale: "ar" | "en";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "ballas-codex-card ballas-rise group relative flex min-h-[11.5rem] flex-col overflow-hidden rounded-2xl border p-4 text-center outline-none transition duration-300",
        "focus-visible:ring-2 focus-visible:ring-primary",
        read
          ? "border-primary/50 bg-[oklch(0.18_0.08_305)] shadow-[0_0_28px_oklch(0.64_0.28_305/0.22)]"
          : "border-white/12 bg-[oklch(0.14_0.05_305)] hover:-translate-y-1 hover:border-primary/40",
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full border-2 transition",
            read
              ? "border-primary bg-primary text-[11px] text-white"
              : "border-white/30 group-hover:border-primary/60",
          )}
          aria-hidden
        >
          {read ? "✓" : null}
        </span>
        <span className="rounded-md bg-primary/90 px-2 py-0.5 text-[9px] font-bold tracking-[0.16em] text-white">
          {ruleTag} {rule.code}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-1 py-4">
        <p className="text-[15px] font-bold leading-snug text-white sm:text-base">
          {loc(rule.detail, locale)}
        </p>
      </div>

      <p
        className={cn(
          "text-[10px] tracking-[0.12em]",
          read ? "text-violet-soft" : "text-white/40",
        )}
      >
        {read ? confirmedLabel : confirmLabel}
      </p>
    </button>
  );
}
