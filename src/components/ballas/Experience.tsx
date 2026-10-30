import { useEffect, useState } from "react";
import { Atmosphere } from "@/components/ballas/Atmosphere";
import { LoadingScreen } from "@/components/ballas/LoadingScreen";
import { Stage } from "@/components/ballas/Stage";
import { BallasMusic } from "@/components/ballas/BallasMusic";

type Phase = "loading" | "ready";

export function Experience() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const start = performance.now();
    const duration = 1800;

    const tick = () => {
      const next = Math.min(1, (performance.now() - start) / duration);
      const eased = 1 - Math.pow(1 - next, 3);
      setProgress(Math.round(eased * 100));
      if (next < 1) {
        timer = window.setTimeout(tick, 50);
      } else {
        frame = window.setTimeout(() => {
          setPhase("ready");
          setMusicOn(true);
        }, 200);
      }
    };

    timer = window.setTimeout(tick, 50);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(frame);
    };
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[oklch(0.08_0.04_305)] text-foreground">
      {phase !== "loading" ? (
        <Atmosphere />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,oklch(0.35_0.18_305/0.45),oklch(0.08_0.04_305))]" />
      )}

      {phase === "loading" ? <LoadingScreen progress={progress} /> : null}
      {phase === "ready" ? <Stage /> : null}
      <BallasMusic active={musicOn} />
    </div>
  );
}
