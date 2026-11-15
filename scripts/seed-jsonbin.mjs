import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const key = t.slice(0, eq).trim();
    let value = t.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

function ensureLocalData(localPath) {
  if (existsSync(localPath)) {
    return JSON.parse(readFileSync(localPath, "utf8"));
  }

  mkdirSync(resolve(process.cwd(), "data"), { recursive: true });
  const result = spawnSync(
    "bun",
    [
      "-e",
      "import { buildDefaultSiteData } from './src/data/defaults.ts'; import { writeFileSync, mkdirSync } from 'fs'; mkdirSync('data',{recursive:true}); writeFileSync('data/site-data.json', JSON.stringify(buildDefaultSiteData(), null, 2));",
    ],
    { cwd: process.cwd(), encoding: "utf8", shell: true },
  );

  if (result.status !== 0 || !existsSync(localPath)) {
    console.error(result.stdout || "");
    console.error(result.stderr || "");
    console.error("Failed to generate defaults. Install bun or create data/site-data.json first.");
    process.exit(1);
  }

  return JSON.parse(readFileSync(localPath, "utf8"));
}

loadEnv();

const key = process.env.JSONBIN_MASTER_KEY?.trim();
if (!key) {
  console.error("Missing JSONBIN_MASTER_KEY in .env");
  process.exit(1);
}

const localPath = resolve(process.cwd(), "data", "site-data.json");
const data = ensureLocalData(localPath);
data.updatedAt = new Date().toISOString();

const existing = process.env.JSONBIN_BIN_ID?.trim();
const url = existing
  ? `https://api.jsonbin.io/v3/b/${existing}`
  : "https://api.jsonbin.io/v3/b";
const method = existing ? "PUT" : "POST";

console.log(
  `${method} → members=${data.members?.length ?? 0} rules=${data.rules?.length ?? 0} shop=${data.shopProducts?.length ?? 0}`,
);

const res = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": key,
    "X-Bin-Name": "ballas-site-data",
    "X-Bin-Private": "true",
  },
  body: JSON.stringify(data),
});

const text = await res.text();
console.log("status:", res.status);
if (!res.ok) {
  console.error(text);
  process.exit(1);
}

const json = JSON.parse(text);
const id = json?.metadata?.id || json?.metadata?.parentId || existing;
console.log("BIN_ID:", id);

writeFileSync(localPath, JSON.stringify(data, null, 2));

const envPath = resolve(process.cwd(), ".env");
let env = readFileSync(envPath, "utf8");
if (/JSONBIN_BIN_ID=/.test(env)) {
  env = env.replace(/JSONBIN_BIN_ID=.*/g, `JSONBIN_BIN_ID=${id}`);
} else {
  env += `\nJSONBIN_BIN_ID=${id}\n`;
}
writeFileSync(envPath, env);
console.log("Updated .env with JSONBIN_BIN_ID");
console.log("Done. Restart the server so it picks up the bin id.");
