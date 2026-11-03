import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { t, toggleLocale, locale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-primary/35 bg-primary/15 px-3.5 py-2 text-[10px] tracking-[0.18em] text-violet-soft uppercase transition hover:border-primary/60 hover:bg-primary/25 hover:text-white sm:px-4 sm:text-[11px]"
      aria-label={t.langSwitchLabel}
      title={t.langSwitchLabel}
    >
      {locale === "ar" ? "EN" : "عر"}
    </button>
  );
}
