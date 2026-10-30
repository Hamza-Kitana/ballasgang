import type { Locale } from "@/i18n/messages";

export type MemberRank =
  | "Boss"
  | "OG"
  | "Shot Caller"
  | "Enforcer"
  | "Soldier"
  | "Prospect";

type Localized = { ar: string; en: string };

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
  /** Night-city / GTA-style loop used on the member profile background */
  bgVideo: string;
  stats: {
    reps: number;
    wars: number;
    respect: number;
  };
  badges: Localized[];
};

export type Achievement = {
  id: string;
  title: Localized;
  detail: Localized;
  year: string;
};

export type JoinStep = {
  step: number;
  title: Localized;
  detail: Localized;
};

export type GangRule = {
  id: string;
  code: string;
  title: Localized;
  detail: Localized;
  severity: "law" | "blood" | "street";
};

export const GANG = {
  name: "BALLAS",
  tagline: "PURPLE DYNASTY",
  city: "Los Santos",
  discord: "discord.gg/ballas-dynasty",
  game: "GTA V / FiveM",
  turf: "Davis · Chamberlain · East LS",
} as const;

export const members: GangMember[] = [
  {
    id: "king-vio",
    name: "King Vio",
    alias: "Vio",
    rank: "Boss",
    role: { ar: "زعيم عصابة Ballas", en: "Ballas Gang Boss" },
    bio: {
      ar: "يقود السلالة البنفسجية في لوس سانتوس. كل بلوك بنفسجي… بأمر واحد منه.",
      en: "Runs the Purple Dynasty across Los Santos. One word from him and the block moves purple.",
    },
    joined: "2019",
    status: "live",
    streamUrl: "https://twitch.tv",
    accent: "#c084fc",
    image: "/members/king-vio.jpg",
    liveImage: "/live/king-vio.jpg",
    bgVideo: "/videos/gta-1.mp4",
    stats: { reps: 98, wars: 42, respect: 100 },
    badges: [
      { ar: "مؤسس السيرفر", en: "Set Founder" },
      { ar: "قائد حرب", en: "War Boss" },
      { ar: "التاج", en: "Crown" },
    ],
  },
  {
    id: "shadow-dre",
    name: "Shadow Dre",
    alias: "Dre",
    rank: "OG",
    role: { ar: "قائد شوارع ساوث سايد", en: "South Side Street Commander" },
    bio: {
      ar: "يعرف كل زقاق في Davis. يشتغل بالليل… والشرطة توصل متأخرة.",
      en: "Knows every alley in Davis. Works the night — LSPD always late.",
    },
    joined: "2020",
    status: "online",
    accent: "#a78bfa",
    image: "/members/shadow-dre.jpg",
    bgVideo: "/videos/gta-2.mp4",
    stats: { reps: 91, wars: 37, respect: 94 },
    badges: [
      { ar: "OG", en: "OG" },
      { ar: "عمليات ليلية", en: "Night Ops" },
    ],
  },
  {
    id: "nova-jay",
    name: "Nova Jay",
    alias: "Nova",
    rank: "Shot Caller",
    role: { ar: "منسّق السرقات والهروب", en: "Heists & Escape Caller" },
    bio: {
      ar: "يرسم الروت قبل الصافرات. بنك، شاحنة، أو حرب بلوكات — النداء إله.",
      en: "Maps the route before the sirens. Bank, truck, or block war — he calls it.",
    },
    joined: "2021",
    status: "live",
    streamUrl: "https://twitch.tv",
    accent: "#e879f9",
    image: "/members/nova-jay.jpg",
    liveImage: "/live/nova-jay.jpg",
    bgVideo: "/videos/gta-3.mp4",
    stats: { reps: 86, wars: 29, respect: 88 },
    badges: [
      { ar: "استراتيجي", en: "Strategist" },
      { ar: "أسطورة لايف", en: "Live Legend" },
    ],
  },
  {
    id: "riot-kane",
    name: "Riot Kane",
    alias: "Kane",
    rank: "Enforcer",
    role: { ar: "قوة الخط الأمامي بالحروب", en: "Frontline Gang War Power" },
    bio: {
      ar: "أول واحد ينزل من السيارة بوقت الحرب. البنفسجي ما بيتراجع.",
      en: "First out the whip when war starts. Purple don't fold.",
    },
    joined: "2021",
    status: "online",
    accent: "#8b5cf6",
    image: "/members/riot-kane.jpg",
    bgVideo: "/videos/gta-4.mp4",
    stats: { reps: 84, wars: 33, respect: 82 },
    badges: [
      { ar: "منفّذ", en: "Enforcer" },
      { ar: "قبضة حديد", en: "Iron Fist" },
    ],
  },
  {
    id: "lilac-mae",
    name: "Lilac Mae",
    alias: "Mae",
    rank: "Soldier",
    role: { ar: "تجنيد وRP داخل المدينة", en: "Recruitment & City RP" },
    bio: {
      ar: "تشوف اللاعب الجدّي من أول لقاء. إذا تستاهل — بتجيبك للعيلة.",
      en: "Spots real RP talent on sight. If you belong, she'll pull you into the set.",
    },
    joined: "2022",
    status: "offline",
    accent: "#d8b4fe",
    image: "/members/lilac-mae.jpg",
    bgVideo: "/videos/gta-night.mp4",
    stats: { reps: 74, wars: 18, respect: 79 },
    badges: [
      { ar: "تجنيد", en: "Recruiter" },
      { ar: "شبح", en: "Ghost" },
    ],
  },
  {
    id: "hex-ron",
    name: "Hex Ron",
    alias: "Hex",
    rank: "Soldier",
    role: { ar: "سائق هروب / Getaway", en: "Getaway Driver" },
    bio: {
      ar: "بسوق على شوارع LS كأن الخريطة محفوظة براسه. يطلع العصابة سالمة.",
      en: "Drives LS like the map is burned in his head. Gets the crew out clean.",
    },
    joined: "2023",
    status: "online",
    accent: "#a855f7",
    image: "/members/hex-ron.jpg",
    bgVideo: "/videos/gta-6.mp4",
    stats: { reps: 71, wars: 15, respect: 76 },
    badges: [
      { ar: "سائق", en: "Driver" },
      { ar: "هروب نظيف", en: "Clean Escape" },
    ],
  },
  {
    id: "pulse-ty",
    name: "Pulse Ty",
    alias: "Ty",
    rank: "Prospect",
    role: { ar: "متدرّب تحت الاختبار", en: "Prospect on trial" },
    bio: {
      ar: "لسا بيتعلم قوانين العصابة. كل ليلة إثبات على السيرفر.",
      en: "Still learning set rules. Every night is a tryout on the server.",
    },
    joined: "2025",
    status: "offline",
    accent: "#7c3aed",
    image: "/members/pulse-ty.jpg",
    bgVideo: "/videos/gta-4.mp4",
    stats: { reps: 52, wars: 6, respect: 61 },
    badges: [{ ar: "متدرّب", en: "Prospect" }],
  },
  {
    id: "venom-zoe",
    name: "Venom Zoe",
    alias: "Zoe",
    rank: "Enforcer",
    role: { ar: "قتال قريب واشتباكات", en: "Close combat & shootouts" },
    bio: {
      ar: "ما بتخاف من نجوم المطلوبية. الاشتباك ساحتها.",
      en: "Doesn't flinch at wanted stars. Shootouts are her stage.",
    },
    joined: "2022",
    status: "live",
    streamUrl: "https://twitch.tv",
    accent: "#f0abfc",
    image: "/members/venom-zoe.jpg",
    liveImage: "/live/venom-zoe.jpg",
    bgVideo: "/videos/gta-2.mp4",
    stats: { reps: 80, wars: 24, respect: 85 },
    badges: [
      { ar: "سمّ", en: "Venom" },
      { ar: "بث", en: "Live" },
    ],
  },
];

