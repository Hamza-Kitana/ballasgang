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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

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
    price: "",
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
    setSelected(Math.max(0, selected - 1));
  };

  if (!current) {
    return (
      <SectionCard title="المتجر · Shop">
        <Button type="button" onClick={addProduct}>
          <Plus className="h-4 w-4" /> إضافة منتج
        </Button>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="المتجر · Shop"
      actions={
        <>
          <Button type="button" size="sm" onClick={addProduct}>
            <Plus className="h-4 w-4" /> إضافة
          </Button>
          <Button type="button" size="sm" variant="destructive" onClick={removeProduct}>
            <Trash2 className="h-4 w-4" /> حذف
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {products.map((p, i) => (
          <button
            key={p.id || i}
            type="button"
            onClick={() => setSelected(i)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              i === selected
                ? "border-primary bg-primary/20 text-violet-soft"
                : "border-violet-500/20 text-muted-foreground hover:bg-violet-deep/40"
            }`}
          >
            {p.name.en || p.name.ar || p.id || `#${i + 1}`}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="المعرّف · id">
          <Input
            className={adminFieldClass}
            value={current.id}
            onChange={(e) => patchProduct({ id: e.target.value })}
          />
        </Field>
        <Field label="الفئة · category">
          <AdminSelect
            value={current.category}
            onChange={(e) => patchProduct({ category: e.target.value as ShopProduct["category"] })}
          >
            {CATEGORIES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </AdminSelect>
        </Field>
        <Field label="السعر · price">
          <Input
            className={adminFieldClass}
            value={current.price}
            onChange={(e) => patchProduct({ price: e.target.value })}
          />
        </Field>
        <Field label="الصورة · image">
          <Input
            className={adminFieldClass}
            value={current.image}
            onChange={(e) => patchProduct({ image: e.target.value })}
            placeholder="/shop/..."
          />
        </Field>
        <Field label="الشارة · badge">
          <AdminSelect
            value={current.badge ?? ""}
            onChange={(e) =>
              patchProduct({
                badge: (e.target.value || undefined) as ShopProduct["badge"],
              })
            }
          >
            <option value="">—</option>
            {BADGES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </AdminSelect>
        </Field>
        <Field label="مميز · featured">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!current.featured}
              onChange={(e) => patchProduct({ featured: e.target.checked })}
              className="h-4 w-4 rounded border-violet-500/40"
            />
            Featured on shop panel
          </label>
        </Field>
      </div>
      <LocalizedFields
        label="الاسم · name"
        value={current.name}
        onChange={(name) => patchProduct({ name })}
      />
      <LocalizedFields
        label="وصف قصير · blurb"
        multiline
        value={current.blurb}
        onChange={(blurb) => patchProduct({ blurb })}
      />
      <LocalizedFields
        label="ميتا · meta"
        value={current.meta}
        onChange={(meta) => patchProduct({ meta })}
      />
    </SectionCard>
  );
}