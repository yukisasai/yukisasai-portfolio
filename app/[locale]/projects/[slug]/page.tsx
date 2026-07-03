import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { RevealScript } from "@/components/reveal-script";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteUrl, profileName } from "@/lib/site";
import {
  getProjectBySlug,
  getProjectSlugs,
  getAllProjects,
} from "@/lib/content";

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return i18n.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        ja: `/ja/projects/${slug}`,
        en: `/en/projects/${slug}`,
        "x-default": `/${i18n.defaultLocale}/projects/${slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const project = await getProjectBySlug(locale, slug);

  if (!project) notFound();

  // Get all projects to find next project
  const allProjects = await getAllProjects(locale);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex >= 0
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${siteUrl}/${locale}/projects/${slug}`,
    author: { "@type": "Person", name: profileName },
    ...(project.image && {
      image: `${siteUrl}${project.image}`,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RevealScript />
      <main id="top" className="min-h-screen">
        {/* Header */}
        <div className="pt-20 sm:pt-24">
          <PageHeader
            locale={locale as Locale}
            backLabel={dict.projectsPage.back}
          />
        </div>

        {/* Hero */}
        <section className="container-content mt-8 reveal sm:mt-10">
          <p className="eyebrow">{project.category}</p>
          <h1 className="mt-2 font-sans text-3xl font-bold sm:mt-3 sm:text-4xl md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-xl">
            {project.summary}
          </p>
        </section>

        {/* Hero Image */}
        {project.image && (
          <section className="container-content mt-8 reveal sm:mt-12">
            <div className="overflow-hidden rounded-xl border border-line sm:rounded-2xl">
              <Image
                src={project.image}
                alt={project.title}
                width={1280}
                height={720}
                sizes="(max-width: 896px) 100vw, 896px"
                className="aspect-[16/9] w-full object-cover"
                priority
              />
            </div>
          </section>
        )}

        {/* Content */}
        <section className="container-content mt-10 reveal sm:mt-16">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        </section>

        {/* Role & Tech Stack */}
        <section className="container-content mt-10 grid gap-8 reveal sm:mt-16 sm:grid-cols-2 sm:gap-12">
          <div>
            <h2 className="eyebrow mb-3 sm:mb-4">{dict.projects.labels.role}</h2>
            <ul className="space-y-1.5 sm:space-y-2">
              {project.role.map((r) => (
                <li key={r} className="text-base sm:text-lg">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-3 sm:mb-4">{dict.projects.labels.techStack}</h2>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="container-content mt-10 reveal sm:mt-16">
          <a
            href={project.website}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            {project.cta} →
          </a>
        </section>

        {/* Next Project */}
        {nextProject && nextProject.slug !== slug && (
          <section className="section mt-6 sm:mt-8">
            <div className="container-content reveal">
              <p className="eyebrow mb-3 sm:mb-4">Next Project</p>
              <Link
                href={`/${locale}/projects/${nextProject.slug}`}
                className="group block"
              >
                <h2 className="font-sans text-2xl font-bold transition-colors group-hover:text-muted sm:text-3xl md:text-4xl">
                  {nextProject.title} →
                </h2>
                <p className="mt-1.5 text-base text-muted sm:mt-2 sm:text-lg">
                  {nextProject.category}
                </p>
              </Link>
            </div>
          </section>
        )}

        {/* Spacer */}
        <div className="pb-16 sm:pb-24" />
      </main>
    </>
  );
}