export const achievements: Achievement[] = [
  {
    id: "a1",
    title: { ar: "سقوط تشيمبرلين", en: "Chamberlain Takeover" },
    detail: {
      ar: "سيطرنا على بلوكات South LS بليلة حرب عصابات كاملة.",
      en: "Took South LS blocks in one full gang-war night.",
    },
    year: "2021",
  },
  {
    id: "a2",
    title: { ar: "حرب ضد الـ Families", en: "War on the Families" },
    detail: {
      ar: "دافعنا عن أراضينا البنفسجية ضد الأخضر ٧٢ ساعة.",
      en: "Held purple turf against the green for 72 hours straight.",
    },
    year: "2022",
  },
  {
    id: "a3",
    title: { ar: "بنك المدينة", en: "City Bank Run" },
    detail: {
      ar: "سرقة منسّقة + هروب نظيف عبر الطرق السريعة.",
      en: "Coordinated heist with a clean freeway getaway.",
    },
    year: "2023",
  },
  {
    id: "a4",
    title: { ar: "إمبراطورية الليل", en: "Night Empire" },
    detail: {
      ar: "٤٠ ليلة متتالية سيطرة على الراديو والشوارع.",
      en: "40 nights straight owning the radio and the streets.",
    },
    year: "2024",
  },
  {
    id: "a5",
    title: { ar: "موجة تجنيد RP", en: "RP Recruit Wave" },
    detail: {
      ar: "عبّينا الرتب بلاعبين فاهمين رولبلاي… مش راندم كيل.",
      en: "Filled the ranks with real roleplayers — not random killers.",
    },
    year: "2025",
  },
  {
    id: "a6",
    title: { ar: "اسم مرعب على السيرفر", en: "Server-Wide Fear" },
    detail: {
      ar: "Ballas صارت أخوف اسم على الراديو في السيرفر.",
      en: "Ballas became the most feared name on the server radio.",
    },
    year: "2026",
  },
];

