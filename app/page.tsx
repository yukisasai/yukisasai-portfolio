import { Nav } from "@/components/nav";
import { RevealScript } from "@/components/reveal-script";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";
import {
  profile,
  links,
  about,
  skills,
  systemDesign,
  writing,
  contact,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav />
      <RevealScript />

      <main id="top" className="pt-16">
        {/* ---------- Hero ---------- */}
        {/* Hero は above-the-fold。reveal(opacity:0)で隠すと LCP が遅れるため即表示する。 */}
        <section className="container-content flex min-h-[82vh] flex-col justify-center py-24">
          <p className="eyebrow mb-6">{profile.role}</p>
          <h1 className="font-sans text-5xl font-bold sm:text-6xl md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-2xl leading-snug sm:text-3xl">
            {profile.heroLead}
          </p>
          <p className="mt-4 max-w-xl text-lg text-muted">{profile.heroLeadJa}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>
          <p className="label-mono mt-10">
            {profile.location} · {profile.nameJa}
          </p>
        </section>

        {/* ---------- About ---------- */}
        <Section id="about" eyebrow={about.eyebrow} title={about.title}>
          <div className="max-w-2xl space-y-5 text-lg reveal">
            {about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        {/* ---------- Projects / Case Studies ---------- */}
        <Section
          id="projects"
          eyebrow="Projects"
          title="Case Studies"
          description="設計から実装・デプロイまで、一気通貫で手がけたプロダクト。"
        >
          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project.slug} className="reveal">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- System Design ---------- */}
        <Section
          id="system-design"
          eyebrow={systemDesign.eyebrow}
          title={systemDesign.title}
          description={systemDesign.description}
        >
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {systemDesign.items.map((item) => (
              <li key={item} className="card reveal !p-5 text-base">
                {item}
              </li>
            ))}
          </ul>
          {/* TODO: system-design-study リポジトリ公開後に repo リンクをここに表示する。
              （未公開のうちは 404 リンクを作らないため非表示） */}
        </Section>

        {/* ---------- Skills ---------- */}
        <Section id="skills" eyebrow="Skills" title="Skills">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label} className="reveal">
                <h3 className="font-sans text-xl font-bold">{group.label}</h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Writing & Learning ---------- */}
        <Section
          id="writing"
          eyebrow={writing.eyebrow}
          title={writing.title}
          description={writing.description}
        >
          <div className="reveal">
            <a
              href={writing.cta.href}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              {writing.cta.label}
            </a>
          </div>
        </Section>

        {/* ---------- Contact ---------- */}
        <Section id="contact" eyebrow={contact.eyebrow} title={contact.title}>
          <div className="max-w-2xl reveal">
            <p className="text-lg">{contact.body}</p>
            <div className="mt-8">
              <a href={contact.cta.href} className="btn btn-primary">
                {contact.cta.label}
              </a>
            </div>
          </div>
        </Section>

        {/* ---------- Footer ---------- */}
        <footer className="border-t border-line">
          <div className="container-content flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
            <p className="label-mono">© {profile.name}</p>
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
          </div>
        </footer>
      </main>
    </>
  );
}
