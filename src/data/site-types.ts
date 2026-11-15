export type Localized = { ar: string; en: string };

export type MemberRank =
  | "Boss"
  | "OG"
  | "Shot Caller"
  | "Enforcer"
  | "Soldier"
  | "Prospect";

export type GangMember = {
  id: string;
  name: string;
  alias: string;
  rank: MemberRank;
  role: Localized;
  bio: Localized;
  joined: string;
  status: "online" | "offline" | "live";
  streamUrl?: string;
  accent: string;
  image: string;
  liveImage?: string;
  bgVideo: string;
  stats: {
    reps: number;
    wars: number;
    respect: number;
  };
  badges: Localized[];
};

export type RuleCategory =
  | "leadership"
  | "discipline"
  | "security"
  | "field"
  | "reputation";

export type GangRule = {
  id: string;
  code: string;
  title: Localized;
  detail: Localized;
  severity: "law" | "blood" | "street";
  category: RuleCategory;
};

export type JoinStep = {
  step: number;
  title: Localized;
  detail: Localized;
};

export type ShopCategory = "cars" | "clothes";
export type ShopBadge = "hot" | "new" | "limited";

export type ShopProduct = {
  id: string;
  category: ShopCategory;
  badge?: ShopBadge;
  featured?: boolean;
  name: Localized;
  blurb: Localized;
  price: string;
  image: string;
  meta: Localized;
};

export type SiteContent = {
  powerWord: Localized;
  loadingLabel: Localized;
  loadingSub: Localized;
  homeWelcome: Localized;
  homePitch: Localized;
  homeMission: Localized;
  homeCtaCrew: Localized;
  homeCtaJoin: Localized;
};

export type SiteSettings = {
  bgVideoId: string;
  musicTrackId: string;
  themeColor: string;
};

export type GangInfo = {
  name: string;
  tagline: string;
  city: string;
  discord: string;
  discordUrl: string;
  game: string;
  turf: string;
};

export type SiteData = {
  version: number;
  updatedAt: string;
  gang: GangInfo;
  members: GangMember[];
  rules: GangRule[];
  joinSteps: JoinStep[];
  shopProducts: ShopProduct[];
  settings: SiteSettings;
  content: SiteContent;
};

export const ruleCategories: RuleCategory[] = [
  "leadership",
  "discipline",
  "security",
  "field",
  "reputation",
];

export const shopCategories: ShopCategory[] = ["cars", "clothes"];

export function loc(value: Localized, locale: "ar" | "en") {
  return value[locale];
}

export function getLiveMembers(members: GangMember[]) {
  return members.filter((m) => m.status === "live");
}

export function getOnlineMembers(members: GangMember[]) {
  return members.filter((m) => m.status === "online" || m.status === "live");
}

export function memberInitials(member: GangMember) {
  return member.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
