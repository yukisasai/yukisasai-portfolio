import type { Locale } from "./config";

const dictionaries = {
  ja: () => import("@/messages/ja.json").then((m) => m.default),
  en: () => import("@/messages/en.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
