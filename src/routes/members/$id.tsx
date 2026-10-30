import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Atmosphere } from "@/components/ballas/Atmosphere";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { StatusBadge } from "@/components/ballas/StatusBadge";
import { CrownMark } from "@/components/ballas/CrownMark";
import { LanguageToggle } from "@/components/ballas/LanguageToggle";
import { getMember, loc, members } from "@/data/gang";
import { fill, useLanguage } from "@/i18n/LanguageProvider";

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
  const { t, locale } = useLanguage();
  const others = members.filter((m) => m.id !== member.id).slice(0, 5);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[oklch(0.08_0.04_305)] text-foreground">
      <Atmosphere />

      <div className="relative z-10 flex h-full flex-col px-4 py-5 sm:px-8 sm:py-7">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.16em] text-violet-soft transition hover:text-white"
          >
            <CrownMark className="h-5 w-5" />
            {t.profile.back}
          </Link>
          <div className="flex items-center gap-2">
            <StatusBadge status={member.status} />
            <LanguageToggle />
          </div>
        </div>

        <div className="panel-scroll mt-6 min-h-0 flex-1">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[auto_1fr] lg:items-end">
            <MemberPortrait member={member} size="xl" />

            <div>
              <p className="text-xs tracking-[0.28em] text-violet-soft">{t.ranks[member.rank]}</p>
              <h1 className="mt-2 text-5xl font-bold tracking-[0.04em] text-glow sm:text-7xl">
                {member.name}
              </h1>
              <p className="mt-2 text-lg text-foreground/75">
                “{member.alias}” · {loc(member.role, locale)}
              </p>
              <div className="ballas-line-draw mt-4 h-px w-36 bg-gradient-to-r from-primary to-transparent" />
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {loc(member.bio, locale)}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {member.badges.map((badge) => (
                  <span
                    key={loc(badge, "en")}
                    className="border border-primary/45 bg-primary/15 px-3 py-1 text-[10px] tracking-[0.14em] text-violet-soft"
                  >
                    {loc(badge, locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-3">
            <Stat label={t.profile.reps} value={member.stats.reps} accent={member.accent} />
            <Stat label={t.profile.wars} value={member.stats.wars} accent={member.accent} />
            <Stat label={t.profile.respect} value={member.stats.respect} accent={member.accent} />
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-sm text-muted-foreground">
            <span className="tracking-[0.12em]">{fill(t.profile.joined, { year: member.joined })}</span>
            {member.status === "live" && member.streamUrl ? (
              <a
                href={member.streamUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-red-500 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white shadow-[0_0_20px_rgba(239,68,68,0.45)]"
              >
                {t.profile.watchLive}
              </a>
            ) : null}
          </div>

          <div className="mx-auto mt-10 max-w-5xl pb-4">
            <p className="text-xs tracking-[0.22em] text-violet-soft">{t.profile.moreFamily}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {others.map((other) => (
                <Link
                  key={other.id}
                  to="/members/$id"
                  params={{ id: other.id }}
                  className="border border-white/10 bg-black/50 px-3.5 py-2 text-sm tracking-wide transition hover:border-primary/55 hover:bg-primary/10"
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
    <div className="border border-white/10 bg-black/55 p-4">
      <p className="font-display text-4xl tracking-wider text-white sm:text-5xl">{value}</p>
      <p className="mt-1 text-[10px] tracking-[0.18em] text-muted-foreground">{label}</p>
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
