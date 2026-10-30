import { Link } from "@tanstack/react-router";
import { loc, type GangMember } from "@/data/gang";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type LiveCardProps = {
  member: GangMember;
  featured?: boolean;
  index?: number;
};

export function LiveCard({ member, featured = false, index = 0 }: LiveCardProps) {
  const { t, locale } = useLanguage();
  const viewers = 120 + member.stats.respect * 7 + index * 41;
  const thumb = member.liveImage ?? member.image;

  if (featured) {
    return (
      <div className="group relative mx-auto w-full max-w-3xl overflow-hidden rounded-[1.75rem] border-[1.5px] border-red-400/55 bg-black/70 shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_40px_oklch(0.55_0.22_25/0.28)]">
        <div className="pointer-events-none absolute -inset-px rounded-[1.75rem] bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.55_0.22_25/0.35),transparent_55%)] opacity-70" />
        <div className="relative h-[210px] overflow-hidden sm:h-[250px]">
          <img
            src={thumb}
            alt={member.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.05_0.04_305/0.45)_100%)]" />

          <div className="absolute start-3 top-3 z-10 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black tracking-[0.16em] text-white shadow-[0_0_18px_oklch(0.6_0.24_25/0.55)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              LIVE
            </span>
            <span className="rounded-full border border-white/15 bg-black/65 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/90 backdrop-blur-sm">
              {viewers.toLocaleString()} {locale === "ar" ? "مشاهد" : "viewers"}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-red-500/90 text-xl text-white shadow-[0_0_28px_oklch(0.55_0.22_25/0.55)] transition duration-500 group-hover:scale-110">
              ▶
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-2.5">
              <MemberPortrait member={member} size="sm" />
              <div className="text-start">
                <p className="text-[9px] tracking-[0.18em] text-red-200 uppercase">
                  {t.ranks[member.rank]} · ON AIR
                </p>
                <h3 className="font-display text-2xl leading-none tracking-[0.04em] text-white sm:text-3xl">
                  {member.name}
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/members/$id"
                params={{ id: member.id }}
                viewTransition
                className="rounded-full border border-white/30 bg-black/55 px-3.5 py-2 text-[10px] tracking-[0.12em] backdrop-blur-sm transition hover:border-primary"
              >
                {t.live.profile}
              </Link>
              {member.streamUrl ? (
                <a
                  href={member.streamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-red-500 px-4 py-2 text-[10px] font-black tracking-[0.14em] text-white shadow-[0_0_20px_oklch(0.55_0.22_25/0.4)] transition hover:bg-red-400"
                >
                  {t.live.watch}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "ballas-live-card group relative overflow-hidden rounded-[1.35rem]",
        "transition duration-300 hover:-translate-y-1.5 hover:border-red-400/55",
        "hover:shadow-[0_20px_48px_rgba(0,0,0,0.5),0_0_24px_oklch(0.55_0.22_25/0.28)]",
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumb}
          alt={member.alias}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <div className="absolute start-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-black tracking-[0.16em] text-white shadow-[0_0_14px_oklch(0.55_0.22_25/0.45)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          LIVE
        </div>
        <div className="absolute end-3 top-3 z-10 rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 text-[10px] text-white/85 backdrop-blur-sm">
          {viewers.toLocaleString()}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/90 text-lg text-white transition duration-300 group-hover:scale-110">
            ▶
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-3.5">
        <div className="flex items-center gap-3">
          <MemberPortrait member={member} size="sm" />
          <div>
            <h3 className="font-display text-2xl tracking-[0.05em] text-white">{member.alias}</h3>
            <p className="text-xs text-white/75">{loc(member.role, locale)}</p>
          </div>
        </div>
        {member.streamUrl ? (
          <a
            href={member.streamUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-red-500 px-3.5 py-2 text-[10px] font-black tracking-[0.12em] text-white transition hover:bg-red-400"
          >
            {t.live.watch}
          </a>
        ) : null}
      </div>
    </div>
  );
}
