import { ImageResponse } from "next/og";
import { profile } from "@/lib/site";

// SNS シェア用の OGP 画像を動的生成（白基調・ミニマル）
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          {profile.role}
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 12 }}>
          {profile.name}
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
          {profile.heroLead}
        </div>
      </div>
    ),
    { ...size }
  );
}
