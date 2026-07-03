"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { profileName } from "@/lib/site";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export function Nav({ dict, locale }: Props) {
  const [open, setOpen] = useState(false);

  const items = [
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: "#writing", label: dict.nav.writing },
    { href: `/${locale}/now`, label: dict.nav.now },
    { href: `/${locale}/uses`, label: dict.nav.uses },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur">
      <nav className="container-content relative flex h-16 items-center justify-center">
        {/* Logo — left */}
        <a href={`/${locale}`} className="absolute left-6 flex items-center">
          <Image
            src="/logo.png"
            alt={profileName}
            width={104}
            height={53}
            className="h-7 w-auto"
            priority
          />
        </a>

        {/* Desktop — center */}
        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="label-mono link-underline">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitcher locale={locale} />
          </li>
        </ul>

        {/* Mobile toggle — right */}
        <button
          type="button"
          aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="absolute right-6 label-mono md:hidden"
        >
          {open ? dict.nav.close : dict.nav.menu}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-paper md:hidden">
          <ul className="container-content flex flex-col gap-2 py-8">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-sans text-2xl"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <LanguageSwitcher locale={locale} />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
