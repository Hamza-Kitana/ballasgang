import type { GangMember } from "@/data/gang";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: GangMember["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.22em] uppercase",
        status === "live" && "border-red-400/45 bg-red-500/20 text-red-200",
        status === "online" && "border-emerald-400/45 bg-emerald-500/15 text-emerald-200",
        status === "offline" && "border-white/15 bg-white/5 text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "live" && "ballas-live-dot bg-red-400",
          status === "online" && "bg-emerald-400",
          status === "offline" && "bg-zinc-500",
        )}
      />
      {status}
    </span>
  );
}
