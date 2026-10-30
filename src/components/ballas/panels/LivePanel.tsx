import { getLiveMembers, getOnlineMembers } from "@/data/gang";
import { LiveCard } from "@/components/ballas/LiveCard";
import { fill, useLanguage } from "@/i18n/LanguageProvider";

export function LivePanel() {
  const { t } = useLanguage();
  const live = getLiveMembers();
  const online = getOnlineMembers();
  const [featured, ...rest] = live;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 shrink-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-[0.28em] text-red-300">{t.live.eyebrow}</p>
            <h2 className="mt-1 text-4xl font-bold tracking-[0.08em] sm:text-6xl">{t.live.title}</h2>
          </div>
          <div className="flex items-center gap-2 border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-[11px] tracking-[0.14em] text-red-200">
            <span className="ballas-live-dot h-2 w-2 rounded-full bg-red-400" />
            {fill(t.live.summary, { live: live.length, online: online.length })}
          </div>
        </div>
        <div className="ballas-line-draw mt-3 h-px w-28 bg-gradient-to-r from-red-400 to-transparent" />
      </div>

      <div className="panel-scroll min-h-0 flex-1 space-y-4">
        {live.length === 0 ? (
          <p className="border border-white/10 bg-black/55 p-8 text-sm text-muted-foreground">
            {t.live.empty}
          </p>
        ) : (
          <>
            {featured ? <LiveCard member={featured} featured index={0} /> : null}
            {rest.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {rest.map((member, index) => (
                  <LiveCard key={member.id} member={member} index={index + 1} />
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
