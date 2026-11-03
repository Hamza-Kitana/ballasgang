import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { loc, type GangMember } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type MemberCardProps = {
  member: GangMember;
  index?: number;
  featured?: boolean;
  compact?: boolean;
};

export function MemberCard({
  member,
  index = 0,
  featured = false,
  compact = false,
}: MemberCardProps) {
  const { t, locale } = useLanguage();

  return (
    <Link
      to="/members/$id"
      params={{ id: member.id }}
      viewTransition
      className={cn(
        "ballas-member-card group relative block overflow-hidden outline-none",
        "ballas-rise transition duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-primary",
        featured ? "rounded-[1.5rem] ballas-member-card-featured" : "rounded-[1.15rem]",
        compact && "ballas-member-card-compact",
      )}
      style={
        {
          animationDelay: `${Math.min(index, 7) * 50}ms`,
          ["--accent" as string]: member.accent,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "flex h-full",
          featured ? "flex-col md:flex-row" : "flex-col",
        )}
      >
        <div
          className={cn(
            "relative shrink-0 overflow-hidden",
            featured && "aspect-[16/11] md:aspect-auto md:w-[48%] md:min-h-[280px] lg:min-h-[320px]",
            !featured && !compact && "aspect-[5/4]",
            compact && "aspect-[4/3]",
          )}
        >
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

          <div className={cn("absolute start-2.5 top-2.5 z-10 flex flex-wrap gap-1.5", featured && "start-3.5 top-3.5 gap-2")}>
            <span
              className={cn(
                "rounded-full font-bold tracking-[0.12em] text-white shadow-lg",
                featured ? "px-3.5 py-1.5 text-[11px]" : compact ? "px-2 py-0.5 text-[8px]" : "px-3 py-1 text-[10px]",
              )}
              style={{ background: member.accent }}
            >
              {t.ranks[member.rank]}
            </span>
          </div>

          <span
            className={cn(
              "absolute end-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full font-semibold tracking-[0.1em] text-white shadow-lg",
              featured ? "end-3.5 top-3.5 gap-1.5 px-3 py-1.5 text-[11px]" : compact ? "px-1.5 py-0.5 text-[8px]" : "px-2.5 py-1 text-[10px]",
              member.status === "live" && "bg-red-500",
              member.status === "online" && "bg-emerald-500",
              member.status === "offline" && "bg-zinc-700/95",
            )}
          >
            {member.status === "live" ? (
              <span className={cn("animate-pulse rounded-full bg-white", compact ? "h-1 w-1" : "h-1.5 w-1.5")} />
            ) : null}
            {t.status[member.status]}
          </span>
        </div>

        <div
          className={cn(
            "ballas-member-body relative flex min-w-0 flex-1 flex-col justify-between",
            featured ? "gap-4 p-5 sm:p-6 md:p-7" : compact ? "gap-2 p-2.5 sm:p-3" : "gap-2.5 p-3.5 sm:p-5",
          )}
        >
          <div className="text-start">
            <p
              className={cn(
                "font-semibold text-violet-soft uppercase",
                featured
                  ? "text-[11px] tracking-[0.22em]"
                  : compact
                    ? "text-[8px] tracking-[0.14em]"
                    : "text-[9px] tracking-[0.18em] sm:text-[10px]",
              )}
            >
              {loc(member.role, locale)}
            </p>
            <h3
              className={cn(
                "font-display mt-1 leading-none tracking-[0.04em] text-white",
                featured && "text-[clamp(2.35rem,6vw,3.6rem)]",
                !featured && !compact && "text-[clamp(1.55rem,7vw,2.4rem)]",
                compact && "text-[clamp(1.05rem,3.8vw,1.45rem)]",
              )}
            >
              {member.name}
            </h3>
            <p
              className={cn(
                "text-white/85",
                featured ? "mt-2.5 text-base sm:text-lg" : compact ? "mt-1 text-[11px] leading-snug" : "mt-1.5 text-[13px] sm:text-sm",
              )}
            >
              “{member.alias}”
            </p>
          </div>

          <div>
            <div
              className={cn(
                "mb-1.5 flex items-center justify-between gap-2 tracking-[0.12em]",
                featured ? "mb-2 text-[11px]" : compact ? "text-[8px]" : "text-[10px]",
              )}
            >
              <span className="text-white/55 uppercase">{t.profile.respect}</span>
              <span className="font-bold text-violet-soft">{member.stats.respect}</span>
            </div>
            <div className={cn("overflow-hidden rounded-full bg-white/15", featured ? "h-2" : compact ? "h-1" : "h-1.5")}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${member.stats.respect}%`,
                  background: `linear-gradient(90deg, ${member.accent}, oklch(0.82 0.14 310))`,
                }}
              />
            </div>

            <div
              className={cn(
                "flex items-center justify-between border-t border-white/15",
                featured ? "mt-4 pt-4" : compact ? "mt-2 pt-2" : "mt-3 pt-3",
              )}
            >
              <span
                className={cn(
                  "tracking-[0.12em] text-white/50",
                  featured ? "text-[11px]" : compact ? "text-[8px]" : "text-[10px]",
                )}
              >
                {member.stats.reps} {locale === "ar" ? "سمعة" : "reps"} · {member.stats.wars}{" "}
                {locale === "ar" ? "حروب" : "wars"}
              </span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full bg-primary/25 font-semibold tracking-[0.1em] text-violet-soft transition group-hover:bg-primary group-hover:text-white",
                  featured ? "gap-1.5 px-3.5 py-1.5 text-[11px]" : compact ? "gap-1 px-2 py-0.5 text-[8px]" : "gap-1.5 px-3 py-1 text-[10px]",
                )}
              >
                {locale === "ar" ? "الملف" : "Profile"}
                <span className="rtl:rotate-180">→</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
