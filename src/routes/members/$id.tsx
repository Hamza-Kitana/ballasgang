import type { CSSProperties } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ProfileAtmosphere } from "@/components/ballas/ProfileAtmosphere";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { StatusBadge } from "@/components/ballas/StatusBadge";
import { BallasLogo } from "@/components/ballas/BallasLogo";
import { LanguageToggle } from "@/components/ballas/LanguageToggle";
import { getMember, loc, members, type GangMember } from "@/data/gang";
import { fill, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

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
  const others = members.filter((m) => m.id !== member.id).slice(0, 6);
  const hero = member.liveImage ?? member.image;

  return (
    <div
      className="relative h-dvh w-full overflow-hidden bg-[oklch(0.08_0.04_305)] text-foreground"
      style={{ ["--accent" as string]: member.accent } as CSSProperties}
    >
      <ProfileAtmosphere src={member.bgVideo} accent={member.accent} />

      <div className="relative z-10 flex h-full flex-col">
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 px-4 py-4 sm:px-8 sm:py-5">
          <Link
            to="/"
            viewTransition
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-xs tracking-[0.14em] text-violet-soft backdrop-blur-md transition hover:border-primary/45 hover:text-white"
          >
            <BallasLogo showWordmark={false} size="sm" markClassName="!h-7 !w-auto" />
            {t.profile.back}
          </Link>
          <div className="flex items-center gap-2">
            <StatusBadge status={member.status} />
            <LanguageToggle />
          </div>
        </header>

        <div className="panel-scroll panel-enter-next min-h-0 flex-1">
          {/* Full-bleed hero — edge to edge */}
          <section className="relative w-full min-h-[62vh] sm:min-h-[68vh]">
            <img
              src={hero}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover object-[center_22%]"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.04_305)] via-[oklch(0.08_0.04_305/0.55)] to-black/25" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(ellipse at 70% 30%, ${member.accent}55, transparent 55%)`,
              }}
            />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 pt-24 sm:px-8 sm:pb-10 lg:px-12">
              <div className="ballas-rise flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-end">
                  <MemberPortrait
                    member={member}
                    size="xl"
                    className="ballas-logo-float ring-4 ring-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                  />
                  <div className="min-w-0 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-white"
                        style={{ background: member.accent }}
                      >
                        {t.ranks[member.rank]}
                      </span>
                      <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] tracking-[0.16em] text-white/80 backdrop-blur-sm">
                        GTA V · FiveM
                      </span>
                      {member.status === "live" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black tracking-[0.16em] text-white shadow-[0_0_20px_oklch(0.55_0.22_25/0.45)]">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                          LIVE
                        </span>
                      ) : null}
                    </div>

                    <h1 className="font-display mt-3 text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.88] tracking-[0.04em] text-glow">
                      {member.name}
                    </h1>
                    <p className="mt-3 text-base text-white/80 sm:text-lg">
                      “{member.alias}” · {loc(member.role, locale)}
                    </p>
                    <div
                      className="ballas-line-draw mt-4 h-px w-40 max-w-full"
                      style={{
                        background: `linear-gradient(90deg, ${member.accent}, transparent)`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-3 lg:justify-end">
                  <span className="rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs tracking-[0.14em] text-white/70 backdrop-blur-sm">
                    {fill(t.profile.joined, { year: member.joined })}
                  </span>
                  {member.status === "live" && member.streamUrl ? (
                    <a
                      href={member.streamUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-red-500 px-5 py-2.5 text-[11px] font-black tracking-[0.14em] text-white shadow-[0_0_28px_oklch(0.55_0.22_25/0.4)] transition hover:bg-red-400"
                    >
                      {t.profile.watchLive}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </section>

          {/* Soft body — full width edge to edge */}
          <section className="relative w-full px-4 pb-10 sm:px-8 lg:px-12">
            <p
              className="ballas-rise max-w-4xl text-base leading-relaxed text-white/75 sm:text-lg"
              style={{ animationDelay: "80ms" }}
            >
              {loc(member.bio, locale)}
            </p>

            <div
              className="ballas-rise mt-5 flex flex-wrap gap-2"
              style={{ animationDelay: "120ms" }}
            >
              {member.badges.map((badge) => (
                <span
                  key={loc(badge, "en")}
                  className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] tracking-[0.14em] text-violet-soft backdrop-blur-sm"
                  style={{
                    borderColor: `${member.accent}55`,
                    background: `${member.accent}18`,
                  }}
                >
                  {loc(badge, locale)}
                </span>
              ))}
            </div>

            <div
              className="ballas-rise mt-8 grid w-full gap-3 sm:grid-cols-3"
              style={{ animationDelay: "160ms" }}
            >
              <Stat label={t.profile.reps} value={member.stats.reps} accent={member.accent} />
              <Stat label={t.profile.wars} value={member.stats.wars} accent={member.accent} />
              <Stat label={t.profile.respect} value={member.stats.respect} accent={member.accent} />
            </div>
          </section>

          {/* Crew strip — full bleed horizontal */}
          <section className="relative w-full border-t border-white/10 bg-gradient-to-b from-black/25 to-transparent pb-8 pt-6">
            <div className="mb-4 flex items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
              <p className="text-xs tracking-[0.24em] text-violet-soft">{t.profile.moreFamily}</p>
            </div>
            <div className="flex w-full gap-3 overflow-x-auto px-4 pb-2 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {others.map((other, index) => (
                <CrewChip key={other.id} member={other} index={index} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="ballas-profile-stat rounded-2xl border border-white/25 bg-[oklch(0.16_0.07_305)] px-5 py-5">
      <div className="flex items-end justify-between gap-3">
        <p className="font-display text-5xl leading-none tracking-wider text-white sm:text-6xl">
          {value}
        </p>
        <p className="pb-1 text-[10px] tracking-[0.18em] text-white/55">{label}</p>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${accent}, oklch(0.82 0.14 310))`,
            boxShadow: `0 0 16px ${accent}88`,
          }}
        />
      </div>
    </div>
  );
}

function CrewChip({ member, index }: { member: GangMember; index: number }) {
  return (
    <Link
      to="/members/$id"
      params={{ id: member.id }}
      viewTransition
      className={cn(
        "ballas-rise group flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border border-white/25 bg-[oklch(0.16_0.07_305)] p-2.5 pe-4",
        "transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-[oklch(0.2_0.09_305)]",
      )}
      style={{ animationDelay: `${180 + index * 40}ms` }}
    >
      <MemberPortrait member={member} size="sm" />
      <div className="min-w-0 text-start">
        <p className="truncate font-display text-2xl tracking-[0.04em]">{member.alias}</p>
        <p className="truncate text-[10px] tracking-[0.14em] text-white/50">{member.name}</p>
      </div>
    </Link>
  );
}
