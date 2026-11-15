"use client";

import { useState } from "react";
import type { GangMember, MemberRank, SiteData } from "@/data/site-types";
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

const RANKS: MemberRank[] = ["Boss", "OG", "Shot Caller", "Enforcer", "Soldier", "Prospect"];
const STATUSES: GangMember["status"][] = ["online", "offline", "live"];

type MembersSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

function emptyMember(): GangMember {
  return {
    id: "",
    name: "",
    alias: "",
    rank: "Soldier",
    role: { ar: "", en: "" },
    bio: { ar: "", en: "" },
    joined: new Date().getFullYear().toString(),
    status: "offline",
    accent: "#c084fc",
    image: "",
    bgVideo: "/videos/gta-1.mp4",
    stats: { reps: 50, wars: 0, respect: 50 },
    badges: [],
  };
}

export function MembersSection({ site, onPatch }: MembersSectionProps) {
  const [selected, setSelected] = useState(0);
  const members = site.members;
  const current = members[selected];

  const updateMembers = (next: GangMember[]) => onPatch({ members: next });

  const patchMember = (patch: Partial<GangMember>) => {
    if (!current) return;
    const next = members.map((m, i) => {
      if (i !== selected) return m;
      const merged = { ...m, ...patch };
      if (patch.name !== undefined && !merged.id.trim()) {
        merged.id = slugFromName(merged.name);
      }
      return merged;
    });
    updateMembers(next);
  };

  const patchStats = (key: keyof GangMember["stats"], value: number) => {
    if (!current) return;
    patchMember({ stats: { ...current.stats, [key]: value } });
  };

  const addMember = () => {
    const next = [...members, emptyMember()];
    updateMembers(next);
    setSelected(next.length - 1);
  };

  const removeMember = () => {
    if (!current || !confirm("حذف العضو؟ · Delete member?")) return;
    const next = members.filter((_, i) => i !== selected);
    updateMembers(next);
    setSelected(Math.max(0, Math.min(selected, next.length - 1)));
  };

  const addBadge = () => {
    if (!current) return;
    patchMember({ badges: [...current.badges, { ar: "", en: "" }] });
  };

  const patchBadge = (index: number, badge: GangMember["badges"][number]) => {
    if (!current) return;
    patchMember({ badges: current.badges.map((b, i) => (i === index ? badge : b)) });
  };

  const removeBadge = (index: number) => {
    if (!current) return;
    patchMember({ badges: current.badges.filter((_, i) => i !== index) });
  };

  if (!current) {
    return (
      <SectionCard title="الأعضاء" subtitle="أضف أول عضو للعصابة">
        <Button type="button" className="cms-btn-primary" onClick={addMember}>
          <Plus className="h-4 w-4" /> إضافة عضو
        </Button>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-4">
      <SectionCard
        title="الأعضاء"
        subtitle="أضف · عدّل · ارفع صورة العضو مباشرة"
        actions={
          <>
            <Button type="button" size="sm" className="cms-btn-primary" onClick={addMember}>
              <Plus className="h-4 w-4" /> عضو جديد
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={removeMember}>
              <Trash2 className="h-4 w-4" /> حذف
            </Button>
          </>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {members.map((m, i) => (
            <button
              key={m.id || i}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "cms-pick-card group overflow-hidden text-start",
                i === selected && "cms-pick-card-active",
              )}
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-black/40">
                {m.image ? (
                  <img
                    src={m.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs tracking-[0.16em] text-white/30">
                    NO IMAGE
                  </div>
                )}
                <span
                  className={cn(
                    "absolute end-2 top-2 rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-white",
                    m.status === "live" && "bg-red-500",
                    m.status === "online" && "bg-emerald-500",
                    m.status === "offline" && "bg-zinc-700",
                  )}
                >
                  {m.status}
                </span>
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate font-semibold text-white">{m.name || "عضو جديد"}</p>
                <p className="text-[11px] tracking-[0.12em] text-violet-soft uppercase">
                  {m.rank} · {m.alias || "—"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={current.name || "تعديل العضو"} subtitle={`ID · ${current.id || "سيتم توليده من الاسم"}`}>
        <div className="grid gap-5 lg:grid-cols-2">
          <ImageField
            label="صورة العضو"
            value={current.image}
            onChange={(image) => patchMember({ image })}
            aspect="portrait"
          />
          <ImageField
            label="صورة البث (اختياري)"
            value={current.liveImage ?? ""}
            onChange={(liveImage) => patchMember({ liveImage: liveImage || undefined })}
            aspect="video"
            hint="تظهر في قسم الستيرمر"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="المعرّف">
            <Input
              className={adminFieldClass}
              value={current.id}
              onChange={(e) => patchMember({ id: e.target.value })}
            />
          </Field>
          <Field label="الاسم">
            <Input
              className={adminFieldClass}
              value={current.name}
              onChange={(e) => patchMember({ name: e.target.value })}
            />
          </Field>
          <Field label="اللقب">
            <Input
              className={adminFieldClass}
              value={current.alias}
              onChange={(e) => patchMember({ alias: e.target.value })}
            />
          </Field>
          <Field label="الرتبة">
            <AdminSelect
              value={current.rank}
              onChange={(e) => patchMember({ rank: e.target.value as MemberRank })}
            >
              {RANKS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="الحالة">
            <AdminSelect
              value={current.status}
              onChange={(e) => patchMember({ status: e.target.value as GangMember["status"] })}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </AdminSelect>
          </Field>
          <Field label="سنة الانضمام">
            <Input
              className={adminFieldClass}
              value={current.joined}
              onChange={(e) => patchMember({ joined: e.target.value })}
            />
          </Field>
          <Field label="لون التمييز">
            <div className="flex gap-2">
              <Input
                type="color"
                className="h-10 w-14 cursor-pointer rounded-xl border border-white/15 bg-transparent p-1"
                value={current.accent}
                onChange={(e) => patchMember({ accent: e.target.value })}
              />
              <Input
                className={adminFieldClass}
                value={current.accent}
                onChange={(e) => patchMember({ accent: e.target.value })}
              />
            </div>
          </Field>
          <Field
            label="رابط البث"
            hint="رابط يوتيوب / Kick / Twitch / TikTok كامل عادي"
          >
            <Input
              className={adminFieldClass}
              dir="ltr"
              value={current.streamUrl ?? ""}
              onChange={(e) => patchMember({ streamUrl: e.target.value || undefined })}
              placeholder="https://www.youtube.com/@channel أو https://kick.com/…"
            />
          </Field>
          <Field
            label="فيديو خلفية الملف"
            hint="مسار محلي مثل /videos/gta-1.mp4 أو اتركه كما هو"
          >
            <Input
              className={adminFieldClass}
              dir="ltr"
              value={current.bgVideo}
              onChange={(e) => patchMember({ bgVideo: e.target.value })}
              placeholder="/videos/gta-1.mp4"
            />
          </Field>
        </div>

        <LocalizedFields label="الدور" value={current.role} onChange={(role) => patchMember({ role })} />
        <LocalizedFields
          label="السيرة"
          multiline
          value={current.bio}
          onChange={(bio) => patchMember({ bio })}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {(["reps", "wars", "respect"] as const).map((key) => (
            <Field key={key} label={key}>
              <Input
                type="number"
                className={adminFieldClass}
                value={current.stats[key]}
                onChange={(e) => patchStats(key, Number(e.target.value) || 0)}
              />
            </Field>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold tracking-wide text-violet-soft">الشارات</p>
            <Button type="button" size="sm" variant="secondary" onClick={addBadge}>
              <Plus className="h-4 w-4" /> شارة
            </Button>
          </div>
          {current.badges.map((badge, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-black/25 p-3">
              <div className="mb-2 flex justify-end">
                <Button type="button" size="sm" variant="ghost" onClick={() => removeBadge(i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <LocalizedFields
                label={`شارة ${i + 1}`}
                value={badge}
                onChange={(next) => patchBadge(i, next)}
              />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
