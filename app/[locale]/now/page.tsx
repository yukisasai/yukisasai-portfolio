import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getNowContent } from "@/lib/content";

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
    title: dict.nowPage.title,
    description: dict.nowPage.description,
    alternates: {
      canonical: `/${locale}/now`,
      languages: {
        ja: "/ja/now",
        en: "/en/now",
        "x-default": `/${i18n.defaultLocale}/now`,
      },
    },
  };
}

export default async function NowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const now = await getNowContent(locale);

  return (
    <>
      <RevealScript />
      <main id="top" className="min-h-screen py-24">
        <PageHeader locale={locale as Locale} backLabel={dict.nowPage.back} />

        <div className="container-content mt-10">
          <h1 className="font-sans text-4xl font-bold sm:text-5xl reveal">
            {dict.nowPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted reveal">
            {dict.nowPage.description}
          </p>

          {now?.updatedAt && (
            <p className="label-mono mt-6 reveal">
              {dict.nowPage.lastUpdated}: {now.updatedAt}
            </p>
          )}

          {now?.contentHtml && (
            <div
              className="prose mt-10 reveal"
              dangerouslySetInnerHTML={{ __html: now.contentHtml }}
            />
          )}
        </div>
      </main>
    </>
  );
}
