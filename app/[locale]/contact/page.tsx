import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { email, links } from "@/lib/site";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.contactPage.title,
    description: dict.contactPage.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ja: "/ja/contact",
        en: "/en/contact",
        "x-default": `/${i18n.defaultLocale}/contact`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const dmLinks = [
    {
      name: "LinkedIn",
      href: links.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: links.x,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Nav dict={dict} locale={locale as Locale} />
      <RevealScript />

      <main id="top" className="min-h-screen pt-14 sm:pt-16">
        {/* Hero */}
        <section className="container-content py-16 sm:py-24">
          <p className="eyebrow mb-3 sm:mb-4 reveal">{dict.contactPage.title}</p>
          <h1 className="font-sans text-3xl font-bold reveal sm:text-4xl md:text-5xl">
            {dict.contact.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted reveal sm:text-lg">
            {dict.contactPage.description}
          </p>
        </section>

        {/* -------- ① Contact Form (Primary) -------- */}
        <section className="border-t border-line">
          <div className="container-content py-12 sm:py-20">
            <div className="reveal">
              <div className="flex items-center gap-3">
                <p className="eyebrow">{dict.contactPage.formSection.eyebrow}</p>
                <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-paper uppercase">
                  {dict.contactPage.formSection.recommended}
                </span>
              </div>
              <h2 className="mt-3 font-sans text-2xl font-bold sm:text-3xl">
                {dict.contactPage.formSection.title}
              </h2>
              <p className="mt-3 max-w-lg text-base text-muted">
                {dict.contactPage.formSection.description}
              </p>
            </div>
            <div className="mt-10 reveal">
              <ContactForm dict={dict.contactForm} />
            </div>
          </div>
        </section>

        {/* -------- ② Quick Chat + ③ Email -------- */}
        <section className="border-t border-line">
          <div className="container-content grid gap-0 sm:grid-cols-2 sm:gap-0">

            {/* Quick Chat */}
            <div className="py-12 sm:py-20 sm:pr-12 sm:border-r sm:border-line reveal">
              <p className="eyebrow">{dict.contactPage.chatSection.eyebrow}</p>
              <h2 className="mt-3 font-sans text-xl font-bold sm:text-2xl">
                {dict.contactPage.chatSection.title}
              </h2>
              <p className="mt-2 text-sm text-muted sm:text-base">
                {dict.contactPage.chatSection.description}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {dmLinks.map((dm) => (
                  <a
                    key={dm.name}
                    href={dm.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-line px-5 py-4 transition-colors hover:bg-neutral-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 text-ink transition-colors group-hover:bg-neutral-100">
                      {dm.icon}
                    </span>
                    <div className="flex-1">
                      <p className="font-sans text-sm font-semibold sm:text-base">{dm.name}</p>
                      <p className="text-xs text-muted">DM</p>
                    </div>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="border-t border-line py-12 sm:border-t-0 sm:py-20 sm:pl-12 reveal">
              <p className="eyebrow">{dict.contactPage.emailSection.eyebrow}</p>
              <h2 className="mt-3 font-sans text-xl font-bold sm:text-2xl">
                {dict.contactPage.emailSection.title}
              </h2>
              <p className="mt-2 text-sm text-muted sm:text-base">
                {dict.contactPage.emailSection.description}
              </p>
              <a
                href={`mailto:${email}`}
                className="group mt-6 flex items-center gap-3 rounded-xl border border-line px-5 py-4 transition-colors hover:bg-neutral-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-50 text-ink transition-colors group-hover:bg-neutral-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 4L12 13 2 4" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold sm:text-base">Email</p>
                  <p className="text-xs text-muted truncate">{email}</p>
                </div>
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4 flex-shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M6 3l5 5-5 5" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <Footer locale={locale as Locale} />
      </main>
    </>
  );
}
