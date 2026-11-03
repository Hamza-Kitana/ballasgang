import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Official GTA V Los Santos screenshots layered over cinematic video */
const BACKGROUND_SLIDES = [
  "/backgrounds/bg-1.webp",
  "/backgrounds/bg-2.webp",
  "/backgrounds/bg-3.webp",
  "/backgrounds/bg-4.webp",
  "/backgrounds/bg-5.webp",
  "/backgrounds/bg-6.webp",
  "/backgrounds/bg-7.webp",
  "/backgrounds/bg-8.webp",
] as const;

/** Hidden cinematic bed — starts at 0:09 */
const BG_VIDEO_ID = "bni2CEjiZ9Y";
const BG_VIDEO_START = 9;

const SLIDE_MS = 8000;

const videoSrc = [
  `https://www.youtube-nocookie.com/embed/${BG_VIDEO_ID}`,
  `?autoplay=1`,
  `&mute=1`,
  `&controls=0`,
  `&playsinline=1`,
  `&rel=0`,
  `&modestbranding=1`,
  `&iv_load_policy=3`,
  `&disablekb=1`,
  `&fs=0`,
  `&loop=1`,
  `&playlist=${BG_VIDEO_ID}`,
  `&start=${BG_VIDEO_START}`,
  `&enablejsapi=0`,
].join("");

export function Atmosphere() {
  const [slide, setSlide] = useState(0);
  const nextSlide = (slide + 1) % BACKGROUND_SLIDES.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % BACKGROUND_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = BACKGROUND_SLIDES[nextSlide]!;
  }, [nextSlide]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[oklch(0.08_0.04_305)]">
      {/* Hidden video bed — scaled cover, no UI */}
      <div className="ballas-bg-video absolute inset-0" aria-hidden>
        <iframe
          src={videoSrc}
          title=""
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen={false}
          tabIndex={-1}
          loading="eager"
        />
      </div>

      {/* Soft veil so video stays cinematic / hidden */}
      <div className="absolute inset-0 bg-[oklch(0.1_0.06_305/0.35)]" />

      {/* GTA slides on top of the video */}
      {[slide, nextSlide].map((index) => {
        const src = BACKGROUND_SLIDES[index]!;
        const active = index === slide;
        const pan = index % 2 === 0 ? "a" : "b";

        return (
          <img
            key={src}
            src={src}
            alt=""
            className={cn(
              "ballas-bg-slide absolute inset-0 h-full w-full object-cover",
              active ? "is-active opacity-[0.62]" : "opacity-0",
              active && `ballas-bg-pan-${pan}`,
            )}
            loading={active ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        );
      })}

      {/* Depth blend between motion + stills */}
      <div className="absolute inset-0 bg-[oklch(0.12_0.08_305/0.18)] mix-blend-multiply" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.12_305/0.62)_0%,oklch(0.14_0.1_305/0.22)_38%,oklch(0.06_0.06_305/0.82)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_14%,oklch(0.05_0.05_305/0.68)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.4_0.22_305/0.26),transparent_45%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/50 to-transparent" />
      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
