import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { RevealScript } from "@/components/reveal-script";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Footer } from "@/components/footer";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profileName, links } from "@/lib/site";
import { getFeaturedItems } from "@/lib/projects";
import { getTechStack, getCareerSteps, getServices, getProcessSteps } from "@/lib/data";
import { GitHubActivity } from "@/components/github-activity";
import { getZennArticles } from "@/lib/zenn";

/** 明るい面で使う差し色（順に巡回させる） */
const POP = ["text-[#0071E3]", "text-[#5856D6]", "text-[#8944AB]", "text-[#00827F]", "text-[#C7357A]", "text-[#B25000]", "text-[#C4302B]"];
const POP_DOT = ["bg-[#0071E3]", "bg-[#5856D6]", "bg-[#8944AB]", "bg-[#00827F]", "bg-[#C7357A]", "bg-[#B25000]", "bg-[#C4302B]"];
/** 暗い面で使う差し色（黒の上で映える明るさ）*/
const POP_DARK = ["text-[#2997FF]", "text-[#BF5AF2]", "text-[#30D158]", "text-[#FF375F]", "text-[#FF9F0A]", "text-[#40C8E0]", "text-[#7D7AFF]", "text-[#FFD60A]"];

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
  const zennArticles = await getZennArticles();

  return (
    <>
      <Nav dict={dict} locale={locale as Locale} />
      <RevealScript />

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:pb-24">
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,#CFE4FB_0%,rgba(207,228,251,0)_65%)] opacity-80" />
          <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,#EEDCFA_0%,rgba(238,220,250,0)_65%)] opacity-70" />
          <div className="container-content relative">
            <p className="eyebrow reveal">{dict.hero.role}</p>
            <h1 className="reveal mt-8 display text-[11vw] leading-[1.05] tracking-[-0.035em] md:text-[4.6rem] lg:text-[5.6rem] xl:text-[6.6rem]">
              {profileName.split(" ").map((word, i, arr) => (
                <span key={i} className={i === arr.length - 1 ? "pop-text" : undefined}>
                  {word}{i < arr.length - 1 && " "}
                </span>
              ))}
            </h1>
            <div className="reveal mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="text-xl font-medium tracking-wider md:text-2xl lg:text-3xl">{dict.hero.lead}</p>
                <p className="mt-4 text-[15px] leading-loose text-mute">{dict.hero.leadSub}</p>
                <p className="mt-6 text-[12px] tracking-wider text-mute">
                  {dict.hero.location} · {dict.hero.nameAlt}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:col-span-5 lg:gap-x-8">
                {dict.numbers.items.map((item: { value: string; label: string }) => (
                  <div key={item.label} className="min-w-0 border-t border-line pt-3">
                    <dd className="display break-words text-2xl md:text-2xl lg:text-3xl xl:text-4xl">{item.value}</dd>
                    <dt className="mt-1 text-[12px] text-mute">{item.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="reveal mt-12 flex flex-wrap gap-4">
              <a href="#projects" className="rounded-full bg-blue px-8 py-3 text-[15px] text-white transition hover:bg-blue-hover">
                {dict.hero.viewProjects} →
              </a>
              <Link href={`/${locale}/contact`} className="rounded-full border border-line px-8 py-3 text-[15px] text-blue-link transition hover:bg-cream">
                {dict.hero.contactMe}
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section className="container-content py-12 md:py-16">
          <SectionHeading id="about" en={dict.about.eyebrow} ja={dict.about.title} />
          <div className="mt-14 grid gap-12 md:grid-cols-12">
            <div className="reveal md:col-span-5">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[18px] bg-cream">
                <Image src="/yuki-sasai.webp" alt={profileName} fill
                  sizes="(min-width:768px) 42vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-6 display text-4xl">{profileName}</p>
              <p className="mt-2 text-sm">{dict.hero.nameAlt}</p>
              <p className="mt-4 text-xs leading-relaxed text-mute">{dict.hero.role}</p>
            </div>
            <div className="reveal space-y-6 text-[15px] leading-[2.1] md:col-span-7">
              {dict.about.body.map((p: string) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* ---------- Career ---------- */}
        <section className="bg-cream py-12 md:py-16">
          <div className="container-content">
            <SectionHeading id="career" en={dict.career.title} ja={dict.career.eyebrow} />
            <ol className="relative mt-14 border-l border-line pl-8 md:pl-12">
              {careerSteps.map((step, i) => (
                <li key={step.title} className="reveal relative pb-10 last:pb-0">
                  <span className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full md:-left-[53px] ${POP_DOT[i % POP_DOT.length]}`} />
                  <div className="grid gap-2 md:grid-cols-12 md:gap-8">
                    <p className={`display text-2xl md:col-span-2 ${POP[i % POP.length]}`}>
                      {step.year ?? step.icon ?? "→"}
                    </p>
                    <div className="md:col-span-10">
                      <p className="text-[16px] font-medium">{step.title}</p>
                      <p className="mt-1 text-[13px] text-mute">{step.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Projects（実績：中身は既存のまま、並べ方を揃える） ---------- */}
        <section className="bg-cream py-12 md:py-16">
          <div className="container-content">
            <SectionHeading
              id="projects"
              en={dict.projects.title}
              ja={dict.projects.description}
              count={String(featuredProjects.length).padStart(2, "0")}
            />
            <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2">
              {featuredProjects.map((project, i) => (
                <div key={project.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
                  <ProjectCard
                    project={project}
                    locale={locale}
                    index={i}
                    total={featuredProjects.length}
                    color={i}
                  />
                </div>
              ))}
            </div>
            <div className="reveal mt-20 text-center">
              <Link
                href={`/${locale}/projects`}
                className="inline-flex items-center gap-3 rounded-full bg-blue px-10 py-3.5 text-[15px] text-white transition hover:bg-blue-hover"
              >
                {dict.projects.viewAll} →
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section className="bg-black py-12 text-white md:py-16">
          <div className="container-content">
            <SectionHeading id="services" en={dict.services.eyebrow} ja={dict.services.title} dark />
            <ul className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((item, i) => (
                <li key={item.name} className="reveal flex min-h-[160px] flex-col justify-between bg-black p-7">
                  <span className={`display text-3xl ${POP_DARK[i % POP_DARK.length]}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-8 text-[15px]">
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 rounded-full border border-blue-dark px-2 py-[1px] text-[10px] tracking-wider text-blue-dark">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section className="container-content py-12 md:py-16">
          <SectionHeading id="process" en={dict.process.eyebrow} ja={dict.process.title} />
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <li key={step.title} className="reveal border-t border-line pt-6">
                <p className={`display text-2xl ${POP[i % POP.length]}`}>{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-4 display text-3xl">{step.title}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-mute">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Skills ---------- */}
        <section className="bg-cream py-12 md:py-16">
          <div className="container-content">
            <SectionHeading id="skills" en={dict.skills.title} />
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {techStack.map((group, i) => (
                <div key={group.label} className="reveal">
                  <p className={`text-[11px] uppercase tracking-wider2 ${POP[i % POP.length]}`}>{group.label}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item.name} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12px]">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="reveal mt-16 border-t border-line pt-10">
              <p className="display text-3xl">{dict.systemDesign.title}</p>
              <p className="mt-3 text-[13px] text-mute">{dict.systemDesign.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {dict.systemDesign.items.map((item: string) => (
                  <li key={item} className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-[12px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Writing & GitHub ---------- */}
        <section className="container-content py-12 md:py-16">
          <SectionHeading id="writing" en={dict.writing.title} ja={dict.writing.description} />
          <div className="mt-14 grid gap-14 md:grid-cols-12">
            <div className="reveal md:col-span-5">
              <a
                href={links.zenn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 text-[14px] text-blue-link transition hover:bg-cream"
              >
                {dict.writing.cta} ↗
              </a>
              {zennArticles && zennArticles.length > 0 && (
                <ul className="mt-10 space-y-4">
                  {zennArticles.map((article) => (
                    <li key={article.url}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-baseline justify-between gap-4 border-t border-line pt-4"
                      >
                        <span className="text-[14px] transition-colors group-hover:text-blue-link">
                          {article.title}
                        </span>
                        <time dateTime={article.publishedAt} className="shrink-0 text-[12px] text-mute">
                          {new Date(article.publishedAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[13px]">
                {([["GitHub", links.github], ["LinkedIn", links.linkedin], ["X", links.x]] as const)
                  .filter(([, href]) => href)
                  .map(([label, href]) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noreferrer" className="link-underline text-blue-link">
                        {label} ↗
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="reveal md:col-span-7">
              <GitHubActivity />
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="scroll-mt-20 bg-cream py-12 md:py-16">
          <div className="container-content text-center">
            <p className="eyebrow reveal">{dict.contact.eyebrow}</p>
            <h2 className="reveal mt-6 display text-4xl leading-[1.1] md:text-6xl md:leading-[1.5]">
              {dict.contact.title.split("\n").map((line: string, i: number, arr: string[]) => (
                <span key={i} className={i === arr.length - 1 && arr.length > 1 ? "pop-text" : undefined}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="reveal mx-auto mt-8 max-w-xl text-[15px] leading-loose text-mute">
              {dict.contact.body}
            </p>
            <div className="reveal mt-12">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 rounded-full bg-blue px-10 py-3.5 text-[15px] text-white transition hover:bg-blue-hover"
              >
                {dict.contact.cta} →
              </Link>
            </div>
          </div>
        </section>

        <Footer locale={locale as Locale} />
      </main>
    </>
  );
}
