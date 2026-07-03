import type { CaseStudyItem } from "@/components/case-study";
import { getAllProjects, getFeaturedProjects } from "@/lib/content";

/** Map a ProjectEntry from Markdown to a CaseStudyItem for the UI. */
function toItem(p: Awaited<ReturnType<typeof getAllProjects>>[number]): CaseStudyItem {
  return {
    slug: p.slug,
    name: p.title,
    url: p.website,
    category: p.category,
    overview: p.summary,
    challenge: "",
    solution: "",
    result: "",
    role: p.role,
    techStack: p.tech,
    cta: { label: p.cta, href: p.website },
    image: p.image,
    contentHtml: p.contentHtml,
  };
}

/** Featured projects only (for the top page). */
export async function getFeaturedItems(locale: string): Promise<CaseStudyItem[]> {
  const projects = await getFeaturedProjects(locale);
  return projects.map(toItem);
}

/** All projects (for the /projects listing page). */
export async function getAllItems(locale: string): Promise<CaseStudyItem[]> {
  const projects = await getAllProjects(locale);
  return projects.map(toItem);
}
