import { NextResponse } from "next/server";

// お問い合わせ送信 API。
// 送信先・送信元・APIキーはすべて環境変数で管理（リポジトリに値は持たない）。
//   CONTACT_EMAIL  … 受信先メール（例: hello@yukisasai.com）※将来設定
//   CONTACT_FROM   … 送信元（Resend で検証済みドメインのアドレス）
//   RESEND_API_KEY … Resend の API キー
// いずれか未設定なら 503 not_configured を返し、フロントで代替導線を案内する。

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const company = String(data.company ?? "").trim(); // honeypot

  // ボットは静かに成功扱い（蜜壺に入力があれば送信しない）
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // バリデーション
  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  // メール送信が未設定なら、ここで明示的に知らせる
  if (!to || !apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Portfolio Contact — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
