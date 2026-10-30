import { achievements } from "@/data/gang";

export function AchievementsPanel() {
  return (
    <div className="ballas-rise flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="font-display text-xs tracking-[0.42em] text-violet-soft">LEGACY</p>
        <h2 className="font-display mt-1 text-4xl tracking-[0.14em] sm:text-6xl">ACHIEVEMENTS</h2>
        <div className="ballas-line-draw mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-3">
        {achievements.map((item, index) => (
          <article
            key={item.id}
            className="ballas-rise group grid grid-cols-[auto_1fr] gap-4 border border-white/10 border-l-2 border-l-primary/80 bg-black/30 p-4 backdrop-blur-xl transition hover:border-primary/40 hover:bg-primary/5"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <span className="font-display text-3xl text-primary/85 transition group-hover:text-violet-glow sm:text-4xl">
              {item.year}
            </span>
            <div>
              <h3 className="font-display text-2xl tracking-wider sm:text-3xl">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
