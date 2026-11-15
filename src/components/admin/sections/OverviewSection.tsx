"use client";

import type { SiteData } from "@/data/site-types";
import { SectionCard } from "../fields";
import { Users, ScrollText, ShoppingBag, ListOrdered } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

type OverviewSectionProps = {
  site: SiteData;
  saveStatus: SaveStatus;
  dirty: boolean;
  loading?: boolean;
};

export function OverviewSection({ site, saveStatus, dirty, loading }: OverviewSectionProps) {
  const stats = [
    { label: "أعضاء · Members", value: site.members.length, icon: Users },
    { label: "قوانين · Rules", value: site.rules.length, icon: ScrollText },
    { label: "منتجات · Shop", value: site.shopProducts.length, icon: ShoppingBag },
    { label: "خطوات · Join", value: site.joinSteps.length, icon: ListOrdered },
  ];

  return (
    <div className="space-y-4">
      <SectionCard title="لوحة التحكم · Dashboard" subtitle={`إصدار البيانات v${site.version}`}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="rounded-xl border border-violet-500/15 bg-gradient-to-br from-primary/10 to-transparent p-4"
              >
                <Icon className="mb-2 h-5 w-5 text-primary" />
                <p className="text-2xl font-semibold tabular-nums text-violet-soft">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </div>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div className="rounded-lg border border-violet-500/15 bg-violet-deep/30 px-3 py-2">
            <dt className="text-muted-foreground">آخر تحديث · Updated</dt>
            <dd className="font-medium">{new Date(site.updatedAt).toLocaleString()}</dd>
          </div>
          <div className="rounded-lg border border-violet-500/15 bg-violet-deep/30 px-3 py-2">
            <dt className="text-muted-foreground">حالة الحفظ · Save</dt>
            <dd className="font-medium">
              {loading
                ? "جاري التحميل…"
                : saveStatus === "saving"
                  ? "جاري الحفظ…"
                  : saveStatus === "saved"
                    ? "تم الحفظ بنجاح"
                    : saveStatus === "error"
                      ? "فشل الحفظ"
                      : dirty
                        ? "تغييرات بانتظار الحفظ"
                        : "متزامن مع الخادم"}
            </dd>
          </div>
          <div className="rounded-lg border border-violet-500/15 bg-violet-deep/30 px-3 py-2 sm:col-span-2">
            <dt className="text-muted-foreground">العصابة · Gang</dt>
            <dd className="font-medium">
              {site.gang.name} — {site.gang.tagline} · {site.gang.city}
            </dd>
          </div>
        </dl>
      </SectionCard>
    </div>
  );
}