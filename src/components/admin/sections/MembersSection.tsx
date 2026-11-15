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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

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
    stats: { reps: 0, wars: 0, respect: 0 },
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
    setSelected(Math.max(0, selected - 1));
  };

  const addBadge = () => {
    patchMember({ badges: [...current.badges, { ar: "", en: "" }] });
  };

  const patchBadge = (index: number, badge: GangMember["badges"][number]) => {
    const badges = current.badges.map((b, i) => (i === index ? badge : b));
    patchMember({ badges });
  };

  const removeBadge = (index: number) => {
    patchMember({ badges: current.badges.filter((_, i) => i !== index) });
  };

  if (!current) {
    return (
      <SectionCard title="الأعضاء · Members">
        <Button type="button" onClick={addMember}>
          <Plus className="h-4 w-4" /> إضافة عضو
        </Button>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="الأعضاء · Members"
      subtitle="نموذج كامل لكل حقول GangMember"
      actions={
        <>
          <Button type="button" size="sm" onClick={addMember}>
            <Plus className="h-4 w-4" /> إضافة
          </Button>
          <Button type="button" size="sm" variant="destructive" onClick={removeMember}>
            <Trash2 className="h-4 w-4" /> حذف
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {members.map((m, i) => (
          <button
            key={m.id || i}
            type="button"
            onClick={() => setSelected(i)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              i === selected
                ? "border-primary bg-primary/20 text-violet-soft"
                : "border-violet-500/20 text-muted-foreground hover:bg-violet-deep/40"
            }`}
          >
            {m.name || m.alias || m.id || `#${i + 1}`}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="المعرّف · id">
          <Input
            className={adminFieldClass}
            value={current.id}
            onChange={(e) => patchMember({ id: e.target.value })}
          />
        </Field>
        <Field label="الاسم · name">
          <Input
            className={adminFieldClass}
            value={current.name}
            onChange={(e) => patchMember({ name: e.target.value })}
          />
        </Field>
        <Field label="اللقب · alias">
          <Input
            className={adminFieldClass}
            value={current.alias}
            onChange={(e) => patchMember({ alias: e.target.value })}
          />
        </Field>
        <Field label="الرتبة · rank">
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
        <Field label="الحالة · status">
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
        <Field label="انضم · joined">
          <Input
            className={adminFieldClass}
            value={current.joined}
            onChange={(e) => patchMember({ joined: e.target.value })}
          />
        </Field>
        <Field label="لون accent">
          <Input
            className={adminFieldClass}
            value={current.accent}
            onChange={(e) => patchMember({ accent: e.target.value })}
          />
        </Field>
        <Field label="صورة · image">
          <Input
            className={adminFieldClass}
            value={current.image}
            onChange={(e) => patchMember({ image: e.target.value })}
          />
        </Field>
        <Field label="صورة البث · liveImage">
          <Input
            className={adminFieldClass}
            value={current.liveImage ?? ""}
            onChange={(e) => patchMember({ liveImage: e.target.value || undefined })}
          />
        </Field>
        <Field label="فيديو الخلفية · bgVideo">
          <Input
            className={adminFieldClass}
            value={current.bgVideo}
            onChange={(e) => patchMember({ bgVideo: e.target.value })}
          />
        </Field>
        <Field label="رابط البث · streamUrl">
          <Input
            className={adminFieldClass}
            value={current.streamUrl ?? ""}
            onChange={(e) => patchMember({ streamUrl: e.target.value || undefined })}
          />
        </Field>
      </div>

      <LocalizedFields
        label="الدور · role"
        value={current.role}
        onChange={(role) => patchMember({ role })}
      />
      <LocalizedFields
        label="السيرة · bio"
        multiline
        value={current.bio}
        onChange={(bio) => patchMember({ bio })}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {(["reps", "wars", "respect"] as const).map((key) => (
          <Field key={key} label={`stats.${key}`}>
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
          <p className="text-sm font-medium text-violet-soft">الشارات · badges</p>
          <Button type="button" size="sm" variant="secondary" onClick={addBadge}>
            <Plus className="h-4 w-4" /> شارة
          </Button>
        </div>
        {current.badges.map((badge, i) => (
          <div key={i} className="rounded-lg border border-violet-500/15 p-3">
            <div className="mb-2 flex justify-end">
              <Button type="button" size="sm" variant="ghost" onClick={() => removeBadge(i)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <LocalizedFields
              label={`Badge ${i + 1}`}
              value={badge}
              onChange={(next) => patchBadge(i, next)}
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}