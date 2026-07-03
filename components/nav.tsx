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
  const [mounted, setMounted] = useState(false);
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

  // Track mount state for CSS transitions (avoid flash on initial render)
  useEffect(() => setMounted(true), []);

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

  const isHidden = hidden && !open;

  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/80 backdrop-blur transition-transform duration-300 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="container-content relative flex h-14 items-center justify-end sm:h-16">
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

          {/* Desktop — right */}
          <ul className="hidden h-full items-stretch gap-6 lg:flex lg:gap-8">
            {items.map((item) => (
              <li key={item.href} className="flex items-center">
                <a
                  href={item.href}
                  className={`label-mono link-underline leading-none ${
                    isActive(item.href) ? "text-ink font-medium" : ""
                  }`}
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
            className="absolute right-4 z-[70] flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-neutral-100 active:bg-neutral-100 sm:right-6 lg:hidden"
          >
            <span className="relative flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={`absolute h-[1.5px] w-5 transition-all duration-300 ${
                  open
                    ? "rotate-45 bg-white"
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
                    ? "-rotate-45 bg-white"
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
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />

          {/* Slide-in panel */}
          <nav
            className={`absolute inset-y-0 right-0 flex w-[320px] flex-col bg-[#161616] transition-transform duration-300 ease-out sm:w-[380px] ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Spacer for header height */}
            <div className="h-14 flex-shrink-0 sm:h-16" />

            {/* Links */}
            <div className="flex flex-1 flex-col px-6 py-8">
              <ul className="flex flex-col gap-1">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-3 rounded-lg px-4 py-3.5 font-sans text-[17px] transition-colors ${
                        isActive(item.href)
                          ? "text-white bg-white/[0.08]"
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {isActive(item.href) && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white flex-shrink-0" />
                      )}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-6 h-px bg-white/10" />

              {/* Language switcher */}
              <div className="px-4">
                <LanguageSwitcher locale={locale} variant="dark" />
              </div>
            </div>

            {/* Bottom branding */}
            <div className="flex-shrink-0 border-t border-white/10 px-10 py-6">
              <p className="font-mono text-[11px] tracking-wider text-neutral-600">
                © {profileName}
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
