"use client";

import type { SiteData } from "@/data/site-types";
import { Field, SectionCard, adminFieldClass } from "../fields";
import { Input } from "@/components/ui/input";

type SettingsSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

export function SettingsSection({ site, onPatch }: SettingsSectionProps) {
  const s = site.settings;
  const set = (key: keyof typeof s, value: string) => {
    onPatch({ settings: { ...s, [key]: value } });
  };

  return (
    <SectionCard title="الإعدادات · Settings" subtitle="خلفية الفيديو، الموسيقى، ولون الثيم">
      <div className="grid max-w-xl gap-4">
        <Field label="معرّف فيديو الخلفية · bgVideoId">
          <Input
            className={adminFieldClass}
            value={s.bgVideoId}
            onChange={(e) => set("bgVideoId", e.target.value)}
            placeholder="gta-1"
          />
        </Field>
        <Field label="معرّف الموسيقى · musicTrackId">
          <Input
            className={adminFieldClass}
            value={s.musicTrackId}
            onChange={(e) => set("musicTrackId", e.target.value)}
          />
        </Field>
        <Field label="لون الثيم · themeColor" hint="#c084fc أو oklch">
          <Input
            className={adminFieldClass}
            value={s.themeColor}
            onChange={(e) => set("themeColor", e.target.value)}
          />
        </Field>
      </div>
    </SectionCard>
  );
}