"use client";

import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ScrollText,
  ShoppingBag,
  UserPlus,
  Settings,
  FileText,
  Shield,
  Menu,
  X,
  LogOut,
  Save,
  RefreshCw,
  Database,
  Circle,
} from "lucide-react";

export type AdminSectionId =
  | "overview"
  | "gang"
  | "members"
  | "rules"
  | "shop"
  | "join"
  | "settings"
  | "content";

const NAV: { id: AdminSectionId; label: string; labelAr: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", labelAr: "نظرة عامة", icon: LayoutDashboard },
  { id: "gang", label: "Gang", labelAr: "العصابة", icon: Shield },
  { id: "members", label: "Members", labelAr: "الأعضاء", icon: Users },
  { id: "rules", label: "Rules", labelAr: "القوانين", icon: ScrollText },
  { id: "shop", label: "Shop", labelAr: "المتجر", icon: ShoppingBag },
  { id: "join", label: "Join", labelAr: "الانضمام", icon: UserPlus },
  { id: "settings", label: "Settings", labelAr: "الإعدادات", icon: Settings },
  { id: "content", label: "Content", labelAr: "المحتوى", icon: FileText },
];

type SaveStatus = "idle" | "saving" | "saved" | "error";

type AdminShellProps = {
  section: AdminSectionId;
  onSectionChange: (id: AdminSectionId) => void;
  dirty: boolean;
  saveStatus: SaveStatus;
  lastUpdated?: string;
  saving?: boolean;
  loading?: boolean;
  onSave: () => void;
  onRefresh: () => void;
  onSeed: () => void;
  onLogout: () => void;
  children: ReactNode;
};

export function AdminShell({
  section,
  onSectionChange,
  dirty,
  saveStatus,
  lastUpdated,
  saving,
  loading,
  onSave,
  onRefresh,
  onSeed,
  onLogout,
  children,
}: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const statusLabel =
    saveStatus === "saving"
      ? "جاري الحفظ…"
      : saveStatus === "saved"
        ? "تم الحفظ ✓"
        : saveStatus === "error"
          ? "خطأ في الحفظ"
          : dirty
            ? "تغييرات غير محفوظة"
            : "متزامن";

  const sidebar = (
  <nav className="flex flex-col gap-1 p-3">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = section === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSectionChange(item.id);
              setMobileOpen(false);
            }}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
              active
                ? "bg-primary/25 text-violet-soft shadow-inner shadow-violet-glow/10"
                : "text-muted-foreground hover:bg-violet-deep/60 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>
              <span className="block font-medium">{item.labelAr}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-70">{item.label}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gradient-to-br from-violet-deep/80 via-background to-background text-foreground">
      <header className="sticky top-0 z-30 flex flex-wrap items-center gap-2 border-b border-violet-500/20 bg-background/90 px-3 py-2 backdrop-blur-md sm:px-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg tracking-wider text-violet-soft">BALLAS · CMS</p>
          <p className="truncate text-xs text-muted-foreground">
            {lastUpdated ? `آخر تحديث · ${new Date(lastUpdated).toLocaleString()}` : "—"}
          </p>
        </div>
        <div
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
            dirty ? "border-amber-500/40 text-amber-200" : "border-violet-500/30 text-muted-foreground",
          )}
        >
          <Circle className={cn("h-2 w-2 fill-current", dirty ? "text-amber-400" : "text-emerald-400")} />
          {statusLabel}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          <span className="hidden sm:inline">تحديث</span>
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={onSeed} disabled={loading || saving}>
          <Database className="h-4 w-4" />
          <span className="hidden sm:inline">Seed</span>
        </Button>
        <Button type="button" size="sm" onClick={onSave} disabled={!dirty || saving}>
          <Save className="h-4 w-4" />
          {saving ? "حفظ…" : "حفظ"}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">خروج</span>
        </Button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "fixed inset-y-0 start-0 z-20 w-64 border-e border-violet-500/20 bg-violet-deep/95 pt-16 backdrop-blur-lg transition-transform lg:static lg:translate-x-0 lg:pt-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full rtl:lg:translate-x-0",
          )}
        >
          {sidebar}
        </aside>
        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-10 bg-black/50 lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}