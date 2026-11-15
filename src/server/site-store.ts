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

const LOCAL_FILE = path.join(process.cwd(), "data", "site-data.json");

let memoryCache: { data: SiteData; at: number } | null = null;
const CACHE_TTL_MS = 8_000;

async function readLocalFile(): Promise<SiteData | null> {
  try {
    const raw = await readFile(LOCAL_FILE, "utf8");
    return parseSiteData(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function writeLocalFile(data: SiteData) {
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(data, null, 2), "utf8");
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
      void writeLocalFile(remote).catch(() => undefined);
      return remote;
    } catch (error) {
      console.error("[site-store] JSONBin read failed:", error);
    }
  }

  // 2) Local file fallback
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
  };
}
