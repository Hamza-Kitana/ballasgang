import { getLiveMembers, getOnlineMembers } from "@/data/gang";
import { LiveCard } from "@/components/ballas/LiveCard";
import { PanelChrome } from "@/components/ballas/PanelChrome";
import { fill, useLanguage } from "@/i18n/LanguageProvider";

export function LivePanel() {
  const { t } = useLanguage();
  const live = getLiveMembers();
  const online = getOnlineMembers();
  const [featured, ...rest] = live;

  return (
    <div className="flex h-full flex-col">
      <PanelChrome
        eyebrow={t.live.eyebrow}
        title={t.live.title}
        accent="red"
        end={
          <div className="flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/15 px-3.5 py-1.5 text-[11px] tracking-[0.12em] text-red-100">
            <span className="ballas-live-dot h-2 w-2 rounded-full bg-red-400" />
            {fill(t.live.summary, { live: live.length, online: online.length })}
          </div>
        }
      />

      <div className="panel-scroll min-h-0 flex-1 space-y-4">
        {live.length === 0 ? (
          <p className="rounded-2xl border border-white/10 bg-black/40 p-8 text-sm text-muted-foreground">
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
