import { members, type GangMember } from "@/data/gang";
import { MemberCard } from "@/components/ballas/MemberCard";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

function splitRoster(list: GangMember[]) {
  const boss = list.find((m) => m.rank === "Boss");
  const coBoss = list.find((m) => m.rank === "OG");
  const leaders = [boss, coBoss].filter(Boolean) as GangMember[];
  const leaderIds = new Set(leaders.map((m) => m.id));
  const crew = list.filter((m) => !leaderIds.has(m.id));
  return { leaders, crew };
}

function SectionHead({
  title,
  hint,
  tone = "leader",
}: {
  title: string;
  hint: string;
  tone?: "leader" | "crew";
}) {
  return (
    <div className="mb-5 flex w-full flex-col items-center gap-2">
      <div className="flex w-full items-center gap-3">
        <div
          className={cn(
            "h-px flex-1",
            tone === "leader"
              ? "bg-gradient-to-r from-transparent via-primary/70 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/35 to-transparent",
          )}
        />
        <div
          className={cn(
            "rounded-full border px-5 py-2 shadow-[0_0_24px_oklch(0.64_0.28_305/0.25)]",
            tone === "leader"
              ? "border-primary/55 bg-primary/25"
              : "border-white/25 bg-white/10",
          )}
        >
          <p
            className={cn(
              "font-display text-center text-[clamp(1.35rem,4vw,1.85rem)] leading-none tracking-[0.08em]",
              tone === "leader" ? "text-white text-glow" : "text-white",
            )}
          >
            {title}
          </p>
        </div>
        <div
          className={cn(
            "h-px flex-1",
            tone === "leader"
              ? "bg-gradient-to-r from-transparent via-primary/70 to-transparent"
              : "bg-gradient-to-r from-transparent via-white/35 to-transparent",
          )}
        />
      </div>
      <p className="text-[11px] tracking-[0.22em] text-violet-soft uppercase">{hint}</p>
    </div>
  );
}

export function MembersPanel() {
  const { t } = useLanguage();
  const { leaders, crew } = splitRoster(members);

  return (
    <div className="flex h-full w-full flex-col">
      <PanelChrome
        className="w-full"
        eyebrow={t.members.eyebrow}
        title={t.members.title}
        end={
          <span className="rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-violet-soft">
            {String(members.length).padStart(2, "0")} {t.members.roster}
          </span>
        }
      />

      <div className="panel-scroll min-h-0 w-full flex-1 space-y-9 pb-2">
        {leaders.length > 0 ? (
          <section className="w-full">
            <SectionHead
              title={t.members.leadership}
              hint={t.members.leadershipHint}
              tone="leader"
            />
            <div className="grid w-full gap-5 lg:grid-cols-2 lg:gap-6">
              {leaders.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} featured />
              ))}
            </div>
          </section>
        ) : null}

        {crew.length > 0 ? (
          <section className="w-full">
            <SectionHead title={t.members.crew} hint={t.members.crewHint} tone="crew" />
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {crew.map((member, index) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={index + leaders.length}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
