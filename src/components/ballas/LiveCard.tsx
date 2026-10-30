import { Link } from "@tanstack/react-router";
import { loc, type GangMember } from "@/data/gang";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { useLanguage } from "@/i18n/LanguageProvider";

type LiveCardProps = {
  member: GangMember;
  featured?: boolean;
  index?: number;
};

export function LiveCard({ member, featured = false, index = 0 }: LiveCardProps) {
  const { t, locale } = useLanguage();
  const viewers = 120 + member.stats.respect * 7 + index * 41;

  if (featured) {
    return (
      <div className="relative min-h-[220px] overflow-hidden border border-red-400/35 bg-black/55 sm:min-h-[260px]">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 20% 20%, ${member.accent}40, transparent 45%), radial-gradient(ellipse at 80% 80%, rgba(239,68,68,0.28), transparent 50%)`,
          }}
        />

        <div className="absolute start-4 top-4 z-10 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {t.status.live}
          </span>
          <span className="border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] tracking-[0.14em] text-foreground/80">
            {viewers.toLocaleString()} {locale === "ar" ? "مشاهد" : "viewers"}
          </span>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div className="flex items-end gap-4">
            <MemberPortrait member={member} size="lg" />
            <div>
              <p className="text-xs tracking-[0.22em] text-red-200/80">{t.ranks[member.rank]}</p>
              <h3 className="mt-1 text-4xl font-bold tracking-wide sm:text-5xl">{member.name}</h3>
              <p className="mt-1 text-sm text-violet-soft">
                “{member.alias}” · {loc(member.role, locale)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/members/$id"
              params={{ id: member.id }}
              className="border border-white/20 bg-black/50 px-4 py-2.5 text-[11px] tracking-[0.14em] transition hover:border-primary hover:bg-primary/20"
            >
              {t.live.profile}
            </Link>
            {member.streamUrl ? (
              <a
                href={member.streamUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-red-500 px-5 py-2.5 text-[11px] font-bold tracking-[0.16em] text-white transition hover:bg-red-400"
              >
                {t.live.watch}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex min-h-[200px] flex-col overflow-hidden border border-red-400/25 bg-black/55 p-4 transition duration-200 hover:-translate-y-1 hover:border-red-400/55">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(239,68,68,0.22), transparent 55%)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {t.status.live}
        </span>
        <span className="text-[10px] tracking-[0.14em] text-red-200/70">
          {viewers.toLocaleString()} {locale === "ar" ? "مشاهد" : "viewers"}
        </span>
      </div>

      <div className="relative z-10 mt-5 flex flex-1 flex-col items-center text-center">
        <MemberPortrait member={member} size="md" />
        <h3 className="mt-4 text-2xl font-bold tracking-wide">{member.alias}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{loc(member.role, locale)}</p>
      </div>

      <div className="relative z-10 mt-4 flex gap-2">
        <Link
          to="/members/$id"
          params={{ id: member.id }}
          className="flex-1 border border-white/15 py-2 text-center text-[11px] tracking-[0.12em] transition hover:border-primary hover:bg-primary/15"
        >
          {t.live.profile}
        </Link>
        {member.streamUrl ? (
          <a
            href={member.streamUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-red-500 py-2 text-center text-[11px] font-bold tracking-[0.12em] text-white transition hover:bg-red-400"
          >
            {t.live.watch}
          </a>
        ) : null}
      </div>
    </div>
  );
}
