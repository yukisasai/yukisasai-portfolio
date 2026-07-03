"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const items = [
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: "#writing", label: dict.nav.writing },
    { href: `/${locale}/now`, label: dict.nav.now },
    { href: `/${locale}/uses`, label: dict.nav.uses },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  // Scroll-based hide/show
  const onScroll = useCallback(() => {
    const y = window.scrollY;
    if (y > 80 && y > lastY.current) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Show nav when mobile menu is open
  const isHidden = hidden && !open;

  // Check if a link is active (current page)
  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="container-content relative flex h-14 items-center justify-center sm:h-16">
        {/* Logo — left */}
        <Link
          href={`/${locale}`}
          className="absolute left-4 flex items-center sm:left-6"
          aria-label={profileName}
        >
          <Image
            src="/logo.png"
            alt={profileName}
            width={104}
            height={53}
            className="h-6 w-auto sm:h-7"
            priority
          />
        </Link>

        {/* Desktop — center */}
        <ul className="hidden items-center gap-6 lg:flex lg:gap-8">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`label-mono link-underline ${
                  isActive(item.href) ? "text-ink font-medium" : ""
                }`}
              >
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
          className="absolute right-4 flex h-10 w-10 items-center justify-center label-mono sm:right-6 lg:hidden"
        >
          {open ? dict.nav.close : dict.nav.menu}
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 top-14 z-40 bg-paper sm:top-16 lg:hidden">
          <nav className="container-content flex flex-col gap-1 py-6">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-3.5 font-sans text-xl transition-colors active:bg-neutral-50 sm:text-2xl ${
                  isActive(item.href) ? "font-bold" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 px-3">
              <LanguageSwitcher locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
