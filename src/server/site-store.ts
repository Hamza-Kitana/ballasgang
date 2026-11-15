import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildDefaultSiteData } from "@/data/defaults";
import { parseSiteData } from "@/data/schema";
import type { SiteData } from "@/data/site-types";
import {
  createSiteBin,
  hasBinId,
  isJsonBinConfigured,
  readSiteBin,
  updateSiteBin,
} from "@/server/jsonbin";

function isServerlessRuntime() {
  return Boolean(
    process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NETLIFY ||
      process.env.CF_PAGES,
  );
}

function localFilePath() {
  // Vercel/Lambda filesystem is read-only except /tmp
  if (isServerlessRuntime()) {
    return path.join("/tmp", "ballas-site-data.json");
  }
  return path.join(process.cwd(), "data", "site-data.json");
}

let memoryCache: { data: SiteData; at: number } | null = null;
const CACHE_TTL_MS = 8_000;

async function readLocalFile(): Promise<SiteData | null> {
  try {
    const raw = await readFile(localFilePath(), "utf8");
    return parseSiteData(JSON.parse(raw));
  } catch {
    return null;
  }
}

/** Best-effort local cache — never throws (serverless-safe). */
async function writeLocalFile(data: SiteData) {
  try {
    const file = localFilePath();
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.warn("[site-store] local cache write skipped:", error);
  }
}

function setCache(data: SiteData) {
  memoryCache = { data, at: Date.now() };
}

export async function getSiteData(options?: { force?: boolean }): Promise<SiteData> {
  if (!options?.force && memoryCache && Date.now() - memoryCache.at < CACHE_TTL_MS) {
    return memoryCache.data;
  }

  // 1) JSONBin primary
  if (isJsonBinConfigured() && hasBinId()) {
    try {
      const remote = await readSiteBin();
      setCache(remote);
      void writeLocalFile(remote);
      return remote;
    } catch (error) {
      console.error("[site-store] JSONBin read failed:", error);
    }
  }

  // 2) Local file fallback (dev /tmp on serverless)
  const local = await readLocalFile();
  if (local) {
    setCache(local);
    return local;
  }

  // 3) Built-in defaults
  const defaults = buildDefaultSiteData();
  setCache(defaults);
  return defaults;
}

export type SaveSiteResult = {
  site: SiteData;
  remoteSynced: boolean;
  createdBinId?: string;
  remoteError?: string;
};

export async function saveSiteData(input: SiteData): Promise<SaveSiteResult> {
  const data = parseSiteData({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  let remoteSynced = false;
  let createdBinId: string | undefined;
  let remoteError: string | undefined;

  if (isJsonBinConfigured()) {
    try {
      if (!hasBinId()) {
        createdBinId = await createSiteBin(data);
        remoteSynced = true;
        console.warn(
          `[site-store] Created JSONBin id=${createdBinId}. Add JSONBIN_BIN_ID=${createdBinId} to .env`,
        );
      } else {
        await updateSiteBin(data);
        remoteSynced = true;
      }
    } catch (error) {
      remoteError = error instanceof Error ? error.message : "JSONBin sync failed";
      console.error("[site-store] JSONBin write failed:", error);
    }
  } else {
    remoteError = "JSONBIN_MASTER_KEY is missing";
  }

  await writeLocalFile(data);
  setCache(data);

  // On production, require JSONBin success so admin knows save stuck
  if (!remoteSynced && isServerlessRuntime()) {
    throw new Error(remoteError || "Failed to save to JSONBin");
  }

  return { site: data, remoteSynced, createdBinId, remoteError };
}

export async function seedSiteData(): Promise<SiteData> {
  const data = buildDefaultSiteData();

  if (isJsonBinConfigured()) {
    try {
      if (hasBinId()) {
        await updateSiteBin(data);
      } else {
        const id = await createSiteBin(data);
        console.warn(
          `[site-store] Seeded new JSONBin id=${id}. Add JSONBIN_BIN_ID=${id} to .env`,
        );
      }
    } catch (error) {
      console.error("[site-store] JSONBin seed failed:", error);
      await writeLocalFile(data);
      setCache(data);
      throw error;
    }
  }

  await writeLocalFile(data);
  setCache(data);
  return data;
}

export function getStoreStatus() {
  return {
    jsonbinConfigured: isJsonBinConfigured(),
    binIdConfigured: hasBinId(),
    binId: process.env.JSONBIN_BIN_ID?.trim() || null,
    hasMemoryCache: Boolean(memoryCache),
    serverless: isServerlessRuntime(),
  };
}
