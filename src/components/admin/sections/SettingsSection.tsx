"use client";

import type { SiteData } from "@/data/site-types";
import { extractYoutubeId, youtubeWatchUrl } from "@/lib/youtube";
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

  const bgId = extractYoutubeId(s.bgVideoId);
  const musicId = extractYoutubeId(s.musicTrackId);

  return (
    <SectionCard
      title="الإعدادات"
      subtitle="الصق رابط يوتيوب كامل عادي — youtube.com أو youtu.be"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <Field
            label="فيديو خلفية الموقع"
            hint="مثال: https://www.youtube.com/watch?v=xxxxx أو https://youtu.be/xxxxx"
          >
            <Input
              className={adminFieldClass}
              dir="ltr"
              value={s.bgVideoId}
              onChange={(e) => set("bgVideoId", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </Field>
          {bgId ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="aspect-video">
                <iframe
                  title="Background preview"
                  src={`https://www.youtube.com/embed/${bgId}?rel=0`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="truncate px-3 py-2 text-[11px] text-white/45" dir="ltr">
                ID: {bgId} · {youtubeWatchUrl(bgId)}
              </p>
            </div>
          ) : s.bgVideoId.trim() ? (
            <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              الرابط مش واضح — تأكد إنه رابط يوتيوب لفيديو.
            </p>
          ) : null}
        </div>

        <div className="space-y-4">
          <Field
            label="أغنية الموقع (يوتيوب)"
            hint="نفس الشيء — رابط يوتيوب كامل للأغنية/المقطع"
          >
            <Input
              className={adminFieldClass}
              dir="ltr"
              value={s.musicTrackId}
              onChange={(e) => set("musicTrackId", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </Field>
          {musicId ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="aspect-video">
                <iframe
                  title="Music preview"
                  src={`https://www.youtube.com/embed/${musicId}?rel=0`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="truncate px-3 py-2 text-[11px] text-white/45" dir="ltr">
                ID: {musicId} · {youtubeWatchUrl(musicId)}
              </p>
            </div>
          ) : s.musicTrackId.trim() ? (
            <p className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
              الرابط مش واضح — تأكد إنه رابط يوتيوب لفيديو.
            </p>
          ) : null}
        </div>
      </div>

      <Field label="لون الثيم" hint="مثل #6b21a8">
        <div className="flex max-w-md gap-2">
          <Input
            type="color"
            className="h-10 w-14 cursor-pointer rounded-xl border border-white/15 bg-transparent p-1"
            value={/^#[0-9a-fA-F]{6}$/.test(s.themeColor) ? s.themeColor : "#6b21a8"}
            onChange={(e) => set("themeColor", e.target.value)}
          />
          <Input
            className={adminFieldClass}
            value={s.themeColor}
            onChange={(e) => set("themeColor", e.target.value)}
          />
        </div>
      </Field>
    </SectionCard>
  );
}
