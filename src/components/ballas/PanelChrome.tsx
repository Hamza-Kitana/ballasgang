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
    <div className={cn("mb-5 flex shrink-0 flex-wrap items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <p
          className={cn(
            "text-xs tracking-[0.3em]",
            accent === "red" ? "text-red-300" : "text-violet-soft",
          )}
        >
          {eyebrow}
        </p>
        <h2 className="font-display mt-1 text-[clamp(2.4rem,7vw,4.4rem)] leading-[0.9] tracking-[0.05em] text-glow">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">{subtitle}</p>
        ) : null}
        <div
          className={cn(
            "mt-3 h-px w-36 bg-gradient-to-r to-transparent",
            accent === "red" ? "from-red-400" : "from-primary via-violet-glow",
          )}
        />
      </div>
      {end ? <div className="shrink-0">{end}</div> : null}
    </div>
  );
}
