import { members, type GangMember } from "@/data/gang";
import { MemberCard } from "@/components/ballas/MemberCard";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { useLanguage } from "@/i18n/LanguageProvider";

function splitRoster(list: GangMember[]) {
  const boss = list.find((m) => m.rank === "Boss");
  const coBoss = list.find((m) => m.rank === "OG");
  const leaders = [boss, coBoss].filter(Boolean) as GangMember[];
  const leaderIds = new Set(leaders.map((m) => m.id));
  const crew = list.filter((m) => !leaderIds.has(m.id));
  return { leaders, crew };
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

      <div className="panel-scroll min-h-0 w-full flex-1 space-y-8 pb-2">
        {leaders.length > 0 ? (
          <section className="w-full">
            <p className="mb-4 text-center text-[10px] tracking-[0.28em] text-violet-soft uppercase">
              {t.members.leadership}
            </p>
            <div className="grid w-full gap-4 sm:grid-cols-2">
              {leaders.map((member, index) => (
                <div key={member.id} className="w-full min-w-0">
                  <MemberCard member={member} index={index} featured />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {crew.length > 0 ? (
          <section className="w-full">
            <div className="mb-4 flex w-full items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
              <p className="shrink-0 text-[10px] tracking-[0.28em] text-white/55 uppercase">
                {t.members.crew}
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {crew.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index + leaders.length} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
