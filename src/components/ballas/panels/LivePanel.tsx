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
    <div className="flex h-full w-full flex-col">
      <PanelChrome
        eyebrow={t.live.eyebrow}
        title={t.live.title}
        accent="red"
        subtitle={t.live.subtitle}
        end={
          <div className="flex items-center gap-2 rounded-full border border-red-400/45 bg-red-500/20 px-3.5 py-1.5 text-[11px] tracking-[0.12em] text-red-100">
            <span className="ballas-live-dot h-2 w-2 rounded-full bg-red-400" />
            {fill(t.live.summary, { live: live.length, online: online.length })}
          </div>
        }
      />

      <div className="panel-scroll min-h-0 w-full flex-1 space-y-5 pb-2">
        <section className="ballas-live-banner relative overflow-hidden rounded-[1.5rem]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,oklch(0.55_0.22_25/0.35),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />
          <div className="relative flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div className="text-start">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black tracking-[0.16em] text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                LIVE NOW
              </span>
              <h3 className="font-display mt-3 text-[clamp(1.8rem,4.5vw,2.8rem)] leading-none tracking-[0.05em] text-white">
                {t.live.bannerTitle}
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-white/80">{t.live.bannerBody}</p>
            </div>
            <p className="text-[10px] tracking-[0.18em] text-red-200/80 uppercase">{t.live.hoverHint}</p>
          </div>
        </section>

        {live.length === 0 ? (
          <p className="rounded-2xl border border-white/20 bg-[oklch(0.14_0.05_305)] p-8 text-sm text-white/80">
            {t.live.empty}
          </p>
        ) : (
          <>
            {featured ? <LiveCard member={featured} featured index={0} /> : null}
            {rest.length > 0 ? (
              <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
