import { useEffect, useRef, useState } from "react";

const BACKGROUND_SLIDES = [
  "/backgrounds/bg-1.jpg",
  "/backgrounds/bg-2.jpg",
  "/backgrounds/bg-3.jpg",
  "/backgrounds/bg-4.jpg",
  "/backgrounds/bg-5.jpg",
  "/backgrounds/bg-6.jpg",
  "/backgrounds/bg-7.jpg",
  "/backgrounds/bg-8.jpg",
] as const;

const SLIDE_MS = 6500;

export function Atmosphere() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [slide, setSlide] = useState(0);

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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % BACKGROUND_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Rotating FiveM / street / night-city stills */}
      <div className="absolute inset-0">
        {BACKGROUND_SLIDES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`ballas-city-grade ballas-bg-slide absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
              index === slide ? "is-active opacity-100" : "opacity-0"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>

      {/* Soft video layer over the slideshow for motion */}
      <video
        ref={videoRef}
        className={`ballas-city-grade ballas-kenburns absolute inset-0 h-full w-full object-cover mix-blend-soft-light transition-opacity duration-500 ${
          videoReady ? "opacity-45" : "opacity-0"
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

      {/* Purple Los Santos / Ballas grade */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.18_0.12_305/0.55)_0%,oklch(0.22_0.14_305/0.25)_38%,oklch(0.08_0.08_305/0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_40%,transparent_12%,oklch(0.06_0.06_305/0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.08_0.08_305/0.45)_0%,transparent_26%,transparent_74%,oklch(0.08_0.08_305/0.45)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,oklch(0.45_0.24_305/0.28),transparent_45%)]" />

      <div className="ballas-home-scan absolute inset-x-0 top-0 h-28 opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/45 to-transparent" />

      <div className="absolute bottom-5 start-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {BACKGROUND_SLIDES.map((src, index) => (
          <span
            key={src}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === slide ? "w-5 bg-primary" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
