"use client";

import type { SiteData } from "@/data/site-types";
import { SectionCard } from "../fields";
import { Users, ScrollText, ShoppingBag, ListOrdered, Database } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

type StoreStatus = {
  jsonbinConfigured?: boolean;
  binIdConfigured?: boolean;
  binId?: string | null;
};

type OverviewSectionProps = {
  site: SiteData;
  saveStatus: SaveStatus;
  dirty: boolean;
  loading?: boolean;
  store?: StoreStatus | null;
};

export function OverviewSection({
  site,
  saveStatus,
  dirty,
  loading,
  store,
}: OverviewSectionProps) {
  const stats = [
    { label: "أعضاء", value: site.members.length, icon: Users },
    { label: "قوانين", value: site.rules.length, icon: ScrollText },
    { label: "منتجات", value: site.shopProducts.length, icon: ShoppingBag },
    { label: "خطوات انضمام", value: site.joinSteps.length, icon: ListOrdered },
  ];

  const saveText = loading
    ? "جاري التحميل…"
    : saveStatus === "saving"
      ? "جاري الحفظ…"
      : saveStatus === "saved"
        ? "تم الحفظ بنجاح"
        : saveStatus === "error"
          ? "فشل الحفظ"
          : dirty
            ? "تغييرات بانتظار الحفظ"
            : "متزامن مع الخادم";

  return (
    <div className="space-y-4">
      <SectionCard
        title="نظرة عامة"
        subtitle={`${site.gang.name} · ${site.gang.tagline} · v${site.version}`}
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="cms-stat">
                <Icon className="mb-3 h-5 w-5 text-violet-soft" />
                <p className="font-display text-3xl tracking-wide text-white">{s.value}</p>
                <p className="mt-1 text-xs tracking-[0.14em] text-white/50 uppercase">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="cms-stat">
            <p className="text-[11px] tracking-[0.16em] text-white/45 uppercase">آخر تحديث</p>
            <p className="mt-2 text-sm font-medium text-white">
              {new Date(site.updatedAt).toLocaleString()}
            </p>
          </div>
          <div className="cms-stat">
            <p className="text-[11px] tracking-[0.16em] text-white/45 uppercase">حالة الحفظ</p>
            <p className="mt-2 text-sm font-medium text-white">{saveText}</p>
          </div>
          <div className="cms-stat sm:col-span-2">
            <div className="flex items-start gap-3">
              <Database className="mt-0.5 h-5 w-5 shrink-0 text-violet-soft" />
              <div>
                <p className="text-[11px] tracking-[0.16em] text-white/45 uppercase">JSONBin</p>
                <p className="mt-2 text-sm font-medium text-white">
                  {store?.jsonbinConfigured && store?.binIdConfigured
                    ? `متصل · ${store.binId}`
                    : store?.jsonbinConfigured
                      ? "المفتاح موجود — ينقص BIN_ID"
                      : "غير متصل — راجع إعدادات البيئة"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
