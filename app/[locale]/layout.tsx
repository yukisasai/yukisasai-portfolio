import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Hanken_Grotesk, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import { i18n, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { siteUrl, profileName, links } from "@/lib/site";
import "@/app/globals.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const ogLocale = locale === "ja" ? "ja_JP" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s | ${profileName}`,
    },
    description: dict.meta.description,
    keywords: [
      "AI Product Engineer",
      "Next.js",
      "TypeScript",
      "System Design",
      "RAG",
      "Web Development",
      "Yuki Sasai",
    ],
    authors: [{ name: profileName }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: "/ja",
        en: "/en",
        "x-default": `/${i18n.defaultLocale}`,
      },
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: profileName,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!i18n.locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileName,
    url: `${siteUrl}/${locale}`,
    jobTitle: "AI Product Engineer",
    sameAs: [links.github, links.linkedin, links.zenn],
  };

  return (
    <html lang={locale} className={`${sans.variable} ${jp.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#top" className="skip-link">
          {dict.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
