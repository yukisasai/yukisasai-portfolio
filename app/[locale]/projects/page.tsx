import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RevealScript } from "@/components/reveal-script";
import { SectionHeading } from "@/components/section-heading";
import { ProjectList } from "@/components/project-list";
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

      <main id="top" className="min-h-screen">
        <section className="container-content pb-28 pt-36 md:pt-44">
          <SectionHeading
            en={dict.projectsPage.title}
            ja={dict.projectsPage.description}
            count={String(projects.length).padStart(2, "0")}
          />
          <div className="mt-12">
            <ProjectList
              projects={projects}
              locale={locale}
              allLabel={locale === "ja" ? "すべて" : "All"}
              countLabel={locale === "ja" ? "件" : "works"}
            />
          </div>
        </section>

        <Footer locale={locale as Locale} />
      </main>
    </>
  );
}
