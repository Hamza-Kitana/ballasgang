"use client";

import type { SiteData } from "@/data/site-types";
import { Field, SectionCard, adminFieldClass } from "../fields";
import { Input } from "@/components/ui/input";

type GangSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

export function GangSection({ site, onPatch }: GangSectionProps) {
  const g = site.gang;
  const set = (key: keyof typeof g, value: string) => {
    onPatch({ gang: { ...g, [key]: value } });
  };

  const fields: { key: keyof typeof g; label: string }[] = [
    { key: "name", label: "الاسم · Name" },
    { key: "tagline", label: "الشعار · Tagline" },
    { key: "city", label: "المدينة · City" },
    { key: "game", label: "اللعبة · Game" },
    { key: "turf", label: "المنطقة · Turf" },
    { key: "discord", label: "ديسكورد · Discord" },
    { key: "discordUrl", label: "رابط Discord URL" },
  ];

  return (
    <SectionCard title="معلومات العصابة · Gang Info" subtitle="البيانات الظاهرة في الموقع الرئيسي">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ key, label }) => (
          <Field key={key} label={label}>
            <Input
              className={adminFieldClass}
              value={g[key]}
              onChange={(e) => set(key, e.target.value)}
            />
          </Field>
        ))}
      </div>
    </SectionCard>
  );
}