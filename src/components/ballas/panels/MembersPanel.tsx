import { members } from "@/data/gang";
import { MemberCard } from "@/components/ballas/MemberCard";
import { useLanguage } from "@/i18n/LanguageProvider";

export function MembersPanel() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.28em] text-violet-soft">{t.members.eyebrow}</p>
          <h2 className="font-display mt-1 text-[clamp(2.4rem,7vw,4.5rem)] leading-none tracking-[0.06em]">
            {t.members.title}
          </h2>
          <div className="mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
        </div>
        <p className="gta-street-plate px-3 py-1.5 text-[10px] tracking-[0.18em] text-white">
          {String(members.length).padStart(2, "0")} {t.members.roster}
        </p>
      </div>

      <div className="panel-scroll grid min-h-0 flex-1 content-start gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-4">
        {members.map((member, index) => (
          <MemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </div>
  );
}
