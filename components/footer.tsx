import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profileName, links } from "@/lib/site";
import type { Locale } from "@/i18n/config";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-line">
      <div className="container-content flex flex-col gap-4 py-8 sm:py-10 md:flex-row md:items-center md:justify-between">
        <p className="label-mono">© {profileName}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
            <li>
              <Link href={`/${locale}/now`} className="label-mono link-underline">
                Now
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/uses`} className="label-mono link-underline">
                Uses
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/updates`} className="label-mono link-underline">
                Updates
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/learning`} className="label-mono link-underline">
                Learning
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/blog`} className="label-mono link-underline">
                Blog
              </Link>
            </li>
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="label-mono link-underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="label-mono link-underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={links.zenn}
                target="_blank"
                rel="noreferrer"
                className="label-mono link-underline"
              >
                Zenn
              </a>
            </li>
          </ul>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </footer>
  );
}
