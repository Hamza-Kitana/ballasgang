import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

/** Ballas street anthem — YouTube: https://www.youtube.com/watch?v=7j06hETnyzc */
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
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    void loadYouTubeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT?.Player) return;
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: BALLAS_TRACK_ID,
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
          playlist: BALLAS_TRACK_ID,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(55);
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
    };
  }, [active]);

  useEffect(() => {
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (active) {
      if (muted) player.mute();
      else {
        player.unMute();
        player.playVideo();
      }
    } else {
      player.pauseVideo();
    }
  }, [active, muted, ready]);

  if (!active) return null;

  return (
    <>
      <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
        <div ref={hostRef} />
      </div>

      <button
        type="button"
        onClick={() => setMuted((value) => !value)}
        className={cn(
          "fixed bottom-4 end-4 z-[70] border px-3 py-2 text-[10px] tracking-[0.16em] transition",
          muted
            ? "border-white/20 bg-black/70 text-muted-foreground"
            : "border-primary/50 bg-primary/25 text-white shadow-[0_0_20px_oklch(0.64_0.28_305/0.35)]",
        )}
        aria-label={muted ? t.music.unmute : t.music.mute}
      >
        {muted ? t.music.unmute : t.music.mute}
      </button>
    </>
  );
}
