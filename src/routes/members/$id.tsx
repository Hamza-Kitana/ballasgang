import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Atmosphere } from "@/components/ballas/Atmosphere";
import { CursorGlow } from "@/components/ballas/CursorGlow";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { StatusBadge } from "@/components/ballas/StatusBadge";
import { CrownMark } from "@/components/ballas/CrownMark";
import { getMember, members } from "@/data/gang";

export const Route = createFileRoute("/members/$id")({
  loader: ({ params }) => {
    const member = getMember(params.id);
    if (!member) throw notFound();
    return { member };
  },
  component: MemberProfile,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.member.name} · Ballas Purple Dynasty`
          : "Member · Ballas Purple Dynasty",
      },
    ],
  }),
});

function MemberProfile() {
  const { member } = Route.useLoaderData();
  const others = members.filter((m) => m.id !== member.id).slice(0, 5);

  return (
    <div className="ballas-hide-native-cursor relative h-dvh w-full overflow-hidden bg-[oklch(0.08_0.04_305)] text-foreground">
      <Atmosphere />
      <CursorGlow />

      <div className="ballas-fade relative z-10 flex h-full flex-col px-4 py-5 sm:px-8 sm:py-7">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.28em] text-violet-soft uppercase transition hover:text-white"
          >
            <CrownMark className="h-5 w-5" />
            Back to Dynasty
          </Link>
          <StatusBadge status={member.status} />
        </div>

        <div className="panel-scroll mt-6 min-h-0 flex-1">
          <div className="ballas-rise mx-auto grid max-w-5xl gap-8 lg:grid-cols-[auto_1fr] lg:items-end">
            <MemberPortrait member={member} size="xl" />

            <div>
              <p className="font-display text-xs tracking-[0.42em] text-violet-soft">
                {member.rank.toUpperCase()}
              </p>
              <h1 className="ballas-glitch font-display mt-2 text-5xl tracking-[0.08em] text-glow sm:text-7xl">
                {member.name}
              </h1>
              <p className="mt-2 text-lg text-foreground/75">
                “{member.alias}” · {member.role}
              </p>
              <div className="ballas-line-draw mt-4 h-px w-36 bg-gradient-to-r from-primary to-transparent" />
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {member.bio}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {member.badges.map((badge) => (
                  <span
                    key={badge}
                    className="border border-primary/45 bg-primary/15 px-3 py-1 text-[10px] tracking-[0.24em] text-violet-soft uppercase"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="ballas-rise mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3">
            <Stat label="Reps" value={member.stats.reps} accent={member.accent} />
            <Stat label="Wars" value={member.stats.wars} accent={member.accent} />
            <Stat label="Respect" value={member.stats.respect} accent={member.accent} />
          </div>

          <div className="ballas-rise mx-auto mt-8 flex max-w-5xl flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-sm text-muted-foreground">
            <span className="tracking-[0.18em] uppercase">Joined {member.joined}</span>
            {member.status === "live" && member.streamUrl ? (
              <a
                href={member.streamUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-red-500 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase shadow-[0_0_20px_rgba(239,68,68,0.45)]"
              >
                Watch Live
              </a>
            ) : null}
          </div>

          <div className="ballas-rise mx-auto mt-10 max-w-5xl pb-4">
            <p className="font-display text-xs tracking-[0.35em] text-violet-soft">MORE FAMILY</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {others.map((other) => (
                <Link
                  key={other.id}
                  to="/members/$id"
                  params={{ id: other.id }}
                  className="border border-white/10 bg-black/35 px-3.5 py-2 text-sm tracking-wide backdrop-blur-md transition hover:border-primary/55 hover:bg-primary/10"
                >
                  {other.alias}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
      <p className="font-display text-4xl tracking-wider text-white sm:text-5xl">{value}</p>
      <p className="mt-1 text-[10px] tracking-[0.32em] text-muted-foreground uppercase">{label}</p>
      <div className="mt-3 h-1 overflow-hidden bg-white/10">
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${accent}, oklch(0.72 0.28 310))`,
          }}
        />
      </div>
    </div>
  );
}
