/**
 * Site SEO config — غيّر `url` لما يصير عندك دومين نهائي
 * أو حط VITE_SITE_URL في ملف .env
 */
export const SITE = {
  name: "Ballas Purple Dynasty",
  shortName: "Ballas",
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://ballasgang.com",
  locale: "ar_SA",
  localeAlt: "en_US",
  title: "Ballas Purple Dynasty · عصابة FiveM",
  titleEn: "Ballas Purple Dynasty · GTA FiveM Gang",
  description:
    "موقع Ballas الرسمي — عصابة شوارع GTA V / FiveM في لوس سانتوس. أعضاء، بثوث، قوانين، ومتجر.",
  descriptionEn:
    "Official Ballas site — GTA V / FiveM street gang in Los Santos. Crew, live streams, laws, and shop.",
  keywords: [
    "Ballas",
    "FiveM",
    "GTA V",
    "GTA RP",
    "Los Santos",
    "عصابة",
    "Ballas Gang",
    "Purple Dynasty",
  ].join(", "),
  image: "/og-cover.jpg",
  twitter: "@ballas",
  themeColor: "#6b21a8",
} as const;

export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${clean === "/" ? "" : clean}`;
}
