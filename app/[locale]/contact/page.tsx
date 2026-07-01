import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { LanguageSwitcher } from "@/components/language-switcher";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profileName } from "@/lib/site";

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

  return (
    <main id="top" className="container-content min-h-screen py-24">
      <div className="flex items-center justify-between">
        <Link href={`/${locale}`} className="label-mono link-underline">
          {dict.contactPage.back}
        </Link>
        <LanguageSwitcher locale={locale as Locale} />
      </div>

      <h1 className="mt-10 font-sans text-4xl font-bold sm:text-5xl">
        {dict.contact.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{dict.contact.body}</p>

      <div className="mt-12">
        <ContactForm dict={dict.contactForm} />
      </div>
    </main>
  );
}
