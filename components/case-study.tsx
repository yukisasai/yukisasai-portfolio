import Link from "next/link";

export type CaseStudyItem = {
  slug: string;
  name: string;
  url: string;
  category: string;
  image?: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  role: string[];
  techStack: string[];
  cta: { label: string; href: string };
  contentHtml?: string;
};

export type CaseStudyLabels = {
  overview: string;
  challenge: string;
  solution: string;
  result: string;
  role: string;
  techStack: string;
};

export function CaseStudy({
  project,
  labels,
  locale,
}: {
  project: CaseStudyItem;
  labels: CaseStudyLabels;
  locale: string;
}) {
  return (
    <article className="border-t border-line pt-12 first:border-t-0 first:pt-0 sm:pt-16">
      {/* Image — links to detail page */}
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="group block"
      >
        {project.image ? (
          <div className="overflow-hidden rounded-xl border border-line sm:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-line bg-neutral-50 transition-colors duration-300 group-hover:bg-neutral-100 sm:rounded-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="font-sans text-base font-bold text-neutral-300 sm:text-lg">
                {project.name}
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Category + Name */}
      <p className="eyebrow mt-6 sm:mt-10">{project.category}</p>
      <Link href={`/${locale}/projects/${project.slug}`}>
        <h3 className="mt-1.5 font-sans text-2xl font-bold transition-colors hover:text-muted sm:mt-2 sm:text-3xl md:text-4xl">
          {project.name}
        </h3>
      </Link>

      {/* Overview */}
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg">
        {project.overview}
      </p>

      {/* Tech Stack */}
      <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
        {project.techStack.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-6 sm:mt-8">
        <Link
          href={`/${locale}/projects/${project.slug}`}
          className="btn btn-secondary"
        >
          {labels.overview} →
        </Link>
      </div>
    </article>
  );
}
