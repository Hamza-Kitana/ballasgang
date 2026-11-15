"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminLogin,
  adminLogout,
  adminMe,
  getAdminSiteData,
  saveAdminSiteData,
  seedAdminSiteData,
} from "@/server/admin.fns";
import type { SiteData } from "@/data/site-types";
import { AdminLogin } from "./AdminLogin";
import { AdminShell, type AdminSectionId } from "./AdminShell";
import { OverviewSection } from "./sections/OverviewSection";
import { GangSection } from "./sections/GangSection";
import { MembersSection } from "./sections/MembersSection";
import { RulesSection } from "./sections/RulesSection";
import { ShopSection } from "./sections/ShopSection";
import { JoinSection } from "./sections/JoinSection";
import { SettingsSection } from "./sections/SettingsSection";
import { ContentSection } from "./sections/ContentSection";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type SaveStatus = "idle" | "saving" | "saved" | "error";

function unwrapSite(data: unknown): SiteData | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;
  if (obj.site && typeof obj.site === "object") return obj.site as SiteData;
  if ("gang" in obj && "members" in obj) return obj as SiteData;
  return null;
}

function isAuthed(me: unknown): boolean {
  if (!me || typeof me !== "object") return false;
  const o = me as Record<string, unknown>;
  if ("authenticated" in o) return Boolean(o.authenticated);
  if ("ok" in o) return Boolean(o.ok);
  return true;
}

function snapshot(site: SiteData | null): string {
  return site ? JSON.stringify(site) : "";
}

export function AdminApp() {
  const [booting, setBooting] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [section, setSection] = useState<AdminSectionId>("overview");
  const [site, setSite] = useState<SiteData | null>(null);
  const [baseline, setBaseline] = useState("");

  const dirty = useMemo(() => !!site && snapshot(site) !== baseline, [site, baseline]);

  const loadSite = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await getAdminSiteData();
      const next = unwrapSite(raw);
      if (!next) throw new Error("Invalid site payload");
      setSite(next);
      setBaseline(snapshot(next));
      setSaveStatus("idle");
    } catch (e) {
      console.error(e);
      toast.error("فشل تحميل البيانات · Failed to load site data");
    } finally {
      setLoading(false);
    }
  }, []);

  const checkSession = useCallback(async () => {
    setBooting(true);
    try {
      const me = await adminMe();
      const authed = isAuthed(me);
      setAuthenticated(authed);
      if (authed) await loadSite();
    } catch {
      setAuthenticated(false);
    } finally {
      setBooting(false);
    }
  }, [loadSite]);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
    document.body.classList.add("min-h-[100dvh]", "overflow-y-auto");
    return () => {
      document.body.classList.add("overflow-hidden");
      document.body.classList.remove("min-h-[100dvh]", "overflow-y-auto");
    };
  }, []);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const handleLogin = async (password: string) => {
    setLoginLoading(true);
    setLoginError(null);
    try {
      await adminLogin({ data: { password } });
      setAuthenticated(true);
      await loadSite();
      toast.success("مرحباً · Welcome");
    } catch {
      setLoginError("كلمة مرور خاطئة · Invalid password");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    if (dirty && !confirm("لديك تغييرات غير محفوظة. تسجيل الخروج؟")) return;
    try {
      await adminLogout();
    } finally {
      setAuthenticated(false);
      setSite(null);
      setBaseline("");
    }
  };

  const onPatch = useCallback((patch: Partial<SiteData>) => {
    setSite((prev) => (prev ? { ...prev, ...patch } : prev));
    setSaveStatus("idle");
  }, []);

  const handleSave = async () => {
    if (!site) return;
    setSaving(true);
    setSaveStatus("saving");
    try {
      const next: SiteData = {
        ...site,
        updatedAt: new Date().toISOString(),
        version: site.version + 1,
      };
      const result = (await saveAdminSiteData({ data: { site: next } })) as {
        site?: SiteData;
        remoteSynced?: boolean;
        remoteError?: string;
        createdBinId?: string;
      };
      const saved = result.site ?? next;
      setSite(saved);
      setBaseline(snapshot(saved));
      setSaveStatus("saved");
      if (result.createdBinId) {
        toast.message(`Bin ID جديد: ${result.createdBinId} — ضعه في JSONBIN_BIN_ID`);
      }
      if (result.remoteSynced) {
        toast.success("تم الحفظ على JSONBin · Synced");
      } else {
        toast.success("تم الحفظ محليًا · Saved locally");
        if (result.remoteError) toast.error(result.remoteError);
      }
    } catch (e) {
      console.error(e);
      setSaveStatus("error");
      toast.error("فشل الحفظ · Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = async () => {
    if (dirty && !confirm("ستفقد التغييرات غير المحفوظة. متابعة؟")) return;
    await loadSite();
    toast.message("تم التحديث · Refreshed");
  };

  const handleSeed = async () => {
    if (!confirm("إعادة تعيين البيانات للافتراضي؟ · Reset to defaults?")) return;
    setLoading(true);
    try {
      const raw = await seedAdminSiteData();
      const next = unwrapSite(raw) ?? unwrapSite(await getAdminSiteData());
      if (!next) throw new Error("Seed failed");
      setSite(next);
      setBaseline(snapshot(next));
      setSaveStatus("saved");
      toast.success("تمت إعادة التعيين · Seeded");
    } catch (e) {
      console.error(e);
      toast.error("فشل Seed");
    } finally {
      setLoading(false);
    }
  };

  if (booting) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background text-muted-foreground">
        جاري التحميل… · Loading admin…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <>
        <Toaster />
        <AdminLogin onLogin={handleLogin} loading={loginLoading} error={loginError} />
      </>
    );
  }

  if (!site) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-background text-muted-foreground">
        {loading ? "جاري تحميل البيانات…" : "لا توجد بيانات · No site data"}
      </div>
    );
  }

  const sectionView = (() => {
    switch (section) {
      case "overview":
        return (
          <OverviewSection site={site} saveStatus={saveStatus} dirty={dirty} loading={loading} />
        );
      case "gang":
        return <GangSection site={site} onPatch={onPatch} />;
      case "members":
        return <MembersSection site={site} onPatch={onPatch} />;
      case "rules":
        return <RulesSection site={site} onPatch={onPatch} />;
      case "shop":
        return <ShopSection site={site} onPatch={onPatch} />;
      case "join":
        return <JoinSection site={site} onPatch={onPatch} />;
      case "settings":
        return <SettingsSection site={site} onPatch={onPatch} />;
      case "content":
        return <ContentSection site={site} onPatch={onPatch} />;
      default:
        return null;
    }
  })();

  return (
    <>
      <Toaster />
      <AdminShell
        section={section}
        onSectionChange={setSection}
        dirty={dirty}
        saveStatus={saveStatus}
        lastUpdated={site.updatedAt}
        loading={loading}
        saving={saving}
        onSave={() => void handleSave()}
        onRefresh={() => void handleRefresh()}
        onSeed={() => void handleSeed()}
        onLogout={() => void handleLogout()}
      >
        {sectionView}
      </AdminShell>
    </>
  );
}