import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple のニュートラル（土台は白・グレー・黒）
        paper: "var(--paper)",
        cream: "var(--cream)",
        ink: "var(--ink)",
        mute: "var(--muted)",
        muted: "var(--muted)", // 既存クラス（text-muted）との互換
        line: "var(--line)",
        accent: { DEFAULT: "#86868B", light: "#C7C7CC", deep: "#6E6E73" },
        // Apple のブルー（link=本文中 / dark=暗い面の上）
        blue: { DEFAULT: "#0071E3", hover: "#0077ED", link: "#0066CC", dark: "#2997FF" },
        // カテゴリの差し色
        tag: {
          lp: "#0071E3", corporate: "#5856D6", wordpress: "#8944AB",
          migration: "#00827F", design: "#C7357A", seo: "#B25000", video: "#C4302B",
        },
      },
      fontFamily: {
        // Apple 公式サイトと同じ考え方：SF Pro を OS から使い、外部CDNには取りにいかない
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        jp: ["var(--font-jp)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: { wider2: "0.08em" },
      maxWidth: {
        content: "var(--content-width)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [],
};

export default config;
