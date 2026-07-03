import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getUses } from "@/lib/data";

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
    title: dict.usesPage.title,
    description: dict.usesPage.description,
    alternates: {
      canonical: `/${locale}/uses`,
      languages: {
        ja: "/ja/uses",
        en: "/en/uses",
        "x-default": `/${i18n.defaultLocale}/uses`,
      },
    },
  };
}

export default async function UsesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const uses = getUses(locale);

  // Group items by category
  const grouped = uses.reduce<Record<string, typeof uses>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <>
      <RevealScript />
      <main id="top" className="min-h-screen py-24">
        <PageHeader locale={locale as Locale} backLabel={dict.usesPage.back} />

        <div className="container-content mt-10">
          <h1 className="font-sans text-4xl font-bold sm:text-5xl reveal">
            {dict.usesPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted reveal">
            {dict.usesPage.description}
          </p>

          <div className="mt-12 space-y-12">
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="reveal">
                <h2 className="eyebrow mb-6">{category}</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {items.map((item) => (
                    <div key={item.name} className="card !p-5">
                      <p className="font-sans text-lg font-bold">{item.name}</p>
                      <p className="mt-1 text-sm text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
