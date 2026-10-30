import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HomePanel } from "@/components/ballas/panels/HomePanel";
import { MembersPanel } from "@/components/ballas/panels/MembersPanel";
import { LivePanel } from "@/components/ballas/panels/LivePanel";
import { RulesPanel } from "@/components/ballas/panels/RulesPanel";
import { AchievementsPanel } from "@/components/ballas/panels/AchievementsPanel";
import { JoinPanel } from "@/components/ballas/panels/JoinPanel";
import { getLiveMembers } from "@/data/gang";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { LanguageToggle } from "@/components/ballas/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";

const tabIds = ["home", "members", "live", "rules", "achievements", "join"] as const;
type TabId = (typeof tabIds)[number];

export function Stage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>("home");
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const liveCount = getLiveMembers().length;
  const isHome = tab === "home";

  const tabs = [
    { id: "home" as const, label: t.nav.home },
    { id: "members" as const, label: t.nav.members },
    { id: "live" as const, label: t.nav.live },
    { id: "rules" as const, label: t.nav.rules },
    { id: "achievements" as const, label: t.nav.achievements },
    { id: "join" as const, label: t.nav.join },
  ];

  const goTo = (next: TabId) => {
    const from = tabIds.indexOf(tab);
    const to = tabIds.indexOf(next);
    setDirection(to >= from ? "next" : "prev");
    setTab(next);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const index = tabIds.findIndex((item) => item === tab);
      if (event.key === "ArrowRight") {
        const next = tabIds[(index + 1) % tabIds.length]!;
        setDirection("next");
        setTab(next);
      }
      if (event.key === "ArrowLeft") {
        const next = tabIds[(index - 1 + tabIds.length) % tabIds.length]!;
        setDirection("prev");
        setTab(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab]);

  return (
    <div className="relative z-10 flex h-full flex-col px-3 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
      <header className="relative flex shrink-0 items-center justify-between gap-3">
        <div className={cn("transition duration-300", isHome ? "opacity-0 pointer-events-none" : "opacity-100")}>
          <button type="button" onClick={() => goTo("home")} className="outline-none">
            <BallasLogo size="sm" />
          </button>
        </div>

        <div className="absolute start-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          {!isHome ? (
            <p className="text-[10px] tracking-[0.28em] text-violet-soft/80 uppercase">{t.brandTag}</p>
          ) : null}
        </div>

        <LanguageToggle />
      </header>

      <main className="relative mt-3 min-h-0 flex-1 overflow-hidden pb-20 sm:pb-24">
        <div
          key={tab}
          className={cn(
            "h-full",
            direction === "next" ? "panel-enter-next" : "panel-enter-prev",
          )}
        >
          {renderPanel(tab, goTo)}
        </div>
      </main>

      {/* Centered distinctive nav dock */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-30 flex justify-center px-3 sm:bottom-5">
        <nav
            className={cn(
            "ballas-nav-dock pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto px-1.5 py-1.5 sm:gap-1 sm:px-2",
            isHome && "ballas-nav-dock-home",
          )}
          aria-label="Ballas navigation"
        >
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={cn(
                  "ballas-nav-item relative whitespace-nowrap px-3.5 py-2.5 text-[10px] tracking-[0.12em] transition duration-300 sm:px-4 sm:text-[11px]",
                  active ? "ballas-nav-item-active text-white" : "text-white/55 hover:bg-white/5 hover:text-violet-soft",
                )}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  {item.label}
                  {item.id === "live" && liveCount > 0 ? (
                    <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                      {liveCount}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function renderPanel(tab: TabId, goTo: (next: TabId) => void) {
  switch (tab) {
    case "home":
      return <HomePanel onNavigate={(next) => goTo(next)} />;
    case "members":
      return <MembersPanel />;
    case "live":
      return <LivePanel />;
    case "rules":
      return <RulesPanel />;
    case "achievements":
      return <AchievementsPanel />;
    case "join":
      return <JoinPanel />;
  }
}
