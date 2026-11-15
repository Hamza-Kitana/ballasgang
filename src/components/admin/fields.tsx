import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Localized } from "@/data/site-types";
import { cn } from "@/lib/utils";

export const adminFieldClass =
  "border-violet-500/25 bg-violet-deep/40 focus-visible:ring-violet-glow/50";

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
    <div className={cn("space-y-1.5", className)}>
      <Label className="text-violet-soft/90">{label}</Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
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
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">AR · عربي</span>
          <InputCmp
            className={adminFieldClass}
            dir="rtl"
            value={value.ar}
            rows={multiline ? rows : undefined}
            onChange={(e) => onChange({ ...value, ar: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">EN</span>
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
    <section
      className={cn(
        "rounded-xl border border-violet-500/20 bg-card/80 p-4 shadow-[0_0_40px_-12px] shadow-violet-glow/20 backdrop-blur-sm sm:p-6",
        className,
      )}
    >
      <p className="font-display text-xl tracking-wide text-violet-soft">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      {actions ? <div className="mt-3 flex flex-wrap gap-2">{actions}</div> : null}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function AdminSelect({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1",
        adminFieldClass,
        className,
      )}
      {...props}
    />
  );
}