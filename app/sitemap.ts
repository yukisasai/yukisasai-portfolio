import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { i18n } from "@/i18n/config";
import { getProjectSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/projects",
    "/contact",
    "/now",
    "/uses",
    "/updates",
    "/learning",
    "/blog",
  ];

  const staticEntries = staticPages.flatMap((page) =>
    i18n.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}${page}`]),
        ),
      },
    })),
  );

  // Dynamic project detail pages
  const slugs = getProjectSlugs();
  const projectEntries = slugs.flatMap((slug) =>
    i18n.locales.map((locale) => ({
      url: `${siteUrl}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [
            l,
            `${siteUrl}/${l}/projects/${slug}`,
          ]),
        ),
      },
    })),
  );

  return [...staticEntries, ...projectEntries];
}
