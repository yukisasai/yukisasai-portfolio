export const i18n = {
  defaultLocale: "ja",
  locales: ["ja", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};
