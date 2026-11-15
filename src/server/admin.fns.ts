import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { parseSiteData } from "@/data/schema";
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  requireAdmin,
} from "@/server/admin-session";
import { getSiteData, getStoreStatus, saveSiteData, seedSiteData } from "@/server/site-store";

export const getPublicSiteData = createServerFn({ method: "GET" }).handler(async () => {
  return getSiteData();
});

export const adminMe = createServerFn({ method: "GET" }).handler(async () => {
  const authenticated = await isAdminAuthenticated();
  return {
    authenticated,
    store: getStoreStatus(),
  };
});

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1) }))
  .handler(async ({ data }) => {
    try {
      await loginAdmin(data.password);
      return { ok: true as const };
    } catch (error) {
      const message = error instanceof Error ? error.message : "LOGIN_FAILED";
      if (message === "INVALID_PASSWORD") {
        throw new Error("كلمة المرور غلط");
      }
      throw error;
    }
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  await logoutAdmin();
  return { ok: true as const };
});

export const getAdminSiteData = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const site = await getSiteData({ force: true });
  return { site, store: getStoreStatus() };
});

export const saveAdminSiteData = createServerFn({ method: "POST" })
  .validator(z.object({ site: z.unknown() }))
  .handler(async ({ data }) => {
    await requireAdmin();
    const parsed = parseSiteData(data.site);
    const result = await saveSiteData(parsed);
    return { ...result, store: getStoreStatus() };
  });

export const seedAdminSiteData = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  try {
    const site = await seedSiteData();
    return { site, store: getStoreStatus(), remoteSynced: true as const };
  } catch (error) {
    // Still return local defaults if remote seed fails
    const site = await getSiteData({ force: true });
    return {
      site,
      store: getStoreStatus(),
      remoteSynced: false as const,
      remoteError: error instanceof Error ? error.message : "Seed failed",
    };
  }
});
