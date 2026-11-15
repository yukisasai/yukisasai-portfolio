"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const items = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}#process`, label: dict.nav.process },
    { href: `/${locale}#skills`, label: dict.nav.skills },
    { href: `/${locale}#writing`, label: dict.nav.writing },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  // Track mount state for CSS transitions (avoid flash on initial render)
  useEffect(() => setMounted(true), []);

  // 上端では透明、少しスクロールしたら背景をぼかして境界線を出す
  const onScroll = useCallback(() => setScrolled(window.scrollY > 24), []);

  useEffect(() => {
    onScroll();
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

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open ? "border-b border-line bg-paper/80 backdrop-blur-xl" : ""
        }`}
      >
        <nav className="container-content flex h-14 items-center justify-between sm:h-16">
          {/* Logo — left */}
          <Link
            href={`/${locale}`}
            className="flex items-center"
            aria-label={profileName}
          >
            <Image
              src="/seamlessly-logo.webp"
              alt={profileName}
              width={308}
              height={96}
              className="h-7 w-auto sm:h-8"
              priority
            />
            <span className="ml-4 hidden text-[11px] tracking-wider2 text-mute sm:inline">
              {profileName.toUpperCase()}
            </span>
          </Link>

          {/* Desktop — right */}
          <ul className="hidden h-full items-stretch gap-5 lg:flex xl:gap-7">
            {items.map((item) => (
              <li key={item.href} className="flex items-center">
                <a
                  href={item.href}
                  className={
                    item.href.endsWith("/contact")
                      ? "rounded-full bg-blue px-5 py-2 text-[13px] text-white transition hover:bg-blue-hover"
                      : `link-underline text-[13px] tracking-wider ${
                          isActive(item.href) ? "text-ink" : "text-mute"
                        }`
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="flex items-center">
              <LanguageSwitcher locale={locale} />
            </li>
          </ul>

          {/* Mobile toggle — right */}
          <button
            type="button"
            aria-label={open ? dict.nav.menuClose : dict.nav.menuOpen}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="z-[70] -mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream active:bg-cream lg:hidden"
          >
            <span className="relative flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`absolute h-[1.5px] w-5 transition-all duration-300 ${
                  open
                    ? "rotate-45 bg-ink"
                    : "-translate-y-[5px] bg-ink"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 transition-all duration-300 ${
                  open
                    ? "-rotate-45 bg-ink"
                    : "translate-y-[5px] bg-ink"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* -------- Mobile Menu -------- */}
      {mounted && (
        <div
          className={`fixed inset-0 z-[60] lg:hidden ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
          aria-hidden={!open}
        >
          {/* Backdrop overlay */}
          <div
            className={`absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />

          {/* Slide-in panel */}
          <nav
            className={`absolute inset-y-0 right-0 flex w-[320px] flex-col border-l border-line bg-paper transition-transform duration-300 ease-out sm:w-[380px] ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <div className="flex h-14 flex-shrink-0 items-center justify-end px-4 sm:h-16 sm:px-6">
              <button
                type="button"
                aria-label={dict.nav.menuClose}
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream active:bg-cream"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute h-[1.5px] w-5 rotate-45 bg-ink" />
                  <span className="absolute h-[1.5px] w-5 -rotate-45 bg-ink" />
                </span>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col px-6 py-8">
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 rounded-xl px-4 py-3 display text-2xl transition-colors ${
                        isActive(item.href)
                          ? "bg-cream text-ink"
                          : "text-ink hover:bg-cream"
                      }`}
                    >
                      {isActive(item.href) && (
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue" />
                      )}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-6 h-px bg-line" />

              {/* Language switcher */}
              <div className="px-4">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>

            {/* Bottom branding */}
            <div className="flex-shrink-0 border-t border-line px-10 py-6">
              <p className="text-[11px] tracking-wider2 text-mute">
                © {profileName}
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
