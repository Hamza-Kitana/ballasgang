"use client";

import { useState } from "react";
import type { ShopProduct, SiteData } from "@/data/site-types";
import {
  AdminSelect,
  Field,
  LocalizedFields,
  SectionCard,
  adminFieldClass,
  slugFromName,
} from "../fields";
import { ImageField } from "../ImageField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ShopSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

const CATEGORIES: ShopProduct["category"][] = ["cars", "clothes"];
const BADGES: NonNullable<ShopProduct["badge"]>[] = ["hot", "new", "limited"];

function emptyProduct(): ShopProduct {
  return {
    id: "",
    category: "clothes",
    name: { ar: "", en: "" },
    blurb: { ar: "", en: "" },
    price: "$20",
    image: "",
    meta: { ar: "", en: "" },
    featured: false,
  };
}

export function ShopSection({ site, onPatch }: ShopSectionProps) {
  const [selected, setSelected] = useState(0);
  const products = site.shopProducts;
  const current = products[selected];

  const updateProducts = (next: ShopProduct[]) => onPatch({ shopProducts: next });

  const patchProduct = (patch: Partial<ShopProduct>) => {
    if (!current) return;
    const next = products.map((p, i) => {
      if (i !== selected) return p;
      const merged = { ...p, ...patch };
      if (patch.name !== undefined && !merged.id.trim()) {
        merged.id = slugFromName(merged.name.en || merged.name.ar);
      }
      return merged;
    });
    updateProducts(next);
  };

  const addProduct = () => {
    const next = [...products, emptyProduct()];
    updateProducts(next);
    setSelected(next.length - 1);
  };

  const removeProduct = () => {
    if (!current || !confirm("حذف المنتج؟ · Delete product?")) return;
    const next = products.filter((_, i) => i !== selected);
    updateProducts(next);
    setSelected(Math.max(0, Math.min(selected, next.length - 1)));
  };

  if (!current) {
    return (
      <SectionCard title="المتجر" subtitle="أضف أول منتج">
        <Button type="button" className="cms-btn-primary" onClick={addProduct}>
          <Plus className="h-4 w-4" /> إضافة منتج
        </Button>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-4">
      <SectionCard
        title="المتجر"
        subtitle="سيارات وأواعي — ارفع صورة المنتج من جهازك"
        actions={
          <>
            <Button type="button" size="sm" className="cms-btn-primary" onClick={addProduct}>
              <Plus className="h-4 w-4" /> منتج جديد
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={removeProduct}>
              <Trash2 className="h-4 w-4" /> حذف
            </Button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p, i) => (
            <button
              key={p.id || i}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "cms-pick-card group overflow-hidden text-start",
                i === selected && "cms-pick-card-active",
              )}
            >
              <div className="relative aspect-video overflow-hidden bg-black/40">
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs tracking-[0.16em] text-white/30">
                    NO IMAGE
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent p-2.5">
                  <span className="font-display text-lg text-primary">{p.price || "—"}</span>
                  {p.badge ? (
                    <span className="rounded-full bg-black/55 px-2 py-0.5 text-[9px] tracking-[0.12em] text-white/80 uppercase">
                      {p.badge}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate font-semibold text-white">
                  {p.name.ar || p.name.en || "منتج جديد"}
                </p>
                <p className="text-[11px] tracking-[0.12em] text-violet-soft uppercase">
                  {p.category}
                  {p.featured ? " · featured" : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title={current.name.ar || current.name.en || "تعديل المنتج"}
        subtitle={`ID · ${current.id || "سيتم توليده من الاسم"}`}
      >
        <ImageField
          label="صورة المنتج"
          value={current.image}
          onChange={(image) => patchProduct({ image })}
          aspect="video"
          hint="اسحب صورة أو ارفع من الجهاز — تظهر مباشرة في المتجر"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="المعرّف">
            <Input
              className={adminFieldClass}
              value={current.id}
              onChange={(e) => patchProduct({ id: e.target.value })}
            />
          </Field>
          <Field label="الفئة">
            <AdminSelect
              value={current.category}
              onChange={(e) =>
                patchProduct({ category: e.target.value as ShopProduct["category"] })
              }
            >
              {CATEGORIES.map((v) => (
                <option key={v} value={v}>
                  {v === "cars" ? "سيارات" : "أواعي"}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="السعر">
            <Input
              className={adminFieldClass}
              value={current.price}
              onChange={(e) => patchProduct({ price: e.target.value })}
              placeholder="$35"
            />
          </Field>
          <Field label="الشارة">
            <AdminSelect
              value={current.badge ?? ""}
              onChange={(e) =>
                patchProduct({
                  badge: (e.target.value || undefined) as ShopProduct["badge"],
                })
              }
            >
              <option value="">بدون</option>
              {BADGES.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="مميز">
            <label className="flex h-10 items-center gap-2 rounded-xl border border-white/12 bg-black/35 px-3 text-sm text-white/80">
              <input
                type="checkbox"
                checked={!!current.featured}
                onChange={(e) => patchProduct({ featured: e.target.checked })}
                className="h-4 w-4 rounded border-white/30"
              />
              إظهار كمميز في المتجر
            </label>
          </Field>
        </div>

        <LocalizedFields
          label="الاسم"
          value={current.name}
          onChange={(name) => patchProduct({ name })}
        />
        <LocalizedFields
          label="الوصف"
          multiline
          value={current.blurb}
          onChange={(blurb) => patchProduct({ blurb })}
        />
        <LocalizedFields
          label="تفاصيل تقنية"
          value={current.meta}
          onChange={(meta) => patchProduct({ meta })}
        />
      </SectionCard>
    </div>
  );
}
