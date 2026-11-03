import { useEffect, useRef } from "react";
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
  const hoverTimer = useRef<number | null>(null);
  const opened = useRef(false);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const openStream = () => {
    if (!member.streamUrl || opened.current) return;
    opened.current = true;
    window.open(member.streamUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      opened.current = false;
    }, 2500);
  };

  const onHoverStart = () => {
    if (!member.streamUrl) return;
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      openStream();
    }, 650);
  };

  const onHoverEnd = () => {
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  return (
    <article
      className={cn(
        "ballas-live-card group relative overflow-hidden rounded-[1.45rem]",
        "transition duration-300 hover:-translate-y-1.5 hover:border-red-400/60",
        "hover:shadow-[0_22px_56px_rgba(0,0,0,0.55),0_0_32px_oklch(0.55_0.22_25/0.35)]",
        featured && "ballas-live-card-featured w-full",
      )}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
    >
      <button
        type="button"
        onClick={openStream}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`${t.live.watch} · ${member.name}`}
      />

      <div className={cn("relative overflow-hidden", featured ? "aspect-[21/9] min-h-[220px] sm:min-h-[280px]" : "aspect-video")}>
        <img
          src={thumb}
          alt={member.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
          loading={featured ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,oklch(0.05_0.04_305/0.5)_100%)]" />

        <div className="absolute start-3 top-3 z-20 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black tracking-[0.16em] text-white shadow-[0_0_18px_oklch(0.6_0.24_25/0.55)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
          <span className="rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white backdrop-blur-sm">
            {viewers.toLocaleString()} {locale === "ar" ? "مشاهد" : "viewers"}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-red-500 text-xl text-white opacity-90 shadow-[0_0_28px_oklch(0.55_0.22_25/0.55)] transition duration-300 group-hover:scale-125 group-hover:opacity-100 sm:h-16 sm:w-16 sm:text-2xl">
            ▶
          </div>
        </div>

        {/* Hover hint */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-[4.5rem] text-center opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/25 bg-black/70 px-3 py-1 text-[10px] tracking-[0.16em] text-white backdrop-blur-sm">
            {t.live.hoverOpen}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-3">
              <MemberPortrait
                member={member}
                size={featured ? "md" : "sm"}
                className="ring-2 ring-white/25"
              />
              <div className="min-w-0 text-start">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-red-200 uppercase">
                  {t.ranks[member.rank]} · ON AIR
                </p>
                <h3
                  className={cn(
                    "font-display leading-none tracking-[0.04em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]",
                    featured ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl",
                  )}
                >
                  {member.name}
                </h3>
                <p className="mt-1 truncate text-sm text-white/85">
                  “{member.alias}” · {loc(member.role, locale)}
                </p>
              </div>
            </div>

            <div className="relative z-30 flex flex-wrap gap-2">
              <Link
                to="/members/$id"
                params={{ id: member.id }}
                viewTransition
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={onHoverEnd}
                className="rounded-full border border-white/35 bg-black/65 px-3.5 py-2 text-[10px] tracking-[0.12em] text-white backdrop-blur-sm transition hover:border-primary"
              >
                {t.live.profile}
              </Link>
              {member.streamUrl ? (
                <a
                  href={member.streamUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={onHoverEnd}
                  className="rounded-full bg-red-500 px-4 py-2 text-[10px] font-black tracking-[0.14em] text-white shadow-[0_0_20px_oklch(0.55_0.22_25/0.45)] transition hover:bg-red-400"
                >
                  {t.live.watch}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
