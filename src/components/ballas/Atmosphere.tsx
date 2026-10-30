import { useEffect, useState } from "react";

/** Official GTA V Los Santos screenshots (rotating city backdrop) */
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

const SLIDE_MS = 9000;

export function Atmosphere() {
  const [slide, setSlide] = useState(0);
  const nextSlide = (slide + 1) % BACKGROUND_SLIDES.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % BACKGROUND_SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, []);

  // Prefetch the upcoming slide only
  useEffect(() => {
    const img = new Image();
    img.src = BACKGROUND_SLIDES[nextSlide]!;
  }, [nextSlide]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[oklch(0.08_0.04_305)]">
      {/* Only mount current + next slide to cut GPU cost */}
      {[slide, nextSlide].map((index) => {
        const src = BACKGROUND_SLIDES[index]!;
        const active = index === slide;
        return (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
              active ? "opacity-100" : "opacity-0"
            }`}
            loading={active ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        );
      })}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.12_305/0.55)_0%,oklch(0.14_0.1_305/0.18)_38%,oklch(0.06_0.06_305/0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_12%,oklch(0.05_0.05_305/0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.4_0.22_305/0.22),transparent_45%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/50 to-transparent" />
      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
