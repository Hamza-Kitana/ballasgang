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

  const [flash, setFlash] = useState(0);

  const goTo = (next: TabId) => {
    if (next === tab) return;
    const from = tabIds.indexOf(tab);
    const to = tabIds.indexOf(next);
    setDirection(to >= from ? "next" : "prev");
    setFlash((n) => n + 1);
    setTab(next);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const index = tabIds.findIndex((item) => item === tab);
      if (event.key === "ArrowRight") {
        goTo(tabIds[(index + 1) % tabIds.length]!);
      }
      if (event.key === "ArrowLeft") {
        goTo(tabIds[(index - 1 + tabIds.length) % tabIds.length]!);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="relative z-10 flex h-full flex-col px-3 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
      <header className="relative z-30 flex shrink-0 items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo("home")}
          className={cn(
            "shrink-0 outline-none transition",
            isHome ? "opacity-0 pointer-events-none" : "opacity-100 hover:opacity-90",
          )}
          aria-label="Ballas home"
        >
          <BallasLogo size="sm" showWordmark={false} />
        </button>

        {/* Centered floating dock — not full bleed */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
          <nav
            className={cn(
              "ballas-nav-dock pointer-events-auto flex max-w-[min(100%,56rem)] items-center gap-1 overflow-x-auto px-2 py-2 sm:gap-1.5 sm:px-3 sm:py-2.5",
              isHome && "ballas-nav-dock-home",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
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
                    "ballas-nav-item relative whitespace-nowrap px-3.5 py-3 text-[13px] font-semibold tracking-[0.1em] transition duration-300 sm:px-5 sm:py-3.5 sm:text-[15px]",
                    active
                      ? "ballas-nav-item-active text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-violet-soft",
                  )}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {item.label}
                    {item.id === "live" && liveCount > 0 ? (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white">
                        {liveCount}
                      </span>
                    ) : null}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="relative z-10 shrink-0">
          <LanguageToggle />
        </div>
      </header>

      <main
        className={cn(
          "relative mt-4 min-h-0 flex-1 overflow-hidden pb-2",
          tab === "members" && "-mx-1 px-1 sm:-mx-2 sm:px-2",
        )}
      >
        {flash > 0 ? (
          <div key={`flash-${flash}`} className="pointer-events-none absolute inset-0 z-20">
            <div className="panel-flash absolute inset-0" />
            <div className="panel-wipe absolute inset-x-0 top-1/3" />
            <div className="panel-wipe absolute inset-x-0 top-2/3" style={{ animationDelay: "60ms" }} />
          </div>
        ) : null}

        <div
          key={`${tab}-${flash}`}
          className={cn(
            "h-full",
            direction === "next" ? "panel-enter-next" : "panel-enter-prev",
          )}
        >
          {renderPanel(tab, goTo)}
        </div>
      </main>
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
