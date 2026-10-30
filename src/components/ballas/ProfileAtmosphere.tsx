import { useEffect, useRef, useState } from "react";

type ProfileAtmosphereProps = {
  src: string;
  accent?: string;
};

/** Full-bleed GTA-style video for member profiles — kept light for performance. */
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
      video.pause();
    };
  }, [src]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[oklch(0.08_0.04_305)]">
      <video
        key={src}
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          ready ? "opacity-85" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setReady(true)}
        onError={() => setReady(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.12_0.1_305/0.42)_0%,oklch(0.14_0.08_305/0.18)_45%,oklch(0.07_0.06_305/0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_20%,oklch(0.06_0.05_305/0.55)_100%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: `radial-gradient(ellipse at 80% 20%, ${accent}44, transparent 50%)` }}
      />
    </div>
  );
}
