import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getUpdates } from "@/lib/content";

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
    title: dict.updatesPage.title,
    description: dict.updatesPage.description,
    alternates: {
      canonical: `/${locale}/updates`,
      languages: {
        ja: "/ja/updates",
        en: "/en/updates",
        "x-default": `/${i18n.defaultLocale}/updates`,
      },
    },
  };
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const updates = await getUpdates();

  return (
    <>
      <RevealScript />
      <main id="top" className="min-h-screen py-24">
        <PageHeader locale={locale as Locale} backLabel={dict.updatesPage.back} />

        <div className="container-content mt-10">
          <h1 className="font-sans text-4xl font-bold sm:text-5xl reveal">
            {dict.updatesPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted reveal">
            {dict.updatesPage.description}
          </p>

          <div className="mt-12 space-y-10">
            {updates.map((entry) => (
              <article key={entry.date} className="reveal border-t border-line pt-8">
                <p className="label-mono mb-3">{entry.date}</p>
                {entry.title && (
                  <h2 className="font-sans text-xl font-bold mb-4">{entry.title}</h2>
                )}
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                />
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
