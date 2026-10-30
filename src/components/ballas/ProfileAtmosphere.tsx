import { useEffect, useRef, useState } from "react";

type ProfileAtmosphereProps = {
  src: string;
  accent?: string;
};

/** Full-bleed GTA / night-city video for member profiles. */
export function ProfileAtmosphere({ src, accent = "#c084fc" }: ProfileAtmosphereProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    const markReady = () => {
      setReady(true);
      play();
    };

    video.load();
    if (video.readyState >= 2) markReady();

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", play);

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
  }, [src]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        key={src}
        ref={videoRef}
        className={`ballas-city-grade ballas-kenburns absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-90" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        onError={() => setReady(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!ready ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,oklch(0.35_0.18_305/0.45),oklch(0.08_0.04_305))]" />
      ) : null}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.12_0.1_305/0.45)_0%,oklch(0.16_0.1_305/0.18)_40%,oklch(0.07_0.06_305/0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_35%,transparent_10%,oklch(0.06_0.05_305/0.7)_100%)]" />
      <div
        className="absolute inset-0 opacity-30 mix-blend-color"
        style={{ background: accent }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.08_0.06_305/0.5)_0%,transparent_24%,transparent_76%,oklch(0.08_0.06_305/0.5)_100%)]" />

      <div className="ballas-home-scan absolute inset-x-0 top-0 h-24 opacity-35" />
      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
