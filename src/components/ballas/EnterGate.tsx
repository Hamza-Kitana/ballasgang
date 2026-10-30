import { CrownMark } from "@/components/ballas/CrownMark";

type EnterGateProps = {
  onEnter: () => void;
};

export function EnterGate({ onEnter }: EnterGateProps) {
  return (
    <button
      type="button"
      onClick={onEnter}
      className="ballas-fade group absolute inset-0 z-40 flex cursor-pointer flex-col items-center justify-center border-0 bg-[oklch(0.08_0.04_305/0.62)] text-inherit outline-none"
      aria-label="Enter the dynasty"
    >
      <div className="ballas-breathe pointer-events-none absolute h-40 w-40 rounded-full border border-primary/40" />
      <div className="ballas-breathe pointer-events-none absolute h-64 w-64 rounded-full border border-primary/20 [animation-delay:0.45s]" />
      <div className="ballas-breathe pointer-events-none absolute h-96 w-96 rounded-full border border-primary/10 [animation-delay:0.9s]" />

      <CrownMark className="relative z-10 h-12 w-12 transition duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_24px_oklch(0.72_0.28_310)]" />

      <p className="font-display relative z-10 mt-8 text-sm tracking-[0.55em] text-violet-soft">
        YOU MADE IT THIS FAR
      </p>
      <h2 className="font-display relative z-10 mt-4 text-6xl tracking-[0.22em] text-glow transition duration-500 group-hover:tracking-[0.3em] sm:text-7xl">
        ENTER
      </h2>
      <div className="ballas-line-draw relative z-10 mt-6 h-px w-40 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <p className="relative z-10 mt-6 animate-pulse text-xs tracking-[0.35em] text-foreground/65 uppercase">
        Click anywhere to begin
      </p>
    </button>
  );
}
