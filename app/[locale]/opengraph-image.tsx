import { ImageResponse } from "next/og";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { profileName } from "@/lib/site";

export const alt = `${profileName} — Global AI Product Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#111111",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6b6b6b",
          }}
        >
          {dict.hero.role}
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 12 }}>
          {profileName}
        </div>
        <div
          style={{
            fontSize: 38,
            lineHeight: 1.3,
            color: "#111111",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {dict.hero.lead}
        </div>
      </div>
    ),
    { ...size }
  );
}
