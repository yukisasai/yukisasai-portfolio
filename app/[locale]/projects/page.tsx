import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudy } from "@/components/case-study";
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
      <Nav dict={dict} locale={locale as Locale} />
      <RevealScript />

      <main id="top" className="min-h-screen pt-14 sm:pt-16">
        <Section
          id="projects"
          eyebrow={dict.projects.eyebrow}
          title={dict.projectsPage.title}
          description={dict.projectsPage.description}
        >
          <div className="space-y-16 sm:space-y-24">
            {projects.map((project) => (
              <div key={project.slug} className="reveal">
                <CaseStudy project={project} labels={dict.projects.labels} locale={locale} />
              </div>
            ))}
          </div>
        </Section>

        <Footer locale={locale as Locale} />
      </main>
    </>
  );
}
