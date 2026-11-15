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
        ? "تم الحفظ"
        : saveStatus === "error"
          ? "فشل الحفظ"
          : dirty
            ? "تعديلات بانتظار الحفظ"
            : "متزامن";

  const sidebar = (
    <nav className="flex flex-col gap-1.5 p-3">
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
            className={cn("cms-nav-item", active && "cms-nav-item-active")}
          >
            <span className={cn("cms-nav-icon", active && "cms-nav-icon-active")}>
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 text-start">
              <span className="block text-sm font-semibold tracking-wide">{item.labelAr}</span>
              <span className="text-[10px] tracking-[0.16em] text-white/40 uppercase">
                {item.label}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="cms-shell flex min-h-[100dvh] flex-col text-foreground">
      <header className="cms-topbar sticky top-0 z-30 px-3 py-2.5 sm:px-4">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-white/80 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="flex min-w-0 flex-1 items-center gap-3">
            <img
              src="/ballas-logo.png"
              alt=""
              className="hidden h-10 w-auto object-contain sm:block"
              draggable={false}
            />
            <div className="min-w-0">
              <p className="font-display text-xl tracking-[0.12em] text-white">BALLAS CMS</p>
              <p className="truncate text-[11px] text-white/45">
                {lastUpdated ? `آخر تحديث · ${new Date(lastUpdated).toLocaleString()}` : "لوحة التحكم"}
              </p>
            </div>
          </div>

          <div
            className={cn(
              "rounded-full border px-3 py-1.5 text-[11px] tracking-[0.08em]",
              dirty
                ? "border-amber-300/35 bg-amber-400/10 text-amber-100"
                : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
            )}
          >
            <span
              className={cn(
                "me-1.5 inline-block h-1.5 w-1.5 rounded-full",
                dirty ? "bg-amber-300" : "bg-emerald-300",
              )}
            />
            {statusLabel}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
            onClick={onRefresh}
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            <span className="hidden sm:inline">تحديث</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
            onClick={onSeed}
            disabled={loading || saving}
          >
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">افتراضي</span>
          </Button>
          <Button
            type="button"
            size="sm"
            className="cms-btn-primary"
            onClick={onSave}
            disabled={!dirty || saving}
          >
            <Save className="h-4 w-4" />
            {saving ? "حفظ…" : "حفظ"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] min-h-0 flex-1">
        <aside
          className={cn(
            "cms-sidebar fixed inset-y-0 start-0 z-20 w-[17.5rem] pt-[4.25rem] transition-transform lg:static lg:translate-x-0 lg:pt-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full rtl:lg:translate-x-0",
          )}
        >
          <div className="hidden border-b border-white/8 px-4 py-4 lg:block">
            <p className="text-[10px] tracking-[0.28em] text-violet-soft uppercase">Navigation</p>
            <p className="mt-1 text-sm text-white/60">أقسام التحكم</p>
          </div>
          {sidebar}
        </aside>

        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-10 bg-black/60 backdrop-blur-[2px] lg:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
