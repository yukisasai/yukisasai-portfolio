// =============================================================
// サイト全体の文章・リンク・データはこのファイルで管理します。
// （プロジェクトの実績データは data/projects.ts に分離）
// コンポーネントには直接書かず、ここを編集してください。
// =============================================================

/** 本番公開URL（OGP / canonical の基準。独自ドメイン取得後に差し替え） */
export const siteUrl = "https://yukisasai-portfolio.vercel.app";

/** プロフィール基本情報（Hero） */
export const profile = {
  name: "Yuki Sasai",
  nameJa: "佐々井 裕希",
  role: "Global AI Product Engineer",
  location: "Tokyo, Japan · Remote",
  // Hero 英語リード
  heroLead: "Designing and building AI-powered products for businesses and communities.",
  // Hero 日本語補足
  heroLeadJa: "AIとWeb技術で、世界で学び、地域へ価値を届ける。",
};

/**
 * ★リンク類（後で実値に差し替え）
 *  - github / linkedin: プロフィールURL
 *  - zenn: 学習ログの発信先（今は仮で zenn トップ）
 */
export const links = {
  github: "https://github.com/yuki-webcreator",
  linkedin:
    "https://www.linkedin.com/in/%E8%A3%95%E5%B8%8C-%E4%BD%90%E3%80%85%E4%BA%95-031837235/",
  zenn: "https://zenn.dev/seamlessly",
};

/** About */
export const about = {
  eyebrow: "About",
  title: "Design, build, ship.",
  body: [
    "AIを軸に、プロダクトの設計から実装までを動かせるエンジニアです。",
    "Next.js・TypeScript を中心に、AIを組み込んだ実際に使えるプロダクトをつくります。",
    "作ったものは GitHub と Zenn に公開し、学びを止めずにアウトプットし続けるスタイル。",
    "世界で学び、地域へ価値を届ける——その両方を行き来しながら働くことを目指しています。",
  ],
};

/** Skills */
export const skills: { label: string; items: string[] }[] = [
  {
    label: "AI",
    items: ["LLM Apps", "RAG", "Prompt Engineering", "OpenAI / Anthropic API"],
  },
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    label: "Backend / Infra",
    items: ["Node.js", "Supabase / Postgres", "Vercel", "API Design"],
  },
];

/** System Design（設計できる人であることを伝えるセクション） */
export const systemDesign = {
  eyebrow: "System Design",
  title: "System Design",
  description:
    "I focus on designing scalable and maintainable systems before writing code.",
  items: [
    "Requirements",
    "ER Diagram",
    "API Design",
    "Authentication",
    "Authorization",
    "Security",
    "Architecture",
  ],
  // TODO: system-design-study リポジトリが公開されたらリンクを表示する。
  // 公開までは page.tsx 側で非表示（404 リンクを作らないため）。
  repo: {
    label: "system-design-study",
    href: "https://github.com/yuki-webcreator/system-design-study",
  },
};

/** Writing & Learning */
export const writing = {
  eyebrow: "Writing & Learning",
  title: "Writing & Learning",
  description:
    "I document what I learn about Next.js, TypeScript, system design, AI, and product development.",
  cta: { label: "Read on Zenn", href: links.zenn },
};

/** Contact（トップでは「Contact Me」ボタンのみ。フォームは /contact） */
export const contact = {
  eyebrow: "Contact",
  title: "Let's build something together.",
  body:
    "AI product development, web systems, and local DX projects — feel free to reach out.",
  cta: { label: "Contact Me", href: "/contact" },
};
