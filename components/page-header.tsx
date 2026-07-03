import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  backLabel: string;
};

export function PageHeader({ locale, backLabel }: Props) {
  return (
    <div className="container-content flex items-center justify-between">
      <Link href={`/${locale}`} className="label-mono link-underline">
        {backLabel}
      </Link>
      <LanguageSwitcher locale={locale} />
    </div>
  );
}
