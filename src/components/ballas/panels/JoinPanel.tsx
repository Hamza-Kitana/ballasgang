import { GANG, joinSteps } from "@/data/gang";

export function JoinPanel() {
  return (
    <div className="ballas-rise flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="font-display text-xs tracking-[0.42em] text-violet-soft">RECRUITMENT</p>
        <h2 className="font-display mt-1 text-4xl tracking-[0.14em] sm:text-6xl">JOIN US</h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Purple isn't a color you wear. It's a life you prove.
        </p>
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-3">
        {joinSteps.map((step, index) => (
          <div
            key={step.step}
            className="ballas-rise flex gap-4 border border-white/10 bg-black/30 p-4 backdrop-blur-xl transition hover:border-primary/40"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="font-display text-5xl leading-none text-primary/90">{step.step}</span>
            <div>
              <h3 className="font-display text-2xl tracking-wider sm:text-3xl">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          </div>
        ))}

        <a
          href={`https://${GANG.discord}`}
          target="_blank"
          rel="noreferrer"
          className="ballas-rise mt-3 inline-flex items-center justify-center border border-primary/60 bg-gradient-to-r from-primary/30 to-accent/20 px-6 py-3.5 font-display text-2xl tracking-[0.28em] shadow-[0_0_30px_oklch(0.64_0.28_305/0.35)] transition hover:from-primary hover:to-accent hover:text-white"
          style={{ animationDelay: "220ms" }}
        >
          OPEN DISCORD
        </a>
      </div>
    </div>
  );
}
