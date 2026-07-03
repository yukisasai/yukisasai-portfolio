import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="ja">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#fff",
          color: "#111",
          margin: 0,
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#595959",
              marginBottom: "1rem",
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.125rem",
              color: "#595959",
              maxWidth: "28rem",
            }}
          >
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link
            href="/ja"
            style={{
              marginTop: "2.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              borderRadius: "999px",
              padding: "0.7rem 1.4rem",
              background: "#111",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            ← トップへ戻る
          </Link>
        </main>
      </body>
    </html>
  );
}
