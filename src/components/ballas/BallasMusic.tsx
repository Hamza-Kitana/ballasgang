import { useEffect, useRef, useState } from "react";
import { useSiteData } from "@/data/SiteDataProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import { extractYoutubeId } from "@/lib/youtube";
import { cn } from "@/lib/utils";

/** Fallback Ballas street anthem */
export const BALLAS_TRACK_ID = "7j06hETnyzc";

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (n: number) => void;
  destroy: () => void;
};

type YtNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      width?: number | string;
      height?: number | string;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (e: { target: YtPlayer }) => void;
        onStateChange?: (e: { data: number }) => void;
      };
    },
  ) => YtPlayer;
  PlayerState: { ENDED: number; PLAYING: number };
};

declare global {
  interface Window {
    YT?: YtNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type BallasMusicProps = {
  active: boolean;
};

let apiLoading = false;
const apiWaiters: Array<() => void> = [];

function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  return new Promise<void>((resolve) => {
    apiWaiters.push(resolve);
    if (apiLoading) return;
    apiLoading = true;

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      apiWaiters.splice(0).forEach((fn) => fn());
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
}

export function BallasMusic({ active }: BallasMusicProps) {
  const { t } = useLanguage();
  const { data } = useSiteData();
  const trackId =
    extractYoutubeId(data.settings.musicTrackId) || BALLAS_TRACK_ID;
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(45);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    void loadYouTubeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      playerRef.current?.destroy();
      playerRef.current = null;
      setReady(false);

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: trackId,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: trackId,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(45);
            event.target.unMute();
            event.target.playVideo();
            setReady(true);
          },
          onStateChange: (event) => {
            if (event.data === window.YT?.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [active, trackId]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !ready) return;

    if (!active) {
      player.pauseVideo();
      return;
    }

    player.setVolume(volume);
    if (muted || volume === 0) {
      player.mute();
    } else {
      player.unMute();
      player.playVideo();
    }
  }, [active, muted, ready, volume]);

  if (!active) return null;

  return (
    <>
      <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
        <div ref={hostRef} />
      </div>

      <div className="fixed bottom-20 end-4 z-[70] sm:bottom-6 sm:end-6">
        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-full border border-primary/45 bg-black/85 px-3.5 py-2 text-[10px] tracking-[0.16em] text-violet-soft shadow-[0_0_18px_oklch(0.64_0.28_305/0.25)]"
          >
            {t.music.label}
          </button>
        ) : (
          <div className="w-[220px] rounded-2xl border border-primary/40 bg-black/90 p-3 shadow-[0_0_28px_oklch(0.64_0.28_305/0.3)] sm:w-[250px]">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[10px] tracking-[0.16em] text-violet-soft">{t.music.label}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-[10px] tracking-[0.12em] text-muted-foreground hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMuted((value) => !value)}
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-1.5 text-[10px] tracking-[0.14em] transition",
                  muted || volume === 0
                    ? "border-white/20 bg-white/5 text-muted-foreground"
                    : "border-primary/50 bg-primary/30 text-white",
                )}
                aria-label={muted ? t.music.unmute : t.music.mute}
              >
                {muted || volume === 0 ? t.music.unmute : t.music.mute}
              </button>

              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-[9px] tracking-[0.14em] text-muted-foreground">
                  {t.music.volume} · {muted ? 0 : volume}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setVolume(next);
                    if (next > 0) setMuted(false);
                  }}
                  className="ballas-volume w-full"
                  aria-label={t.music.volume}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