export const gangRules: GangRule[] = [
  {
    id: "r1",
    code: "01",
    title: { ar: "البنفسجي أولًا", en: "Purple first" },
    detail: {
      ar: "ألوان العصابة فوق أي شيء. تمشي بنفسجي… أو ما تمشي معنا.",
      en: "Set colors above everything. You ride purple — or you don't ride with us.",
    },
    severity: "law",
  },
  {
    id: "r2",
    code: "02",
    title: { ar: "ولاء بلا خيانة", en: "No snitching" },
    detail: {
      ar: "ما في كلام للشرطة ولا للعصابات الثانية عن شغل العصابة. الخيانة = خروج نهائي.",
      en: "No talking to cops or rival sets about Ballas business. Betrayal means permanent exile.",
    },
    severity: "blood",
  },
  {
    id: "r3",
    code: "03",
    title: { ar: "أوامر القيادة", en: "Chain of command" },
    detail: {
      ar: "الزعيم والـ OG وقائد الشارع كلامهم أمر. ما في جدال وسط العملية.",
      en: "Boss, OGs, and shot callers give orders. No arguing mid-op.",
    },
    severity: "law",
  },
  {
    id: "r4",
    code: "04",
    title: { ar: "احترام الطاقم", en: "Respect the crew" },
    detail: {
      ar: "ما في إهانة، سبام مايك، أو دم عشوائي على أعضاء العصابة. العائلة محمية.",
      en: "No insults, mic spam, or random fire on set members. Family is protected.",
    },
    severity: "street",
  },
  {
    id: "r5",
    code: "05",
    title: { ar: "RP جاد فقط", en: "Serious RP only" },
    detail: {
      ar: "فايف إم رولبلاي. ادخل الشخصية، احترم القوانين، واترك الراندم كيل برا.",
      en: "This is FiveM roleplay. Stay in character, respect lore, leave random deathmatch outside.",
    },
    severity: "street",
  },
  {
    id: "r6",
    code: "06",
    title: { ar: "الدفاع عن الأرض", en: "Defend the turf" },
    detail: {
      ar: "Davis وChamberlain وأراضي East LS ملكنا. أي تهديد = رد بنفسجي.",
      en: "Davis, Chamberlain, East LS are ours. Any threat gets a purple answer.",
    },
    severity: "blood",
  },
  {
    id: "r7",
    code: "07",
    title: { ar: "لا شغل فردي بدون إذن", en: "No solo ops" },
    detail: {
      ar: "سرقات كبيرة وحروب بلوكات تمرّ من القيادة. الشغل الفردي يوقع الكل.",
      en: "Big heists and block wars go through leadership. Solo glory puts the whole set at risk.",
    },
    severity: "law",
  },
  {
    id: "r8",
    code: "08",
    title: { ar: "صمت الراديو عند اللزوم", en: "Radio discipline" },
    detail: {
      ar: "وقت الحرب أو الهروب: كلام قصير وواضح. الصراخ يقتل العملية.",
      en: "During war or escape: short, clear radio. Screaming kills the run.",
    },
    severity: "street",
  },
];

export const joinSteps: JoinStep[] = [
  {
    step: 1,
    title: { ar: "اقرأ القوانين", en: "Read the laws" },
    detail: {
      ar: "اطّلع على قوانين العصابة تحت. التقديم يعني إنك موافق عليها كامل.",
      en: "Read the gang laws below. Applying means you fully accept them.",
    },
  },
  {
    step: 2,
    title: { ar: "افتح تذكرة تقديم", en: "Open apply ticket" },
    detail: {
      ar: "ادخل ديسكورد Ballas وافتح تذكرة تقديم. اكتب اسم الـ RP وعمرك وتجربتك بفايف إم.",
      en: "Join Ballas Discord and open an apply ticket. Add RP name, age, and FiveM experience.",
    },
  },
  {
    step: 3,
    title: { ar: "مراجعة القيادة", en: "Leadership review" },
    detail: {
      ar: "البوس أو الكو بوس يراجعون طلبك. انتظر الرد على التذكرة بهدوء.",
      en: "Boss or Co-Boss review your ticket. Wait calmly for a reply.",
    },
  },
  {
    step: 4,
    title: { ar: "مقابلة ثم متدرّب", en: "Interview then prospect" },
    detail: {
      ar: "مقابلة داخل المدينة، وبعدها فترة متدرّب. تنجح تصير Ballas رسمي.",
      en: "In-city interview, then a prospect period. Pass and you’re officially Ballas.",
    },
  },
];

export function loc(value: Localized, locale: Locale) {
  return value[locale];
}

export function getMember(id: string) {
  return members.find((m) => m.id === id);
}

export function getLiveMembers() {
  return members.filter((m) => m.status === "live");
}

export function getOnlineMembers() {
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
