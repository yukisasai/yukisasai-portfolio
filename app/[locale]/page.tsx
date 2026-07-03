import Link from "next/link";
import { Nav } from "@/components/nav";
import { RevealScript } from "@/components/reveal-script";
import { Section } from "@/components/section";
import { CaseStudy } from "@/components/case-study";
import { LanguageSwitcher } from "@/components/language-switcher";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profileName, links } from "@/lib/site";
import { getFeaturedItems } from "@/lib/projects";
import { getTechStack, getCareerSteps, getServices, getProcessSteps } from "@/lib/data";
import { GitHubActivity } from "@/components/github-activity";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const featuredProjects = await getFeaturedItems(locale);
  const techStack = getTechStack(locale);
  const careerSteps = getCareerSteps(locale);
  const services = getServices(locale);
  const processSteps = getProcessSteps(locale);

  return (
    <>
      <Nav dict={dict} locale={locale as Locale} />
      <RevealScript />

      <main id="top" className="pt-14 sm:pt-16">
        {/* ---------- Hero ---------- */}
        <section className="container-content flex min-h-[80vh] flex-col justify-center py-16 sm:min-h-[82vh] sm:py-24">
          <p className="eyebrow mb-4 sm:mb-6">{dict.hero.role}</p>
          <h1 className="font-sans text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            {profileName}
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-xl leading-snug sm:mt-8 sm:text-2xl md:text-3xl">
            {dict.hero.lead}
          </p>
          <p className="mt-3 max-w-xl text-base text-muted sm:mt-4 sm:text-lg">
            {dict.hero.leadSub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            <a href="#projects" className="btn btn-primary">
              {dict.hero.viewProjects}
            </a>
            <a href={`/${locale}/contact`} className="btn btn-secondary">
              {dict.hero.contactMe}
            </a>
          </div>
          <p className="label-mono mt-8 sm:mt-10">
            {dict.hero.location} · {dict.hero.nameAlt}
          </p>
        </section>

        {/* ---------- Numbers ---------- */}
        <section className="border-t border-line">
          <div className="container-content grid grid-cols-2 gap-6 py-12 sm:gap-8 sm:py-16 md:grid-cols-4">
            {dict.numbers.items.map(
              (item: { value: string; label: string }, i: number) => (
                <div key={i} className="reveal text-center">
                  <p className="font-sans text-2xl font-bold sm:text-3xl md:text-4xl">
                    {item.value}
                  </p>
                  <p className="label-mono mt-2">{item.label}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* ---------- About ---------- */}
        <Section id="about" eyebrow={dict.about.eyebrow} title={dict.about.title}>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed reveal sm:space-y-5 sm:text-lg">
            {dict.about.body.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        {/* ---------- Career Timeline ---------- */}
        <Section
          id="career"
          eyebrow={dict.career.eyebrow}
          title={dict.career.title}
        >
          <div className="relative max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-line sm:left-[23px]" />

            {careerSteps.map((step, i) => (
              <div
                key={i}
                className="reveal relative flex gap-4 pb-10 last:pb-0 sm:gap-8 sm:pb-12"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 sm:h-12 sm:w-12 ${
                      step.milestone
                        ? "border-ink bg-ink text-paper"
                        : "border-line bg-paper"
                    }`}
                  >
                    {step.milestone && (
                      <span className="text-xs font-bold sm:text-sm">
                        {step.year ?? "→"}
                      </span>
                    )}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1.5 sm:pt-2.5">
                  {step.year && (
                    <p className="label-mono mb-1">{step.year}</p>
                  )}
                  <h3 className="font-sans text-base font-bold sm:text-lg md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Services ---------- */}
        <Section
          id="services"
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((item) => (
              <li key={item.name} className="card reveal !p-4 text-sm sm:!p-5 sm:text-base">
                {item.name}
                {item.badge && (
                  <span className="ml-2 inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
                    {item.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- How I Build Products (Process) ---------- */}
        <Section
          id="process"
          eyebrow={dict.process.eyebrow}
          title={dict.process.title}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="reveal group relative"
              >
                <div className="mb-3 sm:mb-4">
                  <span className="font-mono text-3xl font-bold text-line transition-colors group-hover:text-ink sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-sans text-base font-bold sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:mt-2">
                  {step.description}
                </p>
                {/* Connector line on desktop */}
                {i < processSteps.length - 1 && (
                  <div className="absolute -right-3 top-5 hidden h-px w-6 bg-line lg:block sm:top-6" />
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Projects ---------- */}
        <Section
          id="projects"
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          description={dict.projects.description}
        >
          <div className="space-y-16 sm:space-y-24">
            {featuredProjects.map((project) => (
              <div key={project.slug} className="reveal">
                <CaseStudy project={project} labels={dict.projects.labels} locale={locale} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal sm:mt-16">
            <Link
              href={`/${locale}/projects`}
              className="btn btn-secondary"
            >
              {dict.projects.viewAll} →
            </Link>
          </div>
        </Section>

        {/* ---------- Tech Stack ---------- */}
        <Section
          id="skills"
          eyebrow={dict.skills.eyebrow}
          title={dict.skills.title}
        >
          <div className="grid gap-8 grid-cols-2 sm:gap-10 lg:grid-cols-3 xl:grid-cols-4">
            {techStack.map((group) => (
              <div key={group.label} className="reveal">
                <h3 className="eyebrow mb-3 sm:mb-4">{group.label}</h3>
                <ul className="space-y-2.5 sm:space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2.5 text-sm sm:gap-3 sm:text-base"
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-neutral-50 font-mono text-[10px] font-bold text-muted sm:h-8 sm:w-8 sm:text-xs">
                        {item.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- System Design ---------- */}
        <Section
          id="system-design"
          eyebrow={dict.systemDesign.eyebrow}
          title={dict.systemDesign.title}
          description={dict.systemDesign.description}
        >
          <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {dict.systemDesign.items.map((item: string) => (
              <li key={item} className="card reveal !p-4 text-sm sm:!p-5 sm:text-base">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- Writing & Learning ---------- */}
        <Section
          id="writing"
          eyebrow={dict.writing.eyebrow}
          title={dict.writing.title}
          description={dict.writing.description}
        >
          <div className="reveal">
            <a
              href={links.zenn}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              {dict.writing.cta}
            </a>
          </div>
        </Section>

        {/* ---------- GitHub ---------- */}
        <Section
          id="github"
          eyebrow={dict.github.eyebrow}
          title={dict.github.title}
        >
          <GitHubActivity />
        </Section>

        {/* ---------- Contact ---------- */}
        <Section
          id="contact"
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
        >
          <div className="max-w-2xl reveal">
            <p className="text-base sm:text-lg">{dict.contact.body}</p>
            <div className="mt-6 sm:mt-8">
              <Link
                href={`/${locale}/contact`}
                className="btn btn-primary"
              >
                {dict.contact.cta}
              </Link>
            </div>
          </div>
        </Section>

        {/* ---------- Footer ---------- */}
        <footer className="border-t border-line">
          <div className="container-content flex flex-col gap-4 py-8 sm:py-10 md:flex-row md:items-center md:justify-between">
            <p className="label-mono">© {profileName}</p>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
                <li>
                  <Link href={`/${locale}/now`} className="label-mono link-underline">
                    Now
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/uses`} className="label-mono link-underline">
                    Uses
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/updates`} className="label-mono link-underline">
                    Updates
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/learning`} className="label-mono link-underline">
                    Learning
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/blog`} className="label-mono link-underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="label-mono link-underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="label-mono link-underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={links.zenn}
                    target="_blank"
                    rel="noreferrer"
                    className="label-mono link-underline"
                  >
                    Zenn
                  </a>
                </li>
              </ul>
              <LanguageSwitcher locale={locale as Locale} />
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
