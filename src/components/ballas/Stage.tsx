import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HomePanel } from "@/components/ballas/panels/HomePanel";
import { MembersPanel } from "@/components/ballas/panels/MembersPanel";
import { LivePanel } from "@/components/ballas/panels/LivePanel";
import { AchievementsPanel } from "@/components/ballas/panels/AchievementsPanel";
import { JoinPanel } from "@/components/ballas/panels/JoinPanel";
import { getLiveMembers } from "@/data/gang";
import { CrownMark } from "@/components/ballas/CrownMark";

const tabs = [
  { id: "home", label: "Home" },
  { id: "members", label: "Members" },
  { id: "live", label: "Live" },
  { id: "achievements", label: "Legacy" },
  { id: "join", label: "Join" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function Stage() {
  const [tab, setTab] = useState<TabId>("home");
  const liveCount = getLiveMembers().length;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const index = tabs.findIndex((item) => item.id === tab);
      if (event.key === "ArrowRight") {
        setTab(tabs[(index + 1) % tabs.length]!.id);
      }
      if (event.key === "ArrowLeft") {
        setTab(tabs[(index - 1 + tabs.length) % tabs.length]!.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab]);

  return (
    <div className="ballas-fade relative z-10 flex h-full flex-col px-4 pt-5 pb-4 sm:px-8 sm:pt-7 sm:pb-6">
      <header className="flex shrink-0 items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <CrownMark className="h-9 w-9 drop-shadow-[0_0_16px_oklch(0.72_0.28_310/0.7)]" />
          <div>
            <p className="font-display text-2xl tracking-[0.22em] text-glow sm:text-3xl">BALLAS</p>
            <p className="text-[10px] tracking-[0.38em] text-violet-soft uppercase">Purple Dynasty</p>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "relative px-3.5 py-2 text-[11px] tracking-[0.24em] uppercase transition duration-300",
                tab === item.id ? "text-white" : "text-muted-foreground hover:text-violet-soft",
              )}
            >
              {item.label}
              {item.id === "live" && liveCount > 0 ? (
                <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] text-white shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                  {liveCount}
                </span>
              ) : null}
              <span
                className={cn(
                  "absolute inset-x-3 bottom-0 h-px origin-center bg-gradient-to-r from-transparent via-primary to-transparent transition duration-300",
                  tab === item.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                )}
              />
            </button>
          ))}
        </nav>
      </header>

      <main className="relative mt-5 min-h-0 flex-1 overflow-hidden" key={tab}>
        {renderPanel(tab)}
      </main>

      <footer className="mt-3 hidden shrink-0 items-center justify-between border-t border-white/10 pt-3 text-[10px] tracking-[0.28em] text-muted-foreground uppercase md:flex">
        <span>Los Santos · Dynasty Protocol</span>
        <span>← → Switch rooms</span>
      </footer>

      <nav className="mt-3 flex shrink-0 gap-1 overflow-x-auto border-t border-white/10 pt-3 md:hidden">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              "whitespace-nowrap px-3 py-2 text-[10px] tracking-[0.18em] uppercase transition",
              tab === item.id
                ? "bg-primary/30 text-white shadow-[inset_0_0_0_1px_oklch(0.64_0.28_305/0.45)]"
                : "text-muted-foreground",
            )}
          >
            {item.label}
            {item.id === "live" && liveCount > 0 ? ` · ${liveCount}` : ""}
          </button>
        ))}
      </nav>
    </div>
  );
}

function renderPanel(tab: TabId) {
  switch (tab) {
    case "home":
      return <HomePanel />;
    case "members":
      return <MembersPanel />;
    case "live":
      return <LivePanel />;
    case "achievements":
      return <AchievementsPanel />;
    case "join":
      return <JoinPanel />;
  }
}
