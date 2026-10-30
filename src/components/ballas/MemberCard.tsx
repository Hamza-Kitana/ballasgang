import { Link } from "@tanstack/react-router";
import { loc, type GangMember } from "@/data/gang";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type MemberCardProps = {
  member: GangMember;
  index?: number;
};

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  const { t, locale } = useLanguage();

  return (
    <Link
      to="/members/$id"
      params={{ id: member.id }}
      viewTransition
      className={cn(
        "ballas-wanted ballas-rise group relative block aspect-[3/4] overflow-hidden outline-none",
        "transition duration-500 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-primary",
      )}
      style={{
        animationDelay: `${Math.min(index, 7) * 70}ms`,
        ["--member-accent" as string]: member.accent,
      }}
    >
      <div className="absolute inset-[3px] overflow-hidden bg-black">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,0.55)_58%,rgba(0,0,0,0.96)_100%)]" />
        <div
          className="absolute inset-0 opacity-0 mix-blend-color transition duration-500 group-hover:opacity-45"
          style={{ background: member.accent }}
        />
        <div className="ballas-scanlines pointer-events-none absolute inset-0 opacity-25" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">
          <span
            className="border px-2 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase"
            style={{
              borderColor: `${member.accent}aa`,
              background: `linear-gradient(135deg, ${member.accent}99, ${member.accent}44)`,
              boxShadow: `0 0 18px ${member.accent}55`,
            }}
          >
            {t.ranks[member.rank]}
          </span>

          <span
            className={cn(
              "inline-flex items-center gap-1.5 border px-2 py-1 text-[9px] font-semibold tracking-[0.16em]",
              member.status === "live" &&
                "border-red-400/60 bg-red-500 text-white shadow-[0_0_16px_rgba(239,68,68,0.55)]",
              member.status === "online" &&
                "border-emerald-400/50 bg-emerald-500/25 text-emerald-100",
              member.status === "offline" && "border-white/20 bg-black/55 text-white/65",
            )}
          >
            {member.status === "live" ? (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            ) : (
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  member.status === "online" ? "bg-emerald-300" : "bg-zinc-500",
                )}
              />
            )}
            {t.status[member.status]}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-4">
          <p className="text-[10px] tracking-[0.28em] text-violet-soft/90 uppercase">
            {loc(member.role, locale)}
          </p>
          <h3 className="font-display mt-1 text-[clamp(1.85rem,4vw,2.75rem)] leading-[0.9] tracking-[0.04em] text-white">
            {member.name}
          </h3>
          <p className="mt-1 text-sm text-white/70">“{member.alias}”</p>

          <div className="mt-3 flex items-end justify-between gap-2 border-t border-white/15 pt-3">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {member.badges.slice(0, 2).map((badge) => (
                <span
                  key={loc(badge, "en")}
                  className="border border-white/15 bg-white/5 px-2 py-0.5 text-[9px] tracking-[0.14em] text-white/75"
                >
                  {loc(badge, locale)}
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2 text-[10px] tracking-[0.14em] text-white/55">
              <span>{member.stats.respect}</span>
              <span className="text-primary transition group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
