import { Link } from "@tanstack/react-router";
import { loc, type GangMember } from "@/data/gang";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { StatusBadge } from "@/components/ballas/StatusBadge";
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
      className={cn(
        "group relative flex min-h-[220px] flex-col overflow-hidden rounded-sm border border-white/10 bg-black/55 p-4 transition duration-200 hover:-translate-y-1 hover:border-primary/55 sm:min-h-[280px]",
      )}
      style={{
        animationDelay: `${Math.min(index, 6) * 40}ms`,
        boxShadow: `inset 0 1px 0 ${member.accent}22`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${member.accent}40, transparent 55%)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span
          className="border px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em]"
          style={{
            borderColor: `${member.accent}66`,
            color: member.accent,
            background: `${member.accent}18`,
          }}
        >
          {t.ranks[member.rank]}
        </span>
        <StatusBadge status={member.status} />
      </div>

      <div className="relative z-10 mt-5 flex flex-1 flex-col items-center justify-center text-center">
        <MemberPortrait member={member} size="lg" />
        <h3 className="mt-5 text-2xl font-bold tracking-wide text-white">{member.name}</h3>
        <p className="mt-1 text-sm text-violet-soft/90">“{member.alias}”</p>
        <p className="mt-2 max-w-[90%] text-xs leading-relaxed text-muted-foreground">
          {loc(member.role, locale)}
        </p>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {member.badges.slice(0, 2).map((badge) => (
            <span
              key={loc(badge, "en")}
              className="border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] tracking-[0.12em] text-foreground/70"
            >
              {loc(badge, locale)}
            </span>
          ))}
        </div>
        <span className="text-sm tracking-[0.2em] text-primary/70 rtl:rotate-180">→</span>
      </div>
    </Link>
  );
}
