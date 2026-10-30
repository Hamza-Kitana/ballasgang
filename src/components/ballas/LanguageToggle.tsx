import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { t, toggleLocale, locale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 text-[11px] tracking-[0.18em] text-violet-soft uppercase transition hover:border-primary/50 hover:text-white"
      aria-label={t.langSwitchLabel}
      title={t.langSwitchLabel}
    >
      {locale === "ar" ? "EN" : "عر"}
    </button>
  );
}
