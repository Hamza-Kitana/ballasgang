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
        "ballas-member-card group relative block overflow-hidden rounded-[1.35rem] outline-none",
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
          "flex h-full",
          featured ? "flex-col sm:flex-row" : "flex-col",
        )}
      >
        <div
          className={cn(
            "relative shrink-0 overflow-hidden",
            featured ? "aspect-[16/10] sm:aspect-auto sm:w-[42%] sm:min-h-[220px]" : "aspect-[5/4]",
          )}
        >
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />

          <div className="absolute start-3 top-3 z-10 flex flex-wrap gap-2">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white shadow-lg"
              style={{ background: member.accent }}
            >
              {t.ranks[member.rank]}
            </span>
          </div>

          <span
            className={cn(
              "absolute end-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-white shadow-lg",
              member.status === "live" && "bg-red-500",
              member.status === "online" && "bg-emerald-500",
              member.status === "offline" && "bg-zinc-700/95",
            )}
          >
            {member.status === "live" ? (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            ) : null}
            {t.status[member.status]}
          </span>
        </div>

        <div className="ballas-member-body relative flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
          <div className="text-start">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-violet-soft uppercase">
              {loc(member.role, locale)}
            </p>
            <h3
              className={cn(
                "font-display mt-1 leading-none tracking-[0.04em] text-white",
                featured ? "text-[clamp(2.2rem,4vw,3.2rem)]" : "text-[clamp(1.8rem,3.5vw,2.4rem)]",
              )}
            >
              {member.name}
            </h3>
            <p className="mt-2 text-sm text-white/85">“{member.alias}”</p>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2 text-[10px] tracking-[0.14em]">
              <span className="text-white/55 uppercase">{t.profile.respect}</span>
              <span className="font-bold text-violet-soft">{member.stats.respect}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${member.stats.respect}%`,
                  background: `linear-gradient(90deg, ${member.accent}, oklch(0.82 0.14 310))`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-3">
              <span className="text-[10px] tracking-[0.14em] text-white/50">
                {member.stats.reps} {locale === "ar" ? "سمعة" : "reps"} · {member.stats.wars}{" "}
                {locale === "ar" ? "حروب" : "wars"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/25 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-violet-soft transition group-hover:bg-primary group-hover:text-white">
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
