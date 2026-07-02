import { projectConfigs } from "@/data/projects";
import type { CaseStudyItem } from "@/components/case-study";
import type { Dictionary } from "@/i18n/get-dictionary";

/**
 * Merge language-independent config with translated text to produce
 * CaseStudyItem[]. The dictionary's `projects.items` is keyed by slug.
 */
function buildItems(
  dict: Dictionary,
  filter?: (cfg: (typeof projectConfigs)[number]) => boolean,
): CaseStudyItem[] {
  const items = dict.projects.items as Record<
    string,
    {
      name: string;
      category: string;
      overview: string;
      challenge: string;
      solution: string;
      result: string;
      role: string[];
      cta: string;
    }
  >;

  return projectConfigs
    .filter(filter ?? (() => true))
    .map((cfg) => {
      const t = items[cfg.slug];
      return {
        slug: cfg.slug,
        name: t.name,
        url: cfg.url,
        category: t.category,
        overview: t.overview,
        challenge: t.challenge,
        solution: t.solution,
        result: t.result,
        role: t.role,
        techStack: cfg.techStack,
        cta: { label: t.cta, href: cfg.url },
      };
    });
}

/** Featured projects only (for the top page). */
export function getFeaturedItems(dict: Dictionary): CaseStudyItem[] {
  return buildItems(dict, (cfg) => cfg.featured);
}

/** All projects (for the /projects listing page). */
export function getAllItems(dict: Dictionary): CaseStudyItem[] {
  return buildItems(dict);
}
