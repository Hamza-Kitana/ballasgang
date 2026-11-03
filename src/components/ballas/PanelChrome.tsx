import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelChromeProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  accent?: "violet" | "red";
  end?: ReactNode;
  className?: string;
};

export function PanelChrome({
  eyebrow,
  title,
  subtitle,
  accent = "violet",
  end,
  className,
}: PanelChromeProps) {
  return (
    <div className={cn("mb-3 flex shrink-0 flex-wrap items-end justify-between gap-3 sm:mb-5 sm:gap-4", className)}>
      <div className="min-w-0">
        <p
          className={cn(
            "text-[10px] tracking-[0.22em] sm:text-xs sm:tracking-[0.3em]",
            accent === "red" ? "text-red-300" : "text-violet-soft",
          )}
        >
          {eyebrow}
        </p>
        <h2 className="font-display mt-0.5 text-[clamp(1.85rem,8vw,4.4rem)] leading-[0.92] tracking-[0.05em] text-glow sm:mt-1">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-white/70 sm:mt-2 sm:text-sm">{subtitle}</p>
        ) : null}
        <div
          className={cn(
            "mt-2 h-px w-24 bg-gradient-to-r to-transparent sm:mt-3 sm:w-36",
            accent === "red" ? "from-red-400" : "from-primary via-violet-glow",
          )}
        />
      </div>
      {end ? <div className="shrink-0">{end}</div> : null}
    </div>
  );
}
