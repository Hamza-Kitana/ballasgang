"use client";

import { useState } from "react";
import type { GangRule, SiteData } from "@/data/site-types";
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

const SEVERITIES: GangRule["severity"][] = ["law", "blood", "street"];
const CATEGORIES: GangRule["category"][] = [
  "leadership",
  "discipline",
  "security",
  "field",
  "reputation",
];

type RulesSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

function emptyRule(): GangRule {
  return {
    id: "",
    code: "",
    title: { ar: "", en: "" },
    detail: { ar: "", en: "" },
    severity: "street",
    category: "discipline",
  };
}

export function RulesSection({ site, onPatch }: RulesSectionProps) {
  const [selected, setSelected] = useState(0);
  const rules = site.rules;
  const current = rules[selected];

  const updateRules = (next: GangRule[]) => onPatch({ rules: next });

  const patchRule = (patch: Partial<GangRule>) => {
    if (!current) return;
    const next = rules.map((r, i) => {
      if (i !== selected) return r;
      const merged = { ...r, ...patch };
      if (patch.code !== undefined || patch.title !== undefined) {
        const slug = slugFromName(patch.code ?? merged.code ?? merged.title.en ?? merged.title.ar);
        if (!merged.id.trim()) merged.id = slug;
      }
      return merged;
    });
    updateRules(next);
  };

  const addRule = () => {
    const next = [...rules, emptyRule()];
    updateRules(next);
    setSelected(next.length - 1);
  };

  const removeRule = () => {
    if (!current || !confirm("حذف القانون؟ · Delete rule?")) return;
    const next = rules.filter((_, i) => i !== selected);
    updateRules(next);
    setSelected(Math.max(0, selected - 1));
  };

  if (!current) {
    return (
      <SectionCard title="القوانين · Rules">
        <Button type="button" onClick={addRule}>
          <Plus className="h-4 w-4" /> إضافة قانون
        </Button>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="القوانين · Rules"
      actions={
        <>
          <Button type="button" size="sm" onClick={addRule}>
            <Plus className="h-4 w-4" /> إضافة
          </Button>
          <Button type="button" size="sm" variant="destructive" onClick={removeRule}>
            <Trash2 className="h-4 w-4" /> حذف
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {rules.map((r, i) => (
          <button
            key={r.id || i}
            type="button"
            onClick={() => setSelected(i)}
            className={`rounded-lg border px-3 py-1.5 text-sm ${
              i === selected
                ? "border-primary bg-primary/20 text-violet-soft"
                : "border-violet-500/20 text-muted-foreground hover:bg-violet-deep/40"
            }`}
          >
            {r.code || r.id || `#${i + 1}`}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="المعرّف · id">
          <Input
            className={adminFieldClass}
            value={current.id}
            onChange={(e) => patchRule({ id: e.target.value })}
            placeholder="يُولَّد تلقائياً من code"
          />
        </Field>
        <Field label="الرمز · code">
          <Input
            className={adminFieldClass}
            value={current.code}
            onChange={(e) => patchRule({ code: e.target.value })}
          />
        </Field>
        <Field label="الخطورة · severity">
          <AdminSelect
            value={current.severity}
            onChange={(e) => patchRule({ severity: e.target.value as GangRule["severity"] })}
          >
            {SEVERITIES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </AdminSelect>
        </Field>
        <Field label="التصنيف · category">
          <AdminSelect
            value={current.category}
            onChange={(e) => patchRule({ category: e.target.value as GangRule["category"] })}
          >
            {CATEGORIES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </AdminSelect>
        </Field>
      </div>
      <LocalizedFields
        label="العنوان · title"
        value={current.title}
        onChange={(title) => patchRule({ title })}
      />
      <LocalizedFields
        label="التفاصيل · detail"
        multiline
        value={current.detail}
        onChange={(detail) => patchRule({ detail })}
      />
    </SectionCard>
  );
}