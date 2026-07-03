import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { i18n, type Locale } from "@/i18n/config";

const contentDir = path.join(process.cwd(), "content");

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------

function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

/** Try requested locale first, then fall back to defaultLocale. */
function resolveContent(
  dir: string,
  locale: string,
  filename: string,
): string | null {
  const primary = path.join(dir, locale, filename);
  const raw = readFile(primary);
  if (raw) return raw;

  if (locale !== i18n.defaultLocale) {
    return readFile(path.join(dir, i18n.defaultLocale, filename));
  }
  return null;
}

export async function markdownToHtml(md: string): Promise<string> {
  const result = await remark().use(html).process(md);
  return result.toString();
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectFrontmatter = {
  title: string;
  category: string;
  status: string;
  publishedAt: string;
  featured: boolean;
  tech: string[];
  website: string;
  summary: string;
  role: string[];
  cta: string;
  image?: string;
};

export type ProjectEntry = ProjectFrontmatter & {
  slug: string;
  contentHtml: string;
};

function getProjectFiles(locale: string): string[] {
  const dir = path.join(contentDir, "projects", locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function resolveProjectFiles(locale: string): { file: string; dir: string }[] {
  const localeDir = path.join(contentDir, "projects", locale);
  const fallbackDir = path.join(contentDir, "projects", i18n.defaultLocale);

  const localeFiles = getProjectFiles(locale);
  if (localeFiles.length > 0) {
    return localeFiles.map((f) => ({ file: f, dir: localeDir }));
  }
  if (locale !== i18n.defaultLocale) {
    const fallbackFiles = getProjectFiles(i18n.defaultLocale);
    return fallbackFiles.map((f) => ({ file: f, dir: fallbackDir }));
  }
  return [];
}

async function parseProject(
  filePath: string,
  slug: string,
): Promise<ProjectEntry> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const contentHtml = await markdownToHtml(content);
  return { ...(data as ProjectFrontmatter), slug, contentHtml };
}

export async function getAllProjects(locale: string): Promise<ProjectEntry[]> {
  const files = resolveProjectFiles(locale);
  const entries = await Promise.all(
    files.map(({ file, dir }) => {
      const slug = file.replace(/\.md$/, "");
      return parseProject(path.join(dir, file), slug);
    }),
  );
  return entries
    .filter((e) => e.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export async function getFeaturedProjects(
  locale: string,
): Promise<ProjectEntry[]> {
  const all = await getAllProjects(locale);
  return all.filter((p) => p.featured);
}

export async function getProjectBySlug(
  locale: string,
  slug: string,
): Promise<ProjectEntry | null> {
  const all = await getAllProjects(locale);
  return all.find((p) => p.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  const dir = path.join(contentDir, "projects", i18n.defaultLocale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export type BlogFrontmatter = {
  title: string;
  publishedAt: string;
  summary: string;
  status?: string;
};

export type BlogEntry = BlogFrontmatter & {
  slug: string;
  contentHtml: string;
};

export async function getBlogPosts(locale: string): Promise<BlogEntry[]> {
  const dir = path.join(contentDir, "blog", locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const contentHtml = await markdownToHtml(content);
      const slug = file.replace(/\.md$/, "");
      return { ...(data as BlogFrontmatter), slug, contentHtml };
    }),
  );

  return entries
    .filter((e) => e.status !== "draft")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

// ---------------------------------------------------------------------------
// Now
// ---------------------------------------------------------------------------

export type NowContent = {
  contentHtml: string;
  updatedAt: string | null;
};

export async function getNowContent(locale: string): Promise<NowContent | null> {
  const raw =
    readFile(path.join(contentDir, "now", `${locale}.md`)) ??
    (locale !== i18n.defaultLocale
      ? readFile(path.join(contentDir, "now", `${i18n.defaultLocale}.md`))
      : null);

  if (!raw) return null;
  const { data, content } = matter(raw);
  const contentHtml = await markdownToHtml(content);
  return { contentHtml, updatedAt: (data.updatedAt as string) ?? null };
}

// ---------------------------------------------------------------------------
// Updates
// ---------------------------------------------------------------------------

export type UpdateEntry = {
  date: string;
  contentHtml: string;
  title?: string;
};

export async function getUpdates(limit?: number): Promise<UpdateEntry[]> {
  const dir = path.join(contentDir, "updates");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const contentHtml = await markdownToHtml(content);
      const date = file.replace(/\.md$/, "");
      return { date, contentHtml, title: data.title as string | undefined };
    }),
  );

  const sorted = entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

// ---------------------------------------------------------------------------
// Learning
// ---------------------------------------------------------------------------

export type LearningFrontmatter = {
  title: string;
  status: string;
  level: string;
};

export type LearningEntry = LearningFrontmatter & {
  slug: string;
  contentHtml: string;
};

export async function getLearningTopics(
  locale: string,
): Promise<LearningEntry[]> {
  const dir = path.join(contentDir, "learning", locale);
  const fallbackDir = path.join(contentDir, "learning", i18n.defaultLocale);
  const targetDir = fs.existsSync(dir) && fs.readdirSync(dir).length > 0 ? dir : fallbackDir;

  if (!fs.existsSync(targetDir)) return [];
  const files = fs.readdirSync(targetDir).filter((f) => f.endsWith(".md"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const content = fs.readFileSync(path.join(targetDir, file), "utf-8");
      const { data, content: md } = matter(content);
      const contentHtml = await markdownToHtml(md);
      const slug = file.replace(/\.md$/, "");
      return { ...(data as LearningFrontmatter), slug, contentHtml };
    }),
  );

  return entries;
}
