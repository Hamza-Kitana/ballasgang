import { useEffect, useRef, useState } from "react";
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

type TransitionState = {
  id: number;
  to: TabId;
  label: string;
};

export function Stage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<TabId>("home");
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [flash, setFlash] = useState(0);
  const liveCount = getLiveMembers().length;
  const isHome = tab === "home";
  const timers = useRef<number[]>([]);

  const tabs = [
    { id: "home" as const, label: t.nav.home },
    { id: "members" as const, label: t.nav.members },
    { id: "live" as const, label: t.nav.live },
    { id: "rules" as const, label: t.nav.rules },
    { id: "achievements" as const, label: t.nav.achievements },
    { id: "join" as const, label: t.nav.join },
  ];

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const goTo = (next: TabId) => {
    if (next === tab || transition) return;
    const from = tabIds.indexOf(tab);
    const to = tabIds.indexOf(next);
    const label = tabs.find((item) => item.id === next)?.label ?? next;
    setDirection(to >= from ? "next" : "prev");
    clearTimers();
    setTransition({ id: Date.now(), to: next, label });

    // Swap content mid-sting so it reveals under the title card
    timers.current.push(
      window.setTimeout(() => {
        setTab(next);
        setFlash((n) => n + 1);
      }, 420),
    );
    timers.current.push(
      window.setTimeout(() => {
        setTransition(null);
      }, 1180),
    );
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (transition) return;
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

  const navItems = (
    <>
      {tabs.map((item) => {
        const active = tab === item.id && !transition;
        const pending = transition?.to === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(item.id)}
            disabled={Boolean(transition)}
            className={cn(
              "ballas-nav-item relative min-w-0 flex-1 whitespace-nowrap transition duration-300 md:flex-none",
              "px-1.5 py-2.5 text-[11px] font-semibold tracking-[0.04em] md:px-5 md:py-3.5 md:text-[15px] md:tracking-[0.1em]",
              active || pending
                ? "ballas-nav-item-active text-white"
                : "text-white/55 hover:bg-white/5 hover:text-violet-soft",
              transition && "opacity-80",
            )}
          >
            <span className="relative z-10 inline-flex max-w-full items-center justify-center gap-1 md:gap-2">
              <span className="truncate">{item.label}</span>
              {item.id === "live" && liveCount > 0 ? (
                <span className="inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white md:h-5 md:min-w-5 md:px-1.5 md:text-[11px]">
                  {liveCount}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </>
  );

  return (
    <div className="relative z-10 flex h-full flex-col px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-5 sm:pb-4">
      <header className="relative z-30 flex shrink-0 items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo("home")}
          disabled={Boolean(transition)}
          className={cn(
            "shrink-0 outline-none transition",
            isHome ? "opacity-100" : "opacity-100 hover:opacity-90",
          )}
          aria-label="Ballas home"
        >
          <BallasLogo
            size="sm"
            showWordmark={false}
            className={cn(isHome && "md:opacity-0 md:pointer-events-none")}
            markClassName="!h-8 md:!h-9"
          />
        </button>

        <div className="pointer-events-none absolute inset-x-0 top-0 hidden justify-center md:flex">
          <nav
            className={cn(
              "ballas-nav-dock pointer-events-auto flex max-w-[min(100%,56rem)] items-center gap-1.5 overflow-x-auto px-3 py-2.5",
              isHome && "ballas-nav-dock-home",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
            aria-label="Ballas navigation"
          >
            {navItems}
          </nav>
        </div>

        <div className="relative z-10 shrink-0">
          <LanguageToggle />
        </div>
      </header>

      <main
        className={cn(
          "relative mt-3 min-h-0 flex-1 overflow-hidden pb-2 md:mt-4",
          "mb-[4.75rem] md:mb-0",
          tab === "members" && "-mx-1 px-1 sm:-mx-2 sm:px-2",
        )}
      >
        <div
          key={`${tab}-${flash}`}
          className={cn(
            "h-full",
            flash > 0 && (direction === "next" ? "panel-enter-next" : "panel-enter-prev"),
          )}
        >
          {renderPanel(tab, goTo)}
        </div>
      </main>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.55rem,env(safe-area-inset-bottom))] md:hidden">
        <nav
          className={cn(
            "ballas-nav-dock ballas-nav-dock-mobile pointer-events-auto flex w-full max-w-lg items-stretch gap-0.5 px-1.5 py-1.5",
            isHome && "ballas-nav-dock-home",
          )}
          aria-label="Ballas navigation"
        >
          {navItems}
        </nav>
      </div>

      {transition ? (
        <div
          key={transition.id}
          className="ballas-page-sting pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="ballas-page-sting-veil absolute inset-0" />
          <div className="ballas-page-sting-slash absolute inset-y-0 -start-1/4 w-1/2" />
          <div className="ballas-page-sting-slash ballas-page-sting-slash-delay absolute inset-y-0 start-1/3 w-1/3" />
          <div className="ballas-page-sting-line absolute inset-x-[12%] top-[42%] h-px" />
          <div className="ballas-page-sting-line absolute inset-x-[18%] top-[58%] h-px" style={{ animationDelay: "80ms" }} />

          <div className="ballas-page-sting-card relative z-10 mx-4 flex max-w-lg flex-col items-center px-6 py-8 text-center sm:px-10 sm:py-10">
            <img
              src="/ballas-b.png"
              alt=""
              className="ballas-page-sting-mark mb-4 h-12 w-auto object-contain sm:h-14"
              draggable={false}
            />
            <p className="ballas-page-sting-eyebrow text-[10px] tracking-[0.35em] text-violet-soft uppercase sm:text-[11px]">
              {t.transition.entering}
            </p>
            <h2 className="ballas-page-sting-title font-display mt-3 text-[clamp(2.4rem,12vw,4.6rem)] leading-none tracking-[0.06em] text-white">
              {transition.label}
            </h2>
            <p className="ballas-page-sting-brand mt-3 font-brand text-sm tracking-[0.42em] text-violet-soft sm:text-base">
              {t.transition.brand}
            </p>
            <div className="ballas-page-sting-bar mt-5 h-1 w-28 overflow-hidden rounded-full bg-white/15">
              <span className="block h-full w-full origin-right rounded-full bg-primary rtl:origin-left" />
            </div>
            <p className="ballas-page-sting-eyebrow mt-3 text-[9px] tracking-[0.28em] text-white/45 uppercase">
              {t.transition.open}
            </p>
          </div>
        </div>
      ) : null}
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
