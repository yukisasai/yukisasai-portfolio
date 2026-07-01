"use client";

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
    { href: "#about", label: dict.nav.about },
    { href: "#services", label: dict.nav.services },
    { href: "#projects", label: dict.nav.projects },
    { href: "#skills", label: dict.nav.skills },
    { href: "#writing", label: dict.nav.writing },
    { href: "#contact", label: dict.nav.contact },
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
      <nav className="container-content flex h-16 items-center justify-between">
        <a href="#top" className="font-sans text-sm font-bold tracking-tight">
          {profileName}
        </a>

        {/* Desktop */}
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

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="label-mono md:hidden"
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
