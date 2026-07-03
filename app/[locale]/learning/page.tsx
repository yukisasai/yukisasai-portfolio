import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLearningTopics } from "@/lib/content";

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
    title: dict.learningPage.title,
    description: dict.learningPage.description,
    alternates: {
      canonical: `/${locale}/learning`,
      languages: {
        ja: "/ja/learning",
        en: "/en/learning",
        "x-default": `/${i18n.defaultLocale}/learning`,
      },
    },
  };
}

export default async function LearningPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const topics = await getLearningTopics(locale);

  return (
    <>
      <RevealScript />
      <main id="top" className="min-h-screen py-24">
        <PageHeader locale={locale as Locale} backLabel={dict.learningPage.back} />

        <div className="container-content mt-10">
          <h1 className="font-sans text-4xl font-bold sm:text-5xl reveal">
            {dict.learningPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted reveal">
            {dict.learningPage.description}
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {topics.map((topic) => (
              <div key={topic.slug} className="card reveal">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-sans text-xl font-bold">{topic.title}</h2>
                  <span className="chip">{topic.level}</span>
                </div>
                <div
                  className="text-sm text-muted"
                  dangerouslySetInnerHTML={{ __html: topic.contentHtml }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
