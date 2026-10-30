import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const onMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[80] mix-blend-screen transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate3d(${pos.x - 14}px, ${pos.y - 14}px, 0)`,
      }}
    >
      <div className="relative h-7 w-7">
        <div className="absolute inset-0 rounded-full border border-violet-soft/70" />
        <div className="absolute inset-[9px] rounded-full bg-violet-glow shadow-[0_0_24px_oklch(0.72_0.28_310)]" />
      </div>
    </div>
  );
}
