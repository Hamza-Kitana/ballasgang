import { GANG, getLiveMembers, members } from "@/data/gang";
import { CrownMark } from "@/components/ballas/CrownMark";
import { MemberPortrait } from "@/components/ballas/MemberPortrait";

export function HomePanel() {
  const live = getLiveMembers();

  return (
    <div className="ballas-rise relative flex h-full flex-col justify-end pb-2 sm:justify-center sm:pb-0">
      <div className="pointer-events-none absolute top-2 right-0 hidden opacity-40 lg:block">
        <div className="ballas-orbit relative h-56 w-56">
          {live.slice(0, 3).map((member, index) => (
            <div
              key={member.id}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `rotate(${index * 120}deg) translate(100px) rotate(-${index * 120}deg)`,
              }}
            >
              <MemberPortrait member={member} size="sm" interactive={false} />
            </div>
          ))}
          <CrownMark className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>

      <p className="font-display text-xs tracking-[0.5em] text-violet-soft sm:text-sm">
        {GANG.city.toUpperCase()} · FIVE M
      </p>

      <h1 className="ballas-glitch font-display mt-3 text-[clamp(4rem,16vw,9.5rem)] leading-[0.82] tracking-[0.06em] text-glow">
        {GANG.name}
      </h1>

      <p className="ballas-shimmer-text font-display mt-1 text-[clamp(1.5rem,4.5vw,3rem)] tracking-[0.32em]">
        {GANG.tagline}
      </p>

      <div className="ballas-line-draw mt-5 h-px w-48 bg-gradient-to-r from-primary via-violet-glow to-transparent" />

      <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/75 sm:text-base">
        {GANG.motto}
      </p>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-6">
        <Stat label="Family" value={String(members.length).padStart(2, "0")} />
        <Stat label="Live now" value={String(live.length).padStart(2, "0")} />
        <Stat label="Colors" value="PURPLE" />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-3xl tracking-wider text-white sm:text-5xl">{value}</p>
      <p className="mt-1 text-[10px] tracking-[0.32em] text-muted-foreground uppercase">{label}</p>
    </div>
  );
}
