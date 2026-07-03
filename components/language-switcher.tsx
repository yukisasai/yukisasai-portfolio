"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, localeNames, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  variant?: "light" | "dark";
};

export function LanguageSwitcher({ locale, variant = "light" }: Props) {
  const pathname = usePathname();
  const pathWithoutLocale = pathname.replace(/^\/(ja|en)/, "") || "/";

  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-1.5 label-mono leading-none">
      {i18n.locales.map((l, idx) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          {idx > 0 && (
            <span
              aria-hidden
              className={`select-none ${isDark ? "text-neutral-600" : "text-line"}`}
            >
              /
            </span>
          )}
          {l === locale ? (
            <span className={`font-medium ${isDark ? "text-white" : "text-ink"}`}>
              {localeNames[l]}
            </span>
          ) : (
            <Link
              href={`/${l}${pathWithoutLocale}`}
              className={`transition-colors ${
                isDark
                  ? "text-neutral-500 hover:text-white"
                  : "text-muted hover:text-ink"
              }`}
              lang={l}
            >
              {localeNames[l]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
