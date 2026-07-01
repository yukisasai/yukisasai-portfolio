import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import { profile, siteUrl } from "@/lib/site";
import "./globals.css";

// 見出し用：Hanken Grotesk（英語見出し）
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// 日本語本文用：Noto Sans JP（重いので weight を絞り、preload しない）
const jp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});

// ラベル用：JetBrains Mono（小さなラベルのみ。preload しない）
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const title = `${profile.name} | ${profile.role}`;
const description =
  "AIとWeb技術で、世界で学び、地域へ価値を届けるGlobal AI Product Engineer。";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "AI Product Engineer",
    "Next.js",
    "TypeScript",
    "System Design",
    "RAG",
    "Web Development",
    "Yuki Sasai",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${sans.variable} ${jp.variable} ${mono.variable}`}>
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
