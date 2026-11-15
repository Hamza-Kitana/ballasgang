import { members as seedMembers, gangRules, joinSteps, GANG } from "@/data/gang";
import { shopProducts as seedShop } from "@/data/shop";
import type { SiteData } from "@/data/site-types";

export function buildDefaultSiteData(): SiteData {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    gang: {
      name: GANG.name,
      tagline: GANG.tagline,
      city: GANG.city,
      discord: GANG.discord,
      discordUrl: GANG.discordUrl,
      game: GANG.game,
      turf: GANG.turf,
    },
    members: structuredClone(seedMembers),
    rules: structuredClone(gangRules),
    joinSteps: structuredClone(joinSteps),
    shopProducts: structuredClone(seedShop),
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
      loadingLabel: {
        ar: "جاري دخول المدينة…",
        en: "Entering the city…",
      },
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
      homeCtaCrew: {
        ar: "ادخل على العصابة",
        en: "Enter the set",
      },
      homeCtaJoin: {
        ar: "قدّم الآن",
        en: "Apply now",
      },
    },
  };
}
