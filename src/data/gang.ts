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
  role: string;
  bio: string;
  joined: string;
  status: "online" | "offline" | "live";
  streamUrl?: string;
  accent: string;
  stats: {
    reps: number;
    wars: number;
    respect: number;
  };
  badges: string[];
};

export type Achievement = {
  id: string;
  title: string;
  detail: string;
  year: string;
};

export type JoinStep = {
  step: number;
  title: string;
  detail: string;
};

export const GANG = {
  name: "BALLAS",
  tagline: "PURPLE DYNASTY",
  city: "Los Santos",
  motto: "Blood in. Loyalty forever.",
  discord: "discord.gg/ballas-dynasty",
} as const;

export const members: GangMember[] = [
  {
    id: "king-vio",
    name: "King Vio",
    alias: "Vio",
    rank: "Boss",
    role: "Dynasty Leader",
    bio: "Built the Purple Dynasty from the Grove up. Speaks once — the streets move.",
    joined: "2019",
    status: "live",
    streamUrl: "https://twitch.tv",
    accent: "#c084fc",
    stats: { reps: 98, wars: 42, respect: 100 },
    badges: ["Founder", "Warlord", "Crown"],
  },
  {
    id: "shadow-dre",
    name: "Shadow Dre",
    alias: "Dre",
    rank: "OG",
    role: "Street Commander",
    bio: "Quiet knife in the dark. Runs the blocks after midnight.",
    joined: "2020",
    status: "online",
    accent: "#a78bfa",
    stats: { reps: 91, wars: 37, respect: 94 },
    badges: ["OG", "Night Ops"],
  },
  {
    id: "nova-jay",
    name: "Nova Jay",
    alias: "Nova",
    rank: "Shot Caller",
    role: "Ops & Strategy",
    bio: "Maps every move before the sirens start. Never misses a call.",
    joined: "2021",
    status: "live",
    streamUrl: "https://twitch.tv",
    accent: "#e879f9",
    stats: { reps: 86, wars: 29, respect: 88 },
    badges: ["Strategist", "Live Legend"],
  },
  {
    id: "riot-kane",
    name: "Riot Kane",
    alias: "Kane",
    rank: "Enforcer",
    role: "Frontline Power",
    bio: "First through the door. Last one standing. Purple never folds.",
    joined: "2021",
    status: "online",
    accent: "#8b5cf6",
    stats: { reps: 84, wars: 33, respect: 82 },
    badges: ["Enforcer", "Iron Fist"],
  },
  {
    id: "lilac-mae",
    name: "Lilac Mae",
    alias: "Mae",
    rank: "Soldier",
    role: "Intel & Recruitment",
    bio: "Eyes everywhere. If you're worthy, she'll find you before you find us.",
    joined: "2022",
    status: "offline",
    accent: "#d8b4fe",
    stats: { reps: 74, wars: 18, respect: 79 },
    badges: ["Recruiter", "Ghost"],
  },
  {
    id: "hex-ron",
    name: "Hex Ron",
    alias: "Hex",
    rank: "Soldier",
    role: "Wheels & Escape",
    bio: "Drives like the city owes him money. Gets the family out clean.",
    joined: "2023",
    status: "online",
    accent: "#a855f7",
    stats: { reps: 71, wars: 15, respect: 76 },
    badges: ["Driver", "Escape Artist"],
  },
  {
    id: "pulse-ty",
    name: "Pulse Ty",
    alias: "Ty",
    rank: "Prospect",
    role: "Rising Blood",
    bio: "Proving ground every night. Hungry for the purple crown.",
    joined: "2025",
    status: "offline",
    accent: "#7c3aed",
    stats: { reps: 52, wars: 6, respect: 61 },
    badges: ["Prospect"],
  },
  {
    id: "venom-zoe",
    name: "Venom Zoe",
    alias: "Zoe",
    rank: "Enforcer",
    role: "Close Combat",
    bio: "Sweet smile, sharp edge. Don't test the violet.",
    joined: "2022",
    status: "live",
    streamUrl: "https://twitch.tv",
    accent: "#f0abfc",
    stats: { reps: 80, wars: 24, respect: 85 },
    badges: ["Venom", "Live"],
  },
];

export const achievements: Achievement[] = [
  {
    id: "a1",
    title: "Grove Takeover",
    detail: "Secured Eastside turf in a single night operation.",
    year: "2021",
  },
  {
    id: "a2",
    title: "Purple Crown Wars",
    detail: "Defended Dynasty HQ through a 72-hour siege.",
    year: "2022",
  },
  {
    id: "a3",
    title: "Blood Pact",
    detail: "United three crews under one violet banner.",
    year: "2023",
  },
  {
    id: "a4",
    title: "Night Empire",
    detail: "Held city-wide control for 40 consecutive nights.",
    year: "2024",
  },
  {
    id: "a5",
    title: "Dynasty Rising",
    detail: "Recruit wave that filled every rank with loyal blood.",
    year: "2025",
  },
  {
    id: "a6",
    title: "Los Santos Echo",
    detail: "Most feared name on the radio — server-wide.",
    year: "2026",
  },
];

export const joinSteps: JoinStep[] = [
  {
    step: 1,
    title: "Watch. Don't beg.",
    detail: "Study the Dynasty. Learn the colors. Respect comes before words.",
  },
  {
    step: 2,
    title: "Join the Discord",
    detail: "Open a ticket in #recruitment. Use your RP name. No spam.",
  },
  {
    step: 3,
    title: "Meet the Shot Caller",
    detail: "Interview in-city. Show presence, not attitude.",
  },
  {
    step: 4,
    title: "Prospect Trial",
    detail: "Prove loyalty on runs. Fail once — you're gone. Succeed — you're family.",
  },
];

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
