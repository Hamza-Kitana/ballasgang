import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) throw new Error("Missing .env");
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
    process.env[key] = value;
  }
}

loadEnv();

const vars = {
  VITE_SITE_URL: process.env.VITE_SITE_URL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
  JSONBIN_MASTER_KEY: process.env.JSONBIN_MASTER_KEY,
  JSONBIN_BIN_ID: process.env.JSONBIN_BIN_ID,
};

for (const [key, value] of Object.entries(vars)) {
  if (!value) {
    console.error(`Missing ${key} in .env`);
    process.exit(1);
  }
}

const environments = ["production", "preview", "development"];

for (const [name, value] of Object.entries(vars)) {
  for (const env of environments) {
    console.log(`Setting ${name} → ${env}`);
    const result = spawnSync(
      "npx",
      ["vercel", "env", "add", name, env, "--yes", "--force"],
      {
        input: value,
        encoding: "utf8",
        shell: true,
        cwd: process.cwd(),
      },
    );
    if (result.status !== 0) {
      console.error(result.stdout);
      console.error(result.stderr);
      process.exit(result.status || 1);
    }
    console.log((result.stdout || "").trim() || "ok");
  }
}

console.log("All env vars set.");
