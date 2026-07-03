import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { i18n } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/contact", "/now", "/uses", "/updates", "/learning", "/blog"];

  return pages.flatMap((page) =>
    i18n.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}${page}`])
        ),
      },
    }))
  );
}
