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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const products = site.shopProducts;
  const current = editIndex !== null ? products[editIndex] : null;
  const open = editIndex !== null && Boolean(current);

  const updateProducts = (next: ShopProduct[]) => onPatch({ shopProducts: next });

  const patchProduct = (patch: Partial<ShopProduct>) => {
    if (editIndex === null || !current) return;
    const next = products.map((p, i) => {
      if (i !== editIndex) return p;
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
    setEditIndex(next.length - 1);
  };

  const removeAt = (index: number) => {
    const item = products[index];
    if (!item) return;
    const label = item.name.ar || item.name.en || item.id || "هذا المنتج";
    if (!confirm(`حذف ${label}؟`)) return;
    const next = products.filter((_, i) => i !== index);
    updateProducts(next);
    if (editIndex === index) setEditIndex(null);
    else if (editIndex !== null && editIndex > index) setEditIndex(editIndex - 1);
  };

  return (
    <>
      <SectionCard
        title="المتجر"
        subtitle="جدول المنتجات — اضغط على سطر للتعديل"
        actions={
          <Button type="button" size="sm" className="cms-btn-primary" onClick={addProduct}>
            <Plus className="h-4 w-4" /> منتج جديد
          </Button>
        }
      >
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/25 px-4 py-10 text-center">
            <p className="text-white/70">ما في منتجات بعد</p>
            <Button type="button" className="cms-btn-primary mt-4" onClick={addProduct}>
              <Plus className="h-4 w-4" /> إضافة منتج
            </Button>
          </div>
        ) : (
          <div className="cms-table-wrap overflow-x-auto rounded-2xl border border-white/10">
            <table className="cms-table w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-16">صورة</th>
                  <th>المنتج</th>
                  <th>الفئة</th>
                  <th>السعر</th>
                  <th>شارة</th>
                  <th>مميز</th>
                  <th className="w-28 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={p.id || i}
                    className={cn("cms-table-row", editIndex === i && "cms-table-row-active")}
                    onClick={() => setEditIndex(i)}
                  >
                    <td>
                      <div className="h-12 w-16 overflow-hidden rounded-lg border border-white/10 bg-black/40">
                        {p.image ? (
                          <img src={p.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[9px] text-white/30">
                            —
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <p className="font-semibold text-white">
                        {p.name.ar || p.name.en || "منتج بدون اسم"}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/40" dir="ltr">
                        {p.id || "no-id"}
                      </p>
                    </td>
                    <td>
                      <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] tracking-[0.08em] text-violet-soft uppercase">
                        {p.category === "cars" ? "سيارات" : "أواعي"}
                      </span>
                    </td>
                    <td>
                      <span className="font-display text-lg text-primary">{p.price || "—"}</span>
                    </td>
                    <td>
                      {p.badge ? (
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase",
                            p.badge === "hot" && "bg-rose-500/25 text-rose-100",
                            p.badge === "new" && "bg-emerald-500/25 text-emerald-100",
                            p.badge === "limited" && "bg-amber-500/25 text-amber-100",
                          )}
                        >
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td>
                      {p.featured ? (
                        <span className="text-violet-soft">نعم</span>
                      ) : (
                        <span className="text-white/30">لا</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-white/70 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditIndex(i);
                          }}
                          aria-label="تعديل"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-300/80 hover:text-red-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAt(i);
                          }}
                          aria-label="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) setEditIndex(null);
        }}
      >
        <DialogContent className="cms-dialog max-h-[90dvh] overflow-y-auto border-white/12 bg-[oklch(0.14_0.06_305)] text-white sm:max-w-3xl">
          {current ? (
            <>
              <DialogHeader className="text-start">
                <DialogTitle className="font-display text-3xl tracking-[0.06em]">
                  {current.name.ar || current.name.en || "تعديل المنتج"}
                </DialogTitle>
                <DialogDescription className="text-white/50" dir="ltr">
                  ID · {current.id || "سيتم توليده من الاسم"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
                <ImageField
                  label="صورة المنتج"
                  value={current.image}
                  onChange={(image) => patchProduct({ image })}
                  aspect="video"
                  hint="اسحب صورة أو ارفع من الجهاز"
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
                      مميز في المتجر
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
              </div>

              <DialogFooter className="gap-2 sm:justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (editIndex !== null) removeAt(editIndex);
                  }}
                >
                  <Trash2 className="h-4 w-4" /> حذف
                </Button>
                <Button type="button" className="cms-btn-primary" onClick={() => setEditIndex(null)}>
                  تم · إغلاق
                </Button>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
