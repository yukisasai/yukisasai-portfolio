export type ProjectConfig = {
  slug: string;
  url: string;
  featured: boolean;
  techStack: string[];
};

export const projectConfigs: ProjectConfig[] = [
  {
    slug: "livvy",
    url: "https://livvy.jp/",
    featured: true,
    techStack: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
  },
  {
    slug: "nagase",
    url: "https://nagase-ltd.co.jp/",
    featured: true,
    techStack: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
  },
  {
    slug: "gym-landing-page",
    url: "https://seamlessly.site/gym/",
    featured: true,
    techStack: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "u2-official-store",
    url: "https://u2official.store/",
    featured: false,
    techStack: ["Shopify"],
  },
];
