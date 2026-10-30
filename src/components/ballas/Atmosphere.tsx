import { useEffect, useRef, useState } from "react";

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 2.2,
      s: 0.12 + Math.random() * 0.55,
      a: 0.12 + Math.random() * 0.5,
      hue: Math.random() > 0.7 ? "236, 72, 153" : "168, 85, 247",
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.s * 0.0007;
        p.x += Math.sin(p.y * 12) * 0.00015;
        if (p.y < -0.03) {
          p.y = 1.03;
          p.x = Math.random();
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.hue}, ${p.a})`;
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.08)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="ballas-vignette ballas-scanlines pointer-events-none absolute inset-0 overflow-hidden">
      {hasVideo ? (
        <video
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHasVideo(false)}
        >
          <source src="/ballas-bg.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div
        ref={layerRef}
        className="absolute -inset-[16%] transition-transform duration-500 ease-out will-change-transform"
      >
        <div className="ballas-drift absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,oklch(0.5_0.26_305/0.65),transparent_42%),radial-gradient(ellipse_at_82%_68%,oklch(0.38_0.24_320/0.58),transparent_40%),radial-gradient(ellipse_at_48%_108%,oklch(0.28_0.18_290/0.8),transparent_52%),linear-gradient(130deg,oklch(0.15_0.07_305),oklch(0.1_0.05_300)_48%,oklch(0.09_0.05_312))]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.09_0.05_305/0.55)_0%,oklch(0.1_0.04_305/0.15)_40%,oklch(0.06_0.05_305/0.88)_100%)]" />

      <div className="ballas-pulse absolute left-[16%] top-[24%] h-[32vmax] w-[32vmax] rounded-full bg-[radial-gradient(circle,oklch(0.6_0.3_310/0.28),transparent_70%)]" />
      <div className="ballas-pulse absolute right-[4%] bottom-[12%] h-[38vmax] w-[38vmax] rounded-full bg-[radial-gradient(circle,oklch(0.48_0.26_300/0.24),transparent_68%)] [animation-delay:1.1s]" />

      <div className="ballas-orbit absolute top-1/2 left-1/2 h-[min(70vmin,520px)] w-[min(70vmin,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10">
        <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-glow shadow-[0_0_18px_oklch(0.72_0.28_310)]" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="ballas-grain absolute inset-0" />

      <span className="ballas-hud-frame tl" />
      <span className="ballas-hud-frame tr" />
      <span className="ballas-hud-frame bl" />
      <span className="ballas-hud-frame br" />
    </div>
  );
}
