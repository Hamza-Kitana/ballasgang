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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const members = site.members;
  const current = editIndex !== null ? members[editIndex] : null;
  const open = editIndex !== null && Boolean(current);

  const updateMembers = (next: GangMember[]) => onPatch({ members: next });

  const patchMember = (patch: Partial<GangMember>) => {
    if (editIndex === null || !current) return;
    const next = members.map((m, i) => {
      if (i !== editIndex) return m;
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
    setEditIndex(next.length - 1);
  };

  const removeAt = (index: number) => {
    const item = members[index];
    if (!item) return;
    const label = item.name || item.alias || item.id || "هذا العضو";
    if (!confirm(`حذف ${label}؟`)) return;
    const next = members.filter((_, i) => i !== index);
    updateMembers(next);
    if (editIndex === index) setEditIndex(null);
    else if (editIndex !== null && editIndex > index) setEditIndex(editIndex - 1);
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

  return (
    <>
      <SectionCard
        title="الأعضاء"
        subtitle="جدول الطاقم — اضغط على سطر للتعديل"
        actions={
          <Button type="button" size="sm" className="cms-btn-primary" onClick={addMember}>
            <Plus className="h-4 w-4" /> عضو جديد
          </Button>
        }
      >
        {members.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-black/25 px-4 py-10 text-center">
            <p className="text-white/70">ما في أعضاء بعد</p>
            <Button type="button" className="cms-btn-primary mt-4" onClick={addMember}>
              <Plus className="h-4 w-4" /> إضافة عضو
            </Button>
          </div>
        ) : (
          <div className="cms-table-wrap overflow-x-auto rounded-2xl border border-white/10">
            <table className="cms-table w-full min-w-[780px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-16">صورة</th>
                  <th>العضو</th>
                  <th>الرتبة</th>
                  <th>الحالة</th>
                  <th>انضم</th>
                  <th>بث</th>
                  <th className="w-28 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr
                    key={m.id || i}
                    className={cn("cms-table-row", editIndex === i && "cms-table-row-active")}
                    onClick={() => setEditIndex(i)}
                  >
                    <td>
                      <div className="h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-black/40">
                        {m.image ? (
                          <img src={m.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-[9px] text-white/30">
                            —
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <p className="font-semibold text-white">{m.name || "عضو بدون اسم"}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">
                        {m.alias || "—"} · <span dir="ltr">{m.id || "no-id"}</span>
                      </p>
                    </td>
                    <td>
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] text-white"
                        style={{ background: m.accent || "#7c3aed" }}
                      >
                        {m.rank}
                      </span>
                    </td>
                    <td>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase",
                          m.status === "live" && "bg-red-500/25 text-red-100",
                          m.status === "online" && "bg-emerald-500/25 text-emerald-100",
                          m.status === "offline" && "bg-zinc-600/40 text-zinc-200",
                        )}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="text-white/70">{m.joined || "—"}</td>
                    <td>
                      {m.streamUrl ? (
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
                  {current.name || "تعديل العضو"}
                </DialogTitle>
                <DialogDescription className="text-white/50" dir="ltr">
                  ID · {current.id || "سيتم توليده من الاسم"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
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
                    onChange={(liveImage) =>
                      patchMember({ liveImage: liveImage || undefined })
                    }
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
                      onChange={(e) =>
                        patchMember({ status: e.target.value as GangMember["status"] })
                      }
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
                  <Field label="رابط البث" hint="يوتيوب / Kick / Twitch / TikTok">
                    <Input
                      className={adminFieldClass}
                      dir="ltr"
                      value={current.streamUrl ?? ""}
                      onChange={(e) =>
                        patchMember({ streamUrl: e.target.value || undefined })
                      }
                      placeholder="https://..."
                    />
                  </Field>
                  <Field label="فيديو خلفية الملف">
                    <Input
                      className={adminFieldClass}
                      dir="ltr"
                      value={current.bgVideo}
                      onChange={(e) => patchMember({ bgVideo: e.target.value })}
                      placeholder="/videos/gta-1.mp4"
                    />
                  </Field>
                </div>

                <LocalizedFields
                  label="الدور"
                  value={current.role}
                  onChange={(role) => patchMember({ role })}
                />
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
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeBadge(i)}
                        >
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
