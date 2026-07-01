"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, localeNames, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  // Remove current locale prefix to get the base path
  const pathWithoutLocale = pathname.replace(/^\/(ja|en)/, "") || "/";

  return (
    <div className="flex items-center gap-1.5 label-mono">
      {i18n.locales.map((l, idx) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          {idx > 0 && (
            <span aria-hidden className="text-line select-none">/</span>
          )}
          {l === locale ? (
            <span className="text-ink font-medium">{localeNames[l]}</span>
          ) : (
            <Link
              href={`/${l}${pathWithoutLocale}`}
              className="text-muted transition-colors hover:text-ink"
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
