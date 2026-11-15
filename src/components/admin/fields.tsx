import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Localized } from "@/data/site-types";
import { cn } from "@/lib/utils";

export const adminFieldClass =
  "border-white/12 bg-black/35 text-white placeholder:text-white/30 focus-visible:border-primary/55 focus-visible:ring-primary/25";

export function slugFromName(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/gi, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `item-${Date.now()}`;
}

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, hint, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-[11px] font-semibold tracking-[0.14em] text-violet-soft/90 uppercase">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-[11px] leading-relaxed text-white/40">{hint}</p> : null}
    </div>
  );
}

type LocalizedFieldsProps = {
  label: string;
  value: Localized;
  onChange: (next: Localized) => void;
  multiline?: boolean;
  rows?: number;
};

export function LocalizedFields({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: LocalizedFieldsProps) {
  const InputCmp = multiline ? Textarea : Input;
  return (
    <Field label={label}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 rounded-xl border border-white/8 bg-black/20 p-3">
          <span className="text-[10px] tracking-[0.18em] text-white/45 uppercase">AR · عربي</span>
          <InputCmp
            className={adminFieldClass}
            dir="rtl"
            value={value.ar}
            rows={multiline ? rows : undefined}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
          />
        </div>
        <div className="space-y-1.5 rounded-xl border border-white/8 bg-black/20 p-3">
          <span className="text-[10px] tracking-[0.18em] text-white/45 uppercase">EN</span>
          <InputCmp
            className={adminFieldClass}
            dir="ltr"
            value={value.en}
            rows={multiline ? rows : undefined}
            onChange={(e) => onChange({ ...value, en: e.target.value })}
          />
        </div>
      </div>
    </Field>
  );
}

type SectionCardProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function SectionCard({ title, subtitle, actions, children, className }: SectionCardProps) {
  return (
    <section className={cn("cms-panel", className)}>
      <div className="cms-panel-head">
        <div className="min-w-0">
          <p className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-none tracking-[0.06em] text-white">
            {title}
          </p>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-white/55">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function AdminSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-xl border px-3 py-2 text-sm shadow-sm outline-none",
        adminFieldClass,
        className,
      )}
      {...props}
    />
  );
}
