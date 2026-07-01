import { Nav } from "@/components/nav";
import { RevealScript } from "@/components/reveal-script";
import { Section } from "@/components/section";
import { CaseStudy, type CaseStudyItem } from "@/components/case-study";
import { LanguageSwitcher } from "@/components/language-switcher";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profileName, links } from "@/lib/site";

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

  return (
    <>
      <Nav dict={dict} locale={locale as Locale} />
      <RevealScript />

      <main id="top" className="pt-16">
        {/* ---------- Hero ---------- */}
        <section className="container-content flex min-h-[82vh] flex-col justify-center py-24">
          <p className="eyebrow mb-6">{dict.hero.role}</p>
          <h1 className="font-sans text-5xl font-bold sm:text-6xl md:text-7xl">
            {profileName}
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-2xl leading-snug sm:text-3xl">
            {dict.hero.lead}
          </p>
          <p className="mt-4 max-w-xl text-lg text-muted">{dict.hero.leadSub}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              {dict.hero.viewProjects}
            </a>
            <a href="#contact" className="btn btn-secondary">
              {dict.hero.contactMe}
            </a>
          </div>
          <p className="label-mono mt-10">
            {dict.hero.location} · {dict.hero.nameAlt}
          </p>
        </section>

        {/* ---------- Numbers ---------- */}
        <section className="border-t border-line">
          <div className="container-content grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
            {dict.numbers.items.map(
              (item: { value: string; label: string }, i: number) => (
                <div key={i} className="reveal text-center">
                  <p className="font-sans text-3xl font-bold sm:text-4xl">
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
          <div className="max-w-2xl space-y-5 text-lg reveal">
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
          <ol className="relative max-w-xl border-l border-line pl-8">
            {dict.career.steps.map(
              (
                step: { year: string | null; title: string },
                i: number
              ) => (
                <li key={i} className="reveal relative pb-10 last:pb-0">
                  <span className="absolute -left-8 top-1.5 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-ink bg-paper" />
                  {step.year && (
                    <p className="label-mono mb-1">{step.year}</p>
                  )}
                  <p className="text-lg font-medium">{step.title}</p>
                </li>
              )
            )}
          </ol>
        </Section>

        {/* ---------- Services ---------- */}
        <Section
          id="services"
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
        >
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {dict.services.items.map(
              (item: { name: string; badge: string | null }) => (
                <li key={item.name} className="card reveal !p-5 text-base">
                  {item.name}
                  {item.badge && (
                    <span className="ml-2 inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
                      {item.badge}
                    </span>
                  )}
                </li>
              )
            )}
          </ul>
        </Section>

        {/* ---------- Projects ---------- */}
        <Section
          id="projects"
          eyebrow={dict.projects.eyebrow}
          title={dict.projects.title}
          description={dict.projects.description}
        >
          <div className="space-y-24">
            {(dict.projects.items as CaseStudyItem[]).map((project) => (
              <div key={project.slug} className="reveal">
                <CaseStudy project={project} labels={dict.projects.labels} />
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
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {dict.systemDesign.items.map((item: string) => (
              <li key={item} className="card reveal !p-5 text-base">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- Skills ---------- */}
        <Section
          id="skills"
          eyebrow={dict.skills.eyebrow}
          title={dict.skills.title}
        >
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {dict.skills.groups.map(
              (group: { label: string; items: string[] }) => (
                <div key={group.label} className="reveal">
                  <h3 className="font-sans text-xl font-bold">{group.label}</h3>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item: string) => (
                      <li key={item} className="text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
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

        {/* ---------- Contact ---------- */}
        <Section
          id="contact"
          eyebrow={dict.contact.eyebrow}
          title={dict.contact.title}
        >
          <div className="max-w-2xl reveal">
            <p className="text-lg">{dict.contact.body}</p>
            <div className="mt-8">
              <a
                href={`/${locale}/contact`}
                className="btn btn-primary"
              >
                {dict.contact.cta}
              </a>
            </div>
          </div>
        </Section>

        {/* ---------- Footer ---------- */}
        <footer className="border-t border-line">
          <div className="container-content flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
            <p className="label-mono">© {profileName}</p>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
