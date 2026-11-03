import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { t, toggleLocale, locale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[10px] tracking-[0.16em] text-violet-soft uppercase transition hover:border-primary/50 hover:text-white sm:px-3.5 sm:text-[11px] sm:tracking-[0.18em]"
      aria-label={t.langSwitchLabel}
      title={t.langSwitchLabel}
    >
      {locale === "ar" ? "EN" : "عر"}
    </button>
  );
}
