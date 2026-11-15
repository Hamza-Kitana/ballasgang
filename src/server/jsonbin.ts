import type { SiteData } from "@/data/site-types";
import { parseSiteData } from "@/data/schema";

const JSONBIN_API = "https://api.jsonbin.io/v3";

function masterKey() {
  const key = process.env.JSONBIN_MASTER_KEY?.trim();
  if (!key) throw new Error("JSONBIN_MASTER_KEY is missing");
  return key;
}

function binId() {
  return process.env.JSONBIN_BIN_ID?.trim() || "";
}

type JsonBinReadResponse = {
  record: unknown;
  metadata?: { id?: string };
};

type JsonBinWriteResponse = {
  record?: unknown;
  metadata?: { id?: string; parentId?: string };
};

async function jsonbinFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${JSONBIN_API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": masterKey(),
      "X-Bin-Meta": "false",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }

  if (!res.ok) {
    const message =
      typeof body === "object" && body && "message" in body
        ? String((body as { message: unknown }).message)
        : text || res.statusText;
    throw new Error(`JSONBin ${res.status}: ${message}`);
  }

  return body;
}

export function isJsonBinConfigured() {
  return Boolean(process.env.JSONBIN_MASTER_KEY?.trim());
}

export function hasBinId() {
  return Boolean(binId());
}

/** Read latest record. When X-Bin-Meta is false, body IS the record. */
export async function readSiteBin(): Promise<SiteData> {
  const id = binId();
  if (!id) throw new Error("JSONBIN_BIN_ID is missing — run seed / create bin first");

  const body = await jsonbinFetch(`/b/${id}/latest`, {
    method: "GET",
    headers: { "X-Bin-Meta": "true" },
  });

  // With meta true we get { record, metadata }
  if (body && typeof body === "object" && "record" in body) {
    return parseSiteData((body as JsonBinReadResponse).record);
  }
  return parseSiteData(body);
}

export async function updateSiteBin(data: SiteData): Promise<SiteData> {
  const id = binId();
  if (!id) throw new Error("JSONBIN_BIN_ID is missing — run seed / create bin first");

  const body = await jsonbinFetch(`/b/${id}`, {
    method: "PUT",
    headers: {
      "X-Bin-Versioning": "false",
      "X-Bin-Meta": "true",
    },
    body: JSON.stringify(data),
  });

  if (body && typeof body === "object" && "record" in body) {
    return parseSiteData((body as JsonBinWriteResponse).record);
  }
  return parseSiteData(body ?? data);
}

export async function createSiteBin(data: SiteData, name = "ballas-site-data"): Promise<string> {
  const body = (await jsonbinFetch("/b", {
    method: "POST",
    headers: {
      "X-Bin-Name": name,
      "X-Bin-Private": "true",
      "X-Bin-Meta": "true",
    },
    body: JSON.stringify(data),
  })) as JsonBinWriteResponse;

  const id = body.metadata?.id;
  if (!id) throw new Error("JSONBin create succeeded but no bin id returned");
  return id;
}
