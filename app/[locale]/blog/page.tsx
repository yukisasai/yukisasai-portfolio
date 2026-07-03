import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getBlogPosts } from "@/lib/content";

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
    title: dict.blogPage.title,
    description: dict.blogPage.description,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        ja: "/ja/blog",
        en: "/en/blog",
        "x-default": `/${i18n.defaultLocale}/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = await getBlogPosts(locale);

  return (
    <>
      <RevealScript />
      <main id="top" className="min-h-screen py-24">
        <PageHeader locale={locale as Locale} backLabel={dict.blogPage.back} />

        <div className="container-content mt-10">
          <h1 className="font-sans text-4xl font-bold sm:text-5xl reveal">
            {dict.blogPage.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted reveal">
            {dict.blogPage.description}
          </p>

          {posts.length === 0 ? (
            <p className="mt-12 text-lg text-muted reveal">{dict.blogPage.empty}</p>
          ) : (
            <div className="mt-12 space-y-10">
              {posts.map((post) => (
                <article key={post.slug} className="reveal border-t border-line pt-8">
                  <p className="label-mono mb-2">{post.publishedAt}</p>
                  <h2 className="font-sans text-2xl font-bold">{post.title}</h2>
                  <p className="mt-2 text-muted">{post.summary}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
