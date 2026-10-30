import type { GangMember } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: GangMember["status"] }) {
  const { t } = useLanguage();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium tracking-[0.14em]",
        status === "live" && "border-red-400/50 bg-red-500/25 text-red-100 shadow-[0_0_12px_rgba(239,68,68,0.35)]",
        status === "online" && "border-emerald-400/45 bg-emerald-500/15 text-emerald-200",
        status === "offline" && "border-white/15 bg-white/5 text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "live" && "animate-pulse bg-red-400",
          status === "online" && "bg-emerald-400",
          status === "offline" && "bg-zinc-500",
        )}
      />
      {t.status[status]}
    </span>
  );
}
