import { members } from "@/data/gang";
import { MemberCard } from "@/components/ballas/MemberCard";
import { useLanguage } from "@/i18n/LanguageProvider";

export function MembersPanel() {
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <p className="text-xs tracking-[0.28em] text-violet-soft">{t.members.eyebrow}</p>
        <h2 className="mt-1 text-4xl font-bold tracking-[0.08em] sm:text-6xl">{t.members.title}</h2>
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-primary to-transparent" />
      </div>

      <div className="panel-scroll grid min-h-0 flex-1 content-start gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {members.map((member, index) => (
          <MemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </div>
  );
}
