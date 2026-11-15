import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ContactForm } from "@/components/contact-form";
import { ContactPageClient } from "@/components/contact-page-client";
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
      name: "Instagram",
      href: links.instagram,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm7.846-10.405a1.441 1.441 0 01-2.88 0 1.44 1.44 0 012.88 0z" />
        </svg>
      ),
    },
  ];

  return (
    <ContactPageClient
      successTitle={dict.contactForm.successTitle}
      successBody={dict.contactForm.successBody}
      locale={locale}
      backLabel={dict.contactPage.thanksBackHome}
    >
      <Nav dict={dict} locale={locale as Locale} />
      <RevealScript />

      <main id="top" className="min-h-screen pt-14 sm:pt-16">
            {/* Hero */}
            <section className="container-content py-16 text-center sm:py-24">
              <p className="eyebrow mb-3 sm:mb-4 reveal">{dict.contactPage.title}</p>
              <h1 className="display text-3xl reveal sm:text-4xl md:text-5xl">
                {dict.contact.title.split("\n").map((line: string, i: number, arr: string[]) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </h1>
              <p className="mt-4 mx-auto max-w-xl text-base text-mute reveal sm:text-lg">
                {dict.contactPage.description}
              </p>
            </section>

            {/* -------- ① Contact Form (Primary) -------- */}
            <section className="border-t border-line">
              <div className="container-content py-12 sm:py-20">
                <div className="mx-auto max-w-xl">
                  <div className="reveal text-center">
                    <div className="flex items-center justify-center gap-3">
                      <p className="eyebrow">{dict.contactPage.formSection.eyebrow}</p>
                      <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wider text-paper uppercase">
                        {dict.contactPage.formSection.recommended}
                      </span>
                    </div>
                    <h2 className="mt-3 display text-2xl sm:text-3xl">
                      {dict.contactPage.formSection.title}
                    </h2>
                    <p className="mt-3 text-base text-mute">
                      {dict.contactPage.formSection.description}
                    </p>
                  </div>
                  <div className="mt-10 reveal">
                    <ContactForm dict={dict.contactForm} />
                  </div>
                </div>
              </div>
            </section>

            {/* -------- ② Quick Chat + ③ Email -------- */}
            <section className="border-t border-line">
              <div className="container-content grid gap-0 sm:grid-cols-2 sm:gap-0">

                {/* Quick Chat */}
                <div className="py-12 sm:py-20 sm:pr-12 sm:border-r sm:border-line reveal">
                  <p className="eyebrow">{dict.contactPage.chatSection.eyebrow}</p>
                  <h2 className="mt-3 display text-xl sm:text-2xl">
                    {dict.contactPage.chatSection.title}
                  </h2>
                  <p className="mt-2 text-sm text-mute sm:text-base">
                    {dict.contactPage.chatSection.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    {dmLinks.map((dm) => (
                      <a
                        key={dm.name}
                        href={dm.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-[18px] border border-line px-5 py-4 transition-colors hover:bg-cream"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-ink transition-colors group-hover:bg-line/40">
                          {dm.icon}
                        </span>
                        <div className="flex-1">
                          <p className="font-sans text-sm font-semibold sm:text-base">{dm.name}</p>
                          <p className="text-xs text-mute">DM</p>
                        </div>
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-4 w-4 text-mute transition-transform group-hover:translate-x-0.5"
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
                  <h2 className="mt-3 display text-xl sm:text-2xl">
                    {dict.contactPage.emailSection.title}
                  </h2>
                  <p className="mt-2 text-sm text-mute sm:text-base">
                    {dict.contactPage.emailSection.description}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="group mt-6 flex items-center gap-3 rounded-[18px] border border-line px-5 py-4 transition-colors hover:bg-cream"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream text-ink transition-colors group-hover:bg-line/40">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 4L12 13 2 4" />
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-sm font-semibold sm:text-base">Email</p>
                      <p className="text-xs text-mute truncate">{email}</p>
                    </div>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-4 w-4 flex-shrink-0 text-mute transition-transform group-hover:translate-x-0.5"
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
    </ContactPageClient>
  );
}
