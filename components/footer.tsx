import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profileName, links } from "@/lib/site";
import type { Locale } from "@/i18n/config";

const social = [
  ["Zenn", links.zenn],
  ["GitHub", links.github],
  ["LinkedIn", links.linkedin],
  ["X", links.x],
] as const;

const pages = ["now", "uses", "updates", "learning", "blog"] as const;

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-line bg-cream">
      <div className="container-content flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <Image src="/seamlessly-logo.webp" alt={profileName} width={308} height={96} className="h-11 w-auto" />
          <p className="mt-2 text-sm text-mute">{profileName} ／ AI Product Engineer</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] tracking-wider">
          <Link href={`/${locale}`} className="link-underline">Home</Link>
          <Link href={`/${locale}/projects`} className="link-underline">Projects</Link>
          <Link href={`/${locale}#services`} className="link-underline">Services</Link>
          <Link href={`/${locale}#about`} className="link-underline">About</Link>
          <Link href={`/${locale}/contact`} className="link-underline">Contact</Link>
        </nav>
      </div>

      <div className="container-content flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line py-5 text-[13px]">
        {pages.map((p) => (
          <Link key={p} href={`/${locale}/${p}`} className="link-underline capitalize">
            {p}
          </Link>
        ))}
        {social
          .filter(([, href]) => href)
          .map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="link-underline text-blue-link">
              {label} ↗
            </a>
          ))}
        <span className="ml-auto">
          <LanguageSwitcher locale={locale} />
        </span>
      </div>

      <div className="container-content border-t border-line py-6 text-[11px] leading-relaxed text-mute">
        <p>© {new Date().getFullYear()} {profileName}</p>
      </div>
    </footer>
  );
}
