import { useMemo, useState } from "react";
import { GANG, loc } from "@/data/gang";
import {
  shopCategories,
  shopProducts,
  type ShopBadge,
  type ShopCategory,
  type ShopProduct,
} from "@/data/shop";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { fill, useLanguage } from "@/i18n/LanguageProvider";
import { messages, type Locale } from "@/i18n/messages";
import { cn } from "@/lib/utils";

type ShopMessages = (typeof messages)["ar"]["shop"];

function badgeLabel(badge: ShopBadge, shop: ShopMessages) {
  return shop.badges[badge];
}

function ProductCard({
  product,
  index,
  locale,
  orderLabel,
  discordUrl,
  shop,
}: {
  product: ShopProduct;
  index: number;
  locale: Locale;
  orderLabel: string;
  discordUrl: string;
  shop: ShopMessages;
}) {
  return (
    <article
      className="ballas-rise ballas-shop-card group relative overflow-hidden"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={product.image}
          alt={loc(product.name, locale)}
          className="ballas-shop-card-img h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.06_305)] via-[oklch(0.12_0.06_305/0.35)] to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[9px] tracking-[0.16em] text-white/80 backdrop-blur-md">
            {shop.categories[product.category]}
          </span>
          {product.badge ? (
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 text-[9px] tracking-[0.16em] backdrop-blur-md",
                product.badge === "hot" && "border-rose-400/45 bg-rose-500/25 text-rose-100",
                product.badge === "new" && "border-emerald-400/45 bg-emerald-500/25 text-emerald-100",
                product.badge === "limited" && "border-amber-300/45 bg-amber-400/20 text-amber-100",
              )}
            >
              {badgeLabel(product.badge, shop)}
            </span>
          ) : null}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <p className="font-display text-2xl tracking-[0.06em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] sm:text-3xl">
            {product.price}
          </p>
        </div>
      </div>

      <div className="relative space-y-3 p-4 sm:p-5">
        <div className="text-start">
          <p className="text-[10px] tracking-[0.18em] text-violet-soft uppercase">
            {loc(product.meta, locale)}
          </p>
          <h3 className="mt-1 text-xl font-extrabold tracking-wide text-white sm:text-2xl">
            {loc(product.name, locale)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            {loc(product.blurb, locale)}
          </p>
        </div>

        <a
          href={discordUrl}
          target="_blank"
          rel="noreferrer"
          className="ballas-shop-order inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold tracking-[0.16em] text-white transition hover:scale-[1.02] hover:bg-violet-glow active:scale-[0.98]"
        >
          {orderLabel}
          <span className="rtl:rotate-180">→</span>
        </a>
      </div>
    </article>
  );
}

export function ShopPanel() {
  const { t, locale } = useLanguage();
  const [category, setCategory] = useState<ShopCategory | "all">("all");
  const [query, setQuery] = useState("");
  const discordUrl = GANG.discordUrl;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shopProducts.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      const haystack = [
        loc(item.name, locale),
        loc(item.blurb, locale),
        loc(item.meta, locale),
        item.price,
        t.shop.categories[item.category],
        item.badge ? t.shop.badges[item.badge] : "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [category, query, locale, t.shop.badges, t.shop.categories]);

  const featured =
    shopProducts.find((item) => item.id === "sultan-dynasty") ?? shopProducts[0]!;
  const searching = query.trim().length > 0;

  return (
    <div className="flex h-full flex-col">
      <PanelChrome
        eyebrow={t.shop.eyebrow}
        title={t.shop.title}
        subtitle={t.shop.subtitle}
        end={
          <span className="rounded-full border border-primary/45 bg-primary/20 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-violet-soft">
            {String(shopProducts.length).padStart(2, "0")} {t.shop.countLabel}
          </span>
        }
      />

      <div className="panel-scroll min-h-0 flex-1 pb-2">
        <section className="ballas-shop-hero relative mb-5 overflow-hidden rounded-[1.6rem]">
          <img
            src={featured.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,oklch(0.12_0.07_305/0.92)_0%,oklch(0.14_0.08_305/0.72)_48%,oklch(0.18_0.1_305/0.35)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/60 to-transparent" />

          <div className="relative flex min-h-[14rem] flex-col justify-end gap-4 p-5 sm:min-h-[16rem] sm:flex-row sm:items-end sm:justify-between sm:p-7">
            <div className="max-w-xl text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/45 bg-black/45 px-3 py-1 text-[10px] tracking-[0.18em] text-violet-soft">
                  {t.shop.eyebrow}
                </span>
                <span className="rounded-full border border-rose-400/40 bg-rose-500/25 px-3 py-1 text-[10px] tracking-[0.16em] text-rose-100">
                  {t.shop.bannerBadge}
                </span>
              </div>
              <h3 className="font-display mt-3 text-[clamp(2rem,5.5vw,3.4rem)] leading-none tracking-[0.05em] text-glow">
                {t.shop.bannerTitle}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                {t.shop.bannerBody}
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/20 bg-black/45 px-4 py-3 text-start backdrop-blur-md">
              <p className="text-[9px] tracking-[0.2em] text-white/50 uppercase">{t.shop.featured}</p>
              <p className="mt-1 text-lg font-bold text-white">{loc(featured.name, locale)}</p>
              <p className="font-display mt-1 text-2xl text-primary">{featured.price}</p>
            </div>
          </div>
        </section>

        <div className="ballas-shop-toolbar sticky top-0 z-30 mb-5">
          <div className="ballas-shop-toolbar-inner mx-auto flex w-full max-w-3xl flex-col items-center gap-3 px-1 py-3">
            <div className="relative w-full max-w-xl">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.shop.search}
                className="ballas-shop-search w-full rounded-full border border-white/15 bg-black/55 py-3 pe-11 ps-5 text-center text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/40 focus:border-primary/55 focus:ring-2 focus:ring-primary/25"
                aria-label={t.shop.search}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] tracking-[0.12em] text-white/80"
                >
                  {t.shop.clear}
                </button>
              ) : (
                <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-sm text-white/35">
                  ⌕
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={cn(
                  "ballas-shop-chip rounded-full border px-4 py-2 text-[11px] tracking-[0.16em] transition",
                  category === "all"
                    ? "border-primary/60 bg-primary/30 text-white"
                    : "border-white/20 bg-black/35 text-white/70 hover:border-primary/40 hover:text-white",
                )}
              >
                {t.shop.all}
              </button>
              {shopCategories.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCategory(id)}
                  className={cn(
                    "ballas-shop-chip rounded-full border px-4 py-2 text-[11px] tracking-[0.16em] transition",
                    category === id
                      ? "border-primary/60 bg-primary/30 text-white"
                      : "border-white/20 bg-black/35 text-white/70 hover:border-primary/40 hover:text-white",
                  )}
                >
                  {t.shop.categories[id]}
                </button>
              ))}
            </div>

            {searching ? (
              <p className="text-[10px] tracking-[0.14em] text-violet-soft">
                {fill(t.shop.results, { count: String(filtered.length) })}
              </p>
            ) : null}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto max-w-md rounded-[1.35rem] border border-white/15 bg-black/35 px-6 py-10 text-center">
            <p className="text-lg font-bold text-white">{t.shop.emptySearch}</p>
            <p className="mt-2 text-sm text-white/60">{t.shop.emptyHint}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                locale={locale}
                orderLabel={t.shop.order}
                discordUrl={discordUrl}
                shop={t.shop}
              />
            ))}
          </div>
        )}

        <p className="mt-5 pb-2 text-center text-[11px] tracking-[0.14em] text-white/45">
          {t.shop.footer}
        </p>
      </div>
    </div>
  );
}
