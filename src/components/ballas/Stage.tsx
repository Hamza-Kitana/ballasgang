import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { HomePanel } from "@/components/ballas/panels/HomePanel";
import { MembersPanel } from "@/components/ballas/panels/MembersPanel";
import { LivePanel } from "@/components/ballas/panels/LivePanel";
import { RulesPanel } from "@/components/ballas/panels/RulesPanel";
import { ShopPanel } from "@/components/ballas/panels/ShopPanel";
import { JoinPanel } from "@/components/ballas/panels/JoinPanel";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { LanguageToggle } from "@/components/ballas/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";

const tabIds = ["home", "members", "live", "rules", "shop", "join"] as const;
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
  const isHome = tab === "home";
  const timers = useRef<number[]>([]);

  const tabs = [
    { id: "home" as const, label: t.nav.home },
    { id: "members" as const, label: t.nav.members },
    { id: "live" as const, label: t.nav.live },
    { id: "rules" as const, label: t.nav.rules },
    { id: "shop" as const, label: t.nav.shop },
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

  const renderNavItems = (compact: boolean) =>
    tabs.map((item) => {
      const active = tab === item.id && !transition;
      const pending = transition?.to === item.id;
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => goTo(item.id)}
          disabled={Boolean(transition)}
          className={cn(
            "ballas-nav-link relative min-w-0 whitespace-nowrap transition duration-300",
            compact
              ? "flex-1 px-1 py-2 text-[10px] font-semibold tracking-[0.04em]"
              : "px-3.5 py-2 text-[13px] font-semibold tracking-[0.12em] lg:px-4 lg:text-[14px]",
            active || pending
              ? "ballas-nav-link-active text-white"
              : "text-white/50 hover:text-violet-soft",
            transition && "opacity-75",
          )}
        >
          <span className="relative z-10 truncate">{item.label}</span>
          {(active || pending) && !compact ? <span className="ballas-nav-link-glow" aria-hidden /> : null}
        </button>
      );
    });

  return (
    <div className="relative z-10 flex h-full flex-col px-3 pt-[max(0.65rem,env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-5 sm:pt-4 sm:pb-4">
      {/* Desktop top bar — floating cinema rail */}
      <header className="relative z-30 hidden shrink-0 md:block">
        <div
          className={cn(
            "ballas-nav-rail mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5 lg:gap-4 lg:px-4",
            isHome && "ballas-nav-rail-home",
          )}
        >
          <button
            type="button"
            onClick={() => goTo("home")}
            disabled={Boolean(transition)}
            className="ballas-nav-brand group relative flex shrink-0 items-center outline-none"
            aria-label="Ballas home"
          >
            <span className="ballas-nav-brand-glow pointer-events-none absolute inset-[-20%] rounded-full" />
            <BallasLogo
              size="sm"
              glow={false}
              markClassName="!h-12 !max-w-[6.8rem] lg:!h-14 lg:!max-w-[7.8rem] relative z-10 drop-shadow-[0_0_18px_oklch(0.64_0.28_305/0.45)]"
            />
          </button>

          <div className="ballas-nav-rail-line hidden h-8 w-px shrink-0 lg:block" />

          <nav
            className="flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto lg:gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Ballas navigation"
          >
            {renderNavItems(false)}
          </nav>

          <div className="ballas-nav-rail-line hidden h-8 w-px shrink-0 lg:block" />

          <div className="shrink-0">
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Mobile top */}
      <header className="relative z-30 flex shrink-0 items-center justify-between gap-3 md:hidden">
        <button
          type="button"
          onClick={() => goTo("home")}
          disabled={Boolean(transition)}
          className="shrink-0 outline-none"
          aria-label="Ballas home"
        >
          <BallasLogo size="sm" glow={false} markClassName="!h-12 !max-w-[6.5rem]" />
        </button>
        <LanguageToggle />
      </header>

      <main
        className={cn(
          "relative mt-3 min-h-0 flex-1 overflow-hidden pb-2 md:mt-4",
          "mb-[5rem] md:mb-0",
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

      {/* Mobile bottom rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-2.5 pb-[max(0.55rem,env(safe-area-inset-bottom))] md:hidden">
        <nav
          className={cn(
            "ballas-nav-rail ballas-nav-rail-mobile pointer-events-auto flex w-full max-w-lg items-stretch gap-0.5 px-1.5 py-1.5",
            isHome && "ballas-nav-rail-home",
          )}
          aria-label="Ballas navigation"
        >
          {renderNavItems(true)}
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
          <div className="ballas-page-sting-glow absolute start-1/2 top-1/2 h-[min(70vw,420px)] w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div className="ballas-page-sting-slash absolute inset-y-0 -start-1/4 w-1/2" />
          <div className="ballas-page-sting-slash ballas-page-sting-slash-delay absolute inset-y-0 start-1/3 w-1/3" />
          <div className="ballas-page-sting-line absolute inset-x-[8%] top-[38%] h-px" />
          <div className="ballas-page-sting-line absolute inset-x-[14%] top-[62%] h-px" style={{ animationDelay: "80ms" }} />

          {/* No card — floating cinematic title only */}
          <div className="ballas-page-sting-core relative z-10 flex flex-col items-center px-6 text-center">
            <img
              src="/ballas-logo.png"
              alt=""
              className="ballas-page-sting-mark h-[clamp(5.5rem,22vw,9rem)] w-auto object-contain"
              draggable={false}
            />
            <p className="ballas-page-sting-eyebrow mt-5 text-[10px] tracking-[0.4em] text-violet-soft uppercase sm:text-[11px]">
              {t.transition.entering}
            </p>
            <h2 className="ballas-page-sting-title font-display mt-2 text-[clamp(2.8rem,14vw,5.5rem)] leading-none tracking-[0.06em] text-white">
              {transition.label}
            </h2>
            <div className="ballas-page-sting-bar mt-6 h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full w-full rounded-full bg-gradient-to-l from-violet-soft to-primary" />
            </div>
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
    case "shop":
      return <ShopPanel />;
    case "join":
      return <JoinPanel />;
  }
}
