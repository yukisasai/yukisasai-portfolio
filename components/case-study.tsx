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
}: {
  project: CaseStudyItem;
  labels: CaseStudyLabels;
}) {
  const hostname = (() => {
    try {
      return new URL(project.url).hostname;
    } catch {
      return project.url;
    }
  })();

  return (
    <article className="border-t border-line pt-16 first:border-t-0 first:pt-0">
      {/* Image */}
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="group block"
      >
        {project.image ? (
          <div className="overflow-hidden rounded-2xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.name}
              className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-neutral-50 transition-colors duration-300 group-hover:bg-neutral-100">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="font-sans text-lg font-bold text-neutral-300">
                {project.name}
              </span>
              <span className="label-mono !text-neutral-300">{hostname}</span>
            </div>
          </div>
        )}
      </a>

      {/* Category + Name */}
      <p className="eyebrow mt-10">{project.category}</p>
      <h3 className="mt-2 font-sans text-3xl font-bold sm:text-4xl">
        {project.name}
      </h3>

      {/* Overview */}
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        {project.overview}
      </p>

      {/* Challenge / Solution / Result — or Markdown content */}
      {project.contentHtml ? (
        <div
          className="prose mt-10"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      ) : (
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <dt className="label-mono mb-2">{labels.challenge}</dt>
            <dd className="leading-relaxed">{project.challenge}</dd>
          </div>
          <div>
            <dt className="label-mono mb-2">{labels.solution}</dt>
            <dd className="leading-relaxed">{project.solution}</dd>
          </div>
          <div>
            <dt className="label-mono mb-2">{labels.result}</dt>
            <dd className="leading-relaxed">{project.result}</dd>
          </div>
        </dl>
      )}

      {/* Role + Tech Stack */}
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <p className="label-mono mb-3">{labels.role}</p>
          <ul className="space-y-1.5">
            {project.role.map((r) => (
              <li key={r} className="text-muted">
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3">{labels.techStack}</p>
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <a
          href={project.cta.href}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          {project.cta.label} →
        </a>
      </div>
    </article>
  );
}
