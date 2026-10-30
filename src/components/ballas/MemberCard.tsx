import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { loc, type GangMember } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type MemberCardProps = {
  member: GangMember;
  index?: number;
  featured?: boolean;
};

export function MemberCard({ member, index = 0, featured = false }: MemberCardProps) {
  const { t, locale } = useLanguage();

  return (
    <Link
      to="/members/$id"
      params={{ id: member.id }}
      viewTransition
      className={cn(
        "ballas-member-card group relative block overflow-hidden rounded-2xl outline-none",
        "ballas-rise transition duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-primary",
        featured && "ballas-member-card-featured",
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
          "relative overflow-hidden",
          featured ? "aspect-[16/11] sm:aspect-[5/4] lg:aspect-[16/10]" : "aspect-[4/5]",
        )}
      >
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        <div className="ballas-member-glow absolute inset-x-0 bottom-0 h-3/5 opacity-60 transition duration-500 group-hover:opacity-90" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white ring-1 ring-white/25 shadow-[0_0_16px_rgba(0,0,0,0.45)]"
            style={{ background: member.accent }}
          >
            {t.ranks[member.rank]}
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] ring-1 ring-white/20 shadow-[0_0_16px_rgba(0,0,0,0.45)]",
              member.status === "live" && "bg-red-500 text-white",
              member.status === "online" && "bg-emerald-500 text-white",
              member.status === "offline" && "bg-black/85 text-white/90",
            )}
          >
            {member.status === "live" ? (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            ) : null}
            {t.status[member.status]}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-4">
          <p className="text-[10px] font-semibold tracking-[0.2em] text-white/90">
            {loc(member.role, locale)}
          </p>
          <h3
            className={cn(
              "font-display mt-1 leading-none tracking-[0.04em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)]",
              featured
                ? "text-[clamp(2.4rem,5vw,3.4rem)]"
                : "text-[clamp(2rem,4vw,2.9rem)]",
            )}
          >
            {member.name}
          </h3>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/30 pt-3">
            <p className="text-sm font-medium text-white">“{member.alias}”</p>
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.14em] text-white/85">
              <span className="font-bold text-violet-soft">{member.stats.respect}</span>
              <span className="rounded-full bg-white/25 px-2.5 py-1 transition group-hover:bg-primary group-hover:text-white rtl:rotate-180">
                →
              </span>
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${member.stats.respect}%`,
                background: `linear-gradient(90deg, ${member.accent}, oklch(0.85 0.14 310))`,
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
