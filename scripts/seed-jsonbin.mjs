import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const key = process.env.JSONBIN_MASTER_KEY?.trim();
if (!key) {
  console.error("Missing JSONBIN_MASTER_KEY in .env");
  process.exit(1);
}

const defaultsPath = resolve(process.cwd(), "data", "site-data.seed.json");

// Minimal seed if TS defaults aren't available from Node
const seed = {
  version: 1,
  updatedAt: new Date().toISOString(),
  gang: {
    name: "BALLAS",
    tagline: "PURPLE DYNASTY",
    city: "Los Santos",
    discord: "discord.gg/WMRrN4sKPn",
    discordUrl: "https://discord.gg/WMRrN4sKPn",
    game: "GTA V / FiveM",
    turf: "Davis · Chamberlain · East LS",
  },
  members: [],
  rules: [],
  joinSteps: [],
  shopProducts: [],
  settings: {
    bgVideoId: "-v1nh3KeKAM",
    musicTrackId: "7j06hETnyzc",
    themeColor: "#6b21a8",
  },
  content: {
    powerWord: {
      ar: "الثقة نادرة، والخيانة شائعة",
      en: "Trust is Rare, Betrayal is Common",
    },
    loadingLabel: { ar: "جاري دخول المدينة…", en: "Entering the city…" },
    loadingSub: {
      ar: "GTA V · FiveM · Los Santos",
      en: "GTA V · FiveM · Los Santos",
    },
    homeWelcome: {
      ar: "نرحب بكم في عصابة الـ BALLAS",
      en: "Welcome to the BALLAS gang",
    },
    homePitch: {
      ar: "موقع Ballas الرسمي — الشارع، الطاقم، والقانون تحت تاج واحد.",
      en: "The official Ballas site — streets, crew, and law under one crown.",
    },
    homeMission: {
      ar: "الولاء · السيطرة · البنفسجي أولًا",
      en: "Loyalty · turf · purple first",
    },
    homeCtaCrew: { ar: "ادخل على العصابة", en: "Enter the set" },
    homeCtaJoin: { ar: "قدّم الآن", en: "Apply now" },
  },
};

const existingBin = process.env.JSONBIN_BIN_ID?.trim();
const url = existingBin
  ? `https://api.jsonbin.io/v3/b/${existingBin}`
  : "https://api.jsonbin.io/v3/b";
const method = existingBin ? "PUT" : "POST";

console.log(`JSONBin ${method} …`);
const res = await fetch(url, {
  method,
  headers: {
    "Content-Type": "application/json",
    "X-Master-Key": key,
    "X-Bin-Name": "ballas-site-data",
    "X-Bin-Private": "true",
  },
  body: JSON.stringify(seed),
});

const text = await res.text();
console.log("status:", res.status);
console.log(text);

if (!res.ok) {
  console.error("\nMaster Key rejected or request failed.");
  console.error("Open https://jsonbin.io/app/api-keys and copy a valid Master Key into .env");
  process.exit(1);
}

let id = existingBin;
try {
  const json = JSON.parse(text);
  id = json?.metadata?.id || json?.metadata?.parentId || existingBin;
} catch {
  /* ignore */
}

mkdirSync(resolve(process.cwd(), "data"), { recursive: true });
writeFileSync(defaultsPath, JSON.stringify(seed, null, 2));

if (id) {
  console.log(`\nOK — set this in .env:\nJSONBIN_BIN_ID=${id}\n`);
} else {
  console.log("\nOK — bin updated (existing JSONBIN_BIN_ID).");
}
