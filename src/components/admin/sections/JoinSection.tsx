"use client";

import { useState } from "react";
import type { JoinStep, SiteData } from "@/data/site-types";
import { Field, LocalizedFields, SectionCard, adminFieldClass, slugFromName } from "../fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

type JoinSectionProps = {
  site: SiteData;
  onPatch: (patch: Partial<SiteData>) => void;
};

function emptyStep(step: number): JoinStep {
  return {
    step,
    title: { ar: "", en: "" },
    detail: { ar: "", en: "" },
  };
}

export function JoinSection({ site, onPatch }: JoinSectionProps) {
  const [selected, setSelected] = useState(0);
  const steps = site.joinSteps;
  const current = steps[selected];

  const updateSteps = (next: JoinStep[]) => onPatch({ joinSteps: next });

  const patchStep = (patch: Partial<JoinStep>) => {
    const next = steps.map((s, i) => (i === selected ? { ...s, ...patch } : s));
    updateSteps(next);
  };

  const addStep = () => {
    const stepNum = steps.length ? Math.max(...steps.map((s) => s.step)) + 1 : 1;
    const next = [...steps, emptyStep(stepNum)];
    updateSteps(next);
    setSelected(next.length - 1);
  };

  const removeStep = () => {
    if (!confirm("حذف هذه الخطوة؟ · Delete this step?")) return;
    const next = steps.filter((_, i) => i !== selected);
    updateSteps(next.map((s, i) => ({ ...s, step: i + 1 })));
    setSelected(Math.max(0, selected - 1));
  };

  if (!current) {
    return (
      <SectionCard title="خطوات الانضمام · Join">
        <Button type="button" onClick={addStep}>
          <Plus className="h-4 w-4" /> إضافة خطوة
        </Button>
      </SectionCard>
    );
  }

  return (
    <div className="space-y-4">
      <SectionCard
        title="خطوات الانضمام · Join Steps"
        actions={
          <>
            <Button type="button" size="sm" onClick={addStep}>
              <Plus className="h-4 w-4" /> إضافة
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={removeStep}>
              <Trash2 className="h-4 w-4" /> حذف
            </Button>
          </>
        }
      >
        <div className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <button
              key={`${s.step}-${i}`}
              type="button"
              onClick={() => setSelected(i)}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                i === selected
                  ? "border-primary bg-primary/20 text-violet-soft"
                  : "border-violet-500/20 text-muted-foreground hover:bg-violet-deep/40"
              }`}
            >
              {s.step}. {s.title.en || s.title.ar || slugFromName(`step-${s.step}`)}
            </button>
          ))}
        </div>
        <Field label="رقم الخطوة · step">
          <Input
            type="number"
            className={adminFieldClass}
            value={current.step}
            onChange={(e) => patchStep({ step: Number(e.target.value) || 0 })}
          />
        </Field>
        <LocalizedFields
          label="العنوان · title"
          value={current.title}
          onChange={(title) => patchStep({ title })}
        />
        <LocalizedFields
          label="التفاصيل · detail"
          multiline
          value={current.detail}
          onChange={(detail) => patchStep({ detail })}
        />
      </SectionCard>
    </div>
  );
}