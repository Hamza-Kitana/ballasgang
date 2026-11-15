"use client";

import type { SiteData, SiteContent } from "@/data/site-types";
import { LocalizedFields, SectionCard } from "../fields";

type ContentSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

const FIELDS: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
  { key: "powerWord", label: "كلمة القوة · powerWord" },
  { key: "loadingLabel", label: "تحميل · loadingLabel" },
  { key: "loadingSub", label: "تحميل فرعي · loadingSub" },
  { key: "homeWelcome", label: "ترحيب · homeWelcome", multiline: true },
  { key: "homePitch", label: "عرض · homePitch", multiline: true },
  { key: "homeMission", label: "المهمة · homeMission", multiline: true },
  { key: "homeCtaCrew", label: "CTA الطاقم · homeCtaCrew" },
  { key: "homeCtaJoin", label: "CTA الانضمام · homeCtaJoin" },
];

export function ContentSection({ site, onPatch }: ContentSectionProps) {
  const c = site.content;
  const setField = (key: keyof SiteContent, value: (typeof c)[typeof key]) => {
    onPatch({ content: { ...c, [key]: value } });
  };

  return (
    <SectionCard title="محتوى الموقع · Content" subtitle="نصوص عربي/إنجليزي للواجهة العامة">
      {FIELDS.map((f) => (
        <LocalizedFields
          key={f.key}
          label={f.label}
          multiline={f.multiline}
          value={c[f.key]}
          onChange={(next) => setField(f.key, next)}
        />
      ))}
    </SectionCard>
  );
}