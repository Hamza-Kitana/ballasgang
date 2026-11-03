import { useEffect, useMemo, useRef, useState } from "react";
import { loc, type GangMember } from "@/data/gang";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";
import { StreamPlatformBadge } from "@/components/ballas/StreamPlatformBadge";
import { detectStreamPlatform, getStreamEmbedUrl } from "@/lib/streamEmbed";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

type LiveCardProps = {
  member: GangMember;
  index?: number;
};

export function LiveCard({ member, index = 0 }: LiveCardProps) {
  const { t, locale } = useLanguage();
  const viewers = 120 + member.stats.respect * 7 + index * 41;
  const thumb = member.liveImage ?? member.image;
  const [preview, setPreview] = useState(false);
  const [pinned, setPinned] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const parentHost =
    typeof window !== "undefined" ? window.location.hostname || "localhost" : "localhost";
  const platform = useMemo(() => detectStreamPlatform(member.streamUrl), [member.streamUrl]);
  const platformLabel = t.live.platforms[platform];
  const embedUrl = useMemo(
    () => getStreamEmbedUrl(member.streamUrl, parentHost),
    [member.streamUrl, parentHost],
  );

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const openPreview = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setPreview(true);
  };

  const scheduleClose = () => {
    if (pinned) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPreview(false), 220);
  };

  const togglePin = () => {
    setPinned((p) => {
      const next = !p;
      setPreview(true);
      return next;
    });
  };

  return (
    <article
      className={cn(
        "ballas-live-card group relative overflow-hidden rounded-[1.2rem]",
        "transition duration-300 hover:-translate-y-1 hover:border-red-400/55",
        preview && "z-20 border-red-400/60 shadow-[0_18px_44px_rgba(0,0,0,0.5),0_0_28px_oklch(0.55_0.22_25/0.3)]",
      )}
      onMouseEnter={openPreview}
      onMouseLeave={scheduleClose}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={thumb}
          alt={member.name}
          className={cn(
            "h-full w-full object-cover transition duration-500",
            preview ? "scale-105 blur-[1px]" : "group-hover:scale-[1.04]",
          )}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        <div className="absolute start-2.5 top-2.5 z-10 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[9px] font-black tracking-[0.14em] text-white shadow-[0_0_14px_oklch(0.55_0.22_25/0.45)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
          <StreamPlatformBadge platform={platform} label={platformLabel} />
          <span className="rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[9px] tracking-[0.1em] text-white backdrop-blur-sm">
            {viewers.toLocaleString()}
          </span>
        </div>

        {!preview ? (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-red-500/90 text-base text-white shadow-[0_0_20px_oklch(0.55_0.22_25/0.45)] transition group-hover:scale-110">
              ▶
            </div>
          </div>
        ) : null}

        {/* In-card stream window (hover) */}
        {preview ? (
          <div
            className="ballas-live-preview absolute inset-2 z-20 overflow-hidden rounded-xl border border-white/20 bg-black/90 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
            onMouseEnter={openPreview}
            onMouseLeave={scheduleClose}
          >
            {embedUrl ? (
              <iframe
                title={`${member.name} live`}
                src={embedUrl}
                className="h-full w-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative flex h-full flex-col items-center justify-center gap-2 bg-[oklch(0.12_0.05_305)] p-3 text-center">
                <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
                <div className="relative z-10">
                  <p className="text-[10px] tracking-[0.2em] text-red-200 uppercase">{t.live.previewTitle}</p>
                  <p className="mt-1 text-sm font-bold text-white">{member.name}</p>
                  <p className="mt-1 max-w-[14rem] text-[11px] text-white/65">{t.live.previewBody}</p>
                </div>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-t from-black/90 to-transparent px-2.5 py-2">
              <button
                type="button"
                onClick={togglePin}
                className="rounded-full border border-white/25 bg-black/55 px-2.5 py-1 text-[9px] tracking-[0.12em] text-white backdrop-blur-sm"
              >
                {pinned ? t.live.unpin : t.live.pin}
              </button>
              {member.streamUrl ? (
                <a
                  href={member.streamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.12em]",
                    platform === "youtube" && "bg-[#ff0033] text-white",
                    platform === "kick" && "bg-[#53fc18] text-[#052e16]",
                    platform === "tiktok" && "bg-gradient-to-r from-[#25f4ee]/90 to-[#fe2c55] text-white",
                    platform === "twitch" && "bg-[#9146ff] text-white",
                    platform === "unknown" && "bg-red-500 text-white",
                  )}
                >
                  {platformLabel}
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>

      <div className="ballas-live-body relative flex items-center gap-3 p-3">
        <MemberPortrait member={member} size="sm" className="ring-1 ring-white/20" />
        <div className="min-w-0 flex-1 text-start">
          <p className="text-[9px] font-semibold tracking-[0.16em] text-red-200/90 uppercase">
            {t.ranks[member.rank]}
          </p>
          <div className="mt-1 flex min-w-0 items-center gap-1.5">
            <h3 className="font-display truncate text-xl leading-none tracking-[0.04em] text-white">
              {member.name}
            </h3>
            <span
              className="ballas-verified-badge inline-flex shrink-0 items-center justify-center"
              title={t.live.verified}
              aria-label={t.live.verified}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <circle cx="12" cy="12" r="11" fill="currentColor" className="text-primary" />
                <path
                  d="M7.2 12.2 10.1 15l6.7-6.7"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-white/65">
            “{member.alias}” · {loc(member.role, locale)}
          </p>
        </div>
        <StreamPlatformBadge platform={platform} label={platformLabel} size="lg" className="shrink-0" />
      </div>
    </article>
  );
}
