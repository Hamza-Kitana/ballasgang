import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/ballas/Atmosphere";
import { LoadingScreen } from "@/components/ballas/LoadingScreen";
import { EnterGate } from "@/components/ballas/EnterGate";
import { Stage } from "@/components/ballas/Stage";
import { CursorGlow } from "@/components/ballas/CursorGlow";

type Phase = "loading" | "gate" | "flash" | "ready";

export function Experience() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const start = performance.now();
    const duration = 2800;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        frame = window.setTimeout(() => setPhase("gate"), 320);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(frame);
    };
  }, []);

  const enter = () => {
    setPhase("flash");
    window.setTimeout(() => setPhase("ready"), 420);
  };

  return (
    <div className="ballas-hide-native-cursor relative h-dvh w-full overflow-hidden bg-[oklch(0.08_0.04_305)] text-foreground">
      <Atmosphere />
      <CursorGlow />

      {phase === "loading" ? <LoadingScreen progress={progress} /> : null}
      {phase === "gate" || phase === "flash" ? <EnterGate onEnter={enter} /> : null}
      {phase === "flash" ? (
        <div className="ballas-flash pointer-events-none absolute inset-0 z-[60] bg-[radial-gradient(circle,oklch(0.75_0.25_310),oklch(0.2_0.1_305)_70%)]" />
      ) : null}
      {phase === "ready" ? <Stage /> : null}
    </div>
  );
}
