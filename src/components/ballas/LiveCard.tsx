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
      <div className="ballas-stream group relative mx-auto w-full max-w-3xl overflow-hidden">
        <div className="relative h-[190px] overflow-hidden sm:h-[220px]">
          <img
            src={thumb}
            alt={member.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(239,68,68,0.28),transparent_50%)]" />
          <div className="ballas-scanlines pointer-events-none absolute inset-0 opacity-25" />
          <div className="ballas-live-bezel pointer-events-none absolute inset-0" />

          <div className="absolute start-3 top-3 z-10 flex flex-wrap items-center gap-2">
            <span className="ballas-live-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/80" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              LIVE
            </span>
            <span className="border border-white/25 bg-black/60 px-2 py-1 text-[10px] tracking-[0.14em] text-white/90">
              {viewers.toLocaleString()} {locale === "ar" ? "مشاهد" : "viewers"}
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-red-500/85 text-lg text-white shadow-[0_0_28px_rgba(239,68,68,0.5)] transition duration-300 group-hover:scale-110">
              ▶
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-3 p-3.5 sm:flex-row sm:items-end sm:justify-between sm:p-4">
            <div className="flex items-end gap-2.5">
              <MemberPortrait member={member} size="sm" className="ring-2 ring-red-400/50" />
              <div>
                <p className="text-[9px] tracking-[0.2em] text-red-200/95 uppercase">
                  {t.ranks[member.rank]} · ON AIR
                </p>
                <h3 className="font-display text-2xl leading-none tracking-[0.04em] text-white sm:text-3xl">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-xs text-violet-soft">
                  “{member.alias}” · {loc(member.role, locale)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/members/$id"
                params={{ id: member.id }}
                viewTransition
                className="border border-white/30 bg-black/60 px-3 py-2 text-[10px] tracking-[0.14em] transition hover:border-primary hover:bg-primary/25"
              >
                {t.live.profile}
              </Link>
              {member.streamUrl ? (
                <a
                  href={member.streamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-500 px-3.5 py-2 text-[10px] font-black tracking-[0.16em] text-white shadow-[0_0_18px_rgba(239,68,68,0.4)] transition hover:bg-red-400"
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
        "ballas-stream group relative flex flex-col overflow-hidden transition duration-300",
        "hover:-translate-y-1",
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
        <div className="ballas-scanlines pointer-events-none absolute inset-0 opacity-25" />
        <div className="ballas-live-bezel pointer-events-none absolute inset-0" />

        <div className="absolute start-3 top-3 z-10 ballas-live-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black tracking-[0.18em] text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          LIVE
        </div>
        <div className="absolute end-3 top-3 z-10 border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] text-white/85">
          {viewers.toLocaleString()}
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/90 text-lg text-white shadow-[0_0_24px_rgba(239,68,68,0.5)] transition group-hover:scale-110">
            ▶
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col bg-gradient-to-b from-black/90 to-black/70 p-4">
        <div className="flex items-center gap-3">
          <MemberPortrait member={member} size="sm" />
          <div>
            <h3 className="font-display text-2xl tracking-[0.06em]">{member.alias}</h3>
            <p className="text-xs text-muted-foreground">{loc(member.role, locale)}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            to="/members/$id"
            params={{ id: member.id }}
            viewTransition
            className="flex-1 border border-white/15 py-2.5 text-center text-[11px] tracking-[0.12em] transition hover:border-primary hover:bg-primary/15"
          >
            {t.live.profile}
          </Link>
          {member.streamUrl ? (
            <a
              href={member.streamUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-red-500 py-2.5 text-center text-[11px] font-black tracking-[0.14em] text-white transition hover:bg-red-400"
            >
              {t.live.watch}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
