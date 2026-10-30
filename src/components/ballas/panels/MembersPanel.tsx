import { Link } from "@tanstack/react-router";
import { members } from "@/data/gang";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { StatusBadge } from "@/components/ballas/StatusBadge";

export function MembersPanel() {
  return (
    <div className="ballas-rise flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="font-display text-xs tracking-[0.42em] text-violet-soft">THE FAMILY</p>
        <h2 className="font-display mt-1 text-4xl tracking-[0.14em] sm:text-6xl">MEMBERS</h2>
        <div className="ballas-line-draw mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll grid min-h-0 flex-1 content-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member, index) => (
          <Link
            key={member.id}
            to="/members/$id"
            params={{ id: member.id }}
            className="ballas-rise group relative flex items-center gap-4 overflow-hidden border border-white/10 bg-black/30 p-3.5 backdrop-blur-xl transition duration-300 hover:border-primary/60 hover:bg-primary/10"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 0% 50%, ${member.accent}33, transparent 55%)`,
              }}
            />
            <MemberPortrait member={member} size="sm" />
            <div className="relative z-10 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display truncate text-xl tracking-wider sm:text-2xl">
                  {member.name}
                </p>
                <StatusBadge status={member.status} />
              </div>
              <p className="truncate text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                {member.rank} · {member.role}
              </p>
            </div>
            <span className="font-display relative z-10 text-xl text-primary/60 transition duration-300 group-hover:translate-x-1 group-hover:text-violet-soft">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
