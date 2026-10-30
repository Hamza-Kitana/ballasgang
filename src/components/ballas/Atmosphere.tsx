import { useEffect, useRef, useState } from "react";

export function Atmosphere() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => setVideoReady(true);
    const play = () => {
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= 2) {
      markReady();
      play();
    }

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", play);
    play();

    const onVisibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className={`ballas-city-grade absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          videoReady ? "opacity-70" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoReady(true)}
        onError={() => setVideoReady(false)}
      >
        <source src="/ballas-bg.mp4" type="video/mp4" />
      </video>

      {/* Purple Los Santos night grade */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.12_0.08_305/0.55)_0%,oklch(0.18_0.12_305/0.2)_35%,oklch(0.08_0.06_305/0.75)_100%)] mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,oklch(0.06_0.05_305/0.75)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.08_0.06_305/0.45)_0%,transparent_25%,transparent_75%,oklch(0.08_0.06_305/0.45)_100%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/45 to-transparent" />
      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
