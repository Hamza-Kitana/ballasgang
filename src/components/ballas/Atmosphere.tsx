/** Cinematic Ballas reel as full-site backdrop */
const BG_VIDEO_ID = "-v1nh3KeKAM";

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
  `&enablejsapi=0`,
].join("");

export function Atmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[oklch(0.08_0.04_305)]">
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

      {/* Soft purple cinematic veils — keep UI readable */}
      <div className="absolute inset-0 bg-[oklch(0.1_0.06_305/0.28)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.16_0.12_305/0.55)_0%,oklch(0.14_0.1_305/0.18)_40%,oklch(0.06_0.06_305/0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_18%,oklch(0.05_0.05_305/0.55)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.4_0.22_305/0.22),transparent_45%)]" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-soft/50 to-transparent" />
      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
