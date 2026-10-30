import { Link } from "@tanstack/react-router";
import { getLiveMembers, getOnlineMembers } from "@/data/gang";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";

export function LivePanel() {
  const live = getLiveMembers();
  const online = getOnlineMembers();

  return (
    <div className="ballas-rise flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="font-display text-xs tracking-[0.42em] text-red-300">ON THE STREETS</p>
        <h2 className="font-display mt-1 text-4xl tracking-[0.14em] sm:text-6xl">LIVE NOW</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {live.length} streaming · {online.length} online in the city
        </p>
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-3">
        {live.length === 0 ? (
          <p className="border border-white/10 bg-black/35 p-8 text-sm text-muted-foreground backdrop-blur-xl">
            No one is live right now. The night is quiet — for now.
          </p>
        ) : (
          live.map((member, index) => (
            <div
              key={member.id}
              className="ballas-rise relative overflow-hidden border border-red-400/30 bg-gradient-to-r from-red-950/50 via-black/45 to-violet-950/30 p-4 backdrop-blur-xl sm:flex sm:items-center sm:gap-5"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-red-400 to-primary" />
              <MemberPortrait member={member} size="md" />
              <div className="mt-4 min-w-0 flex-1 sm:mt-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-3xl tracking-wider">{member.alias}</p>
                  <span className="ballas-live-dot inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase shadow-[0_0_18px_rgba(239,68,68,0.65)]">
                    LIVE
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{member.role}</p>
              </div>
              <div className="mt-4 flex gap-2 sm:mt-0">
                <Link
                  to="/members/$id"
                  params={{ id: member.id }}
                  className="border border-white/20 px-3.5 py-2 text-[11px] tracking-[0.22em] uppercase transition hover:border-primary hover:bg-primary/20"
                >
                  Profile
                </Link>
                {member.streamUrl ? (
                  <a
                    href={member.streamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-red-500 px-3.5 py-2 text-[11px] font-semibold tracking-[0.22em] text-white uppercase shadow-[0_0_20px_rgba(239,68,68,0.45)] transition hover:bg-red-400"
                  >
                    Watch
                  </a>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
