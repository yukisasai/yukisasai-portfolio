import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudy } from "@/components/case-study";
import { LanguageSwitcher } from "@/components/language-switcher";
import { RevealScript } from "@/components/reveal-script";
import { Section } from "@/components/section";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllItems } from "@/lib/projects";

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
    title: dict.projectsPage.title,
    description: dict.projectsPage.description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        ja: "/ja/projects",
        en: "/en/projects",
        "x-default": `/${i18n.defaultLocale}/projects`,
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const projects = await getAllItems(locale);

  return (
    <>
      <RevealScript />
      <main id="top" className="min-h-screen py-24">
        <div className="container-content flex items-center justify-between">
          <Link href={`/${locale}`} className="label-mono link-underline">
            {dict.projectsPage.back}
          </Link>
          <LanguageSwitcher locale={locale as Locale} />
        </div>

        <Section
          id="projects"
          eyebrow={dict.projects.eyebrow}
          title={dict.projectsPage.title}
          description={dict.projectsPage.description}
        >
          <div className="space-y-24">
            {projects.map((project) => (
              <div key={project.slug} className="reveal">
                <CaseStudy project={project} labels={dict.projects.labels} />
              </div>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
