import type { Locale } from "@/i18n/messages";

export function speakLine(text: string, locale: Locale) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = locale === "ar" ? "ar-SA" : "en-US";
  utter.rate = locale === "ar" ? 0.92 : 0.95;
  utter.pitch = 0.9;
  utter.volume = 1;

  let spoken = false;
  const speakNow = () => {
    if (spoken) return;
    spoken = true;
    const voices = synth.getVoices();
    const preferred =
      voices.find((v) =>
        locale === "ar"
          ? v.lang.toLowerCase().startsWith("ar")
          : v.lang.toLowerCase().startsWith("en"),
      ) ?? null;
    if (preferred) utter.voice = preferred;
    synth.speak(utter);
  };

  if (synth.getVoices().length > 0) {
    speakNow();
    return;
  }

  synth.addEventListener("voiceschanged", speakNow, { once: true });
  window.setTimeout(speakNow, 300);
}
