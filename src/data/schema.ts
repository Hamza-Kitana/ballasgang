import { z } from "zod";

const localizedSchema = z.object({
  ar: z.string(),
  en: z.string(),
});

const memberSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  alias: z.string(),
  rank: z.enum(["Boss", "OG", "Shot Caller", "Enforcer", "Soldier", "Prospect"]),
  role: localizedSchema,
  bio: localizedSchema,
  joined: z.string(),
  status: z.enum(["online", "offline", "live"]),
  streamUrl: z.string().optional(),
  accent: z.string(),
  image: z.string(),
  liveImage: z.string().optional(),
  bgVideo: z.string(),
  stats: z.object({
    reps: z.number(),
    wars: z.number(),
    respect: z.number(),
  }),
  badges: z.array(localizedSchema),
});

const ruleSchema = z.object({
  id: z.string().min(1),
  code: z.string(),
  title: localizedSchema,
  detail: localizedSchema,
  severity: z.enum(["law", "blood", "street"]),
  category: z.enum(["leadership", "discipline", "security", "field", "reputation"]),
});

const joinStepSchema = z.object({
  step: z.number(),
  title: localizedSchema,
  detail: localizedSchema,
});

const shopProductSchema = z.object({
  id: z.string().min(1),
  category: z.enum(["cars", "clothes"]),
  badge: z.enum(["hot", "new", "limited"]).optional(),
  featured: z.boolean().optional(),
  name: localizedSchema,
  blurb: localizedSchema,
  price: z.string(),
  image: z.string(),
  meta: localizedSchema,
});

export const siteDataSchema = z.object({
  version: z.number(),
  updatedAt: z.string(),
  gang: z.object({
    name: z.string(),
    tagline: z.string(),
    city: z.string(),
    discord: z.string(),
    discordUrl: z.string(),
    game: z.string(),
    turf: z.string(),
  }),
  members: z.array(memberSchema),
  rules: z.array(ruleSchema),
  joinSteps: z.array(joinStepSchema),
  shopProducts: z.array(shopProductSchema),
  settings: z.object({
    bgVideoId: z.string(),
    musicTrackId: z.string(),
    themeColor: z.string(),
  }),
  content: z.object({
    powerWord: localizedSchema,
    loadingLabel: localizedSchema,
    loadingSub: localizedSchema,
    homeWelcome: localizedSchema,
    homePitch: localizedSchema,
    homeMission: localizedSchema,
    homeCtaCrew: localizedSchema,
    homeCtaJoin: localizedSchema,
  }),
});

export function parseSiteData(input: unknown) {
  return siteDataSchema.parse(input);
}
