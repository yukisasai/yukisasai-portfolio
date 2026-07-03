import type { MetadataRoute } from "next";
import { profileName, siteUrl } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profileName} — AI Product Engineer`,
    short_name: profileName,
    description:
      "Web制作で50件以上の実績を持ち、AIプロダクト開発へ領域を広げるエンジニア。",
    start_url: "/ja",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
