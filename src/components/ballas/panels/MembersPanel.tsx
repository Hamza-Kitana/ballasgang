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
    <div className="flex h-full flex-col">
      <PanelChrome
        eyebrow={t.members.eyebrow}
        title={t.members.title}
        end={
          <span className="rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-violet-soft">
            {String(members.length).padStart(2, "0")} {t.members.roster}
          </span>
        }
      />

      <div className="panel-scroll min-h-0 flex-1 space-y-7 pb-2">
        {leaders.length > 0 ? (
          <section>
            <p className="mb-3 text-center text-[10px] tracking-[0.28em] text-violet-soft uppercase">
              {t.members.leadership}
            </p>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch justify-center gap-4 sm:flex-row">
              {leaders.map((member, index) => (
                <div key={member.id} className="w-full sm:max-w-[280px] sm:flex-1">
                  <MemberCard member={member} index={index} featured />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {crew.length > 0 ? (
          <section>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <p className="text-[10px] tracking-[0.28em] text-white/50 uppercase">{t.members.crew}</p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
            <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
