import { NextResponse } from "next/server";
import { saveToNotion } from "@/lib/notion";

// ---------------------------------------------------------------------------
// Rate limiting — simple in-memory store (resets on deploy)
// ---------------------------------------------------------------------------
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// ---------------------------------------------------------------------------
// Allowed fixed values (Japanese — source of truth)
// ---------------------------------------------------------------------------
const CATEGORIES = [
  "Webサイト制作",
  "WordPress制作・改修",
  "システム開発",
  "AI活用・自動化",
  "UI/UXデザイン",
  "技術相談",
  "その他",
];

const BUDGETS = [
  "未定",
  "〜10万円",
  "10〜30万円",
  "30〜50万円",
  "50〜100万円",
  "100万円以上",
];

const DEADLINES = [
  "できるだけ早く",
  "1ヶ月以内",
  "3ヶ月以内",
  "相談したい",
];

const REFERRALS = [
  "Google検索",
  "LinkedIn",
  "Facebook",
  "GitHub",
  "Zenn",
  "紹介",
  "その他",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Fields
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const category = String(data.category ?? "").trim();
  const message = String(data.message ?? "").trim();
  const companyName = String(data.companyName ?? "").trim();
  const companyUrl = String(data.companyUrl ?? "").trim();
  const budget = String(data.budget ?? "").trim();
  const deadline = String(data.deadline ?? "").trim();
  const referral = String(data.referral ?? "").trim();
  const hp = String(data._hp ?? "").trim(); // honeypot

  // Honeypot — bots get silent success
  if (hp) {
    return NextResponse.json({ ok: true });
  }

  // Required field validation
  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "invalid_category" }, { status: 400 });
  }

  // Optional field validation
  if (budget && !BUDGETS.includes(budget)) {
    return NextResponse.json({ error: "invalid_budget" }, { status: 400 });
  }
  if (deadline && !DEADLINES.includes(deadline)) {
    return NextResponse.json({ error: "invalid_deadline" }, { status: 400 });
  }
  if (referral && !REFERRALS.includes(referral)) {
    return NextResponse.json({ error: "invalid_referral" }, { status: 400 });
  }
  if (companyUrl && !URL_RE.test(companyUrl)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  // -----------------------------------------------------------------------
  // Resend — admin notification
  // -----------------------------------------------------------------------
  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!to || !apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const lines = [
    `お名前: ${name}`,
    `メールアドレス: ${email}`,
    `お問い合わせ種別: ${category}`,
    companyName ? `会社名: ${companyName}` : null,
    companyUrl ? `会社URL: ${companyUrl}` : null,
    budget ? `ご予算: ${budget}` : null,
    deadline ? `希望納期: ${deadline}` : null,
    referral ? `流入元: ${referral}` : null,
    "",
    "── ご相談内容 ──",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const adminRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `【お問い合わせ】${category} — ${name}`,
      text: lines,
    }),
  });

  if (!adminRes.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  // -----------------------------------------------------------------------
  // Auto-reply to the sender (fire-and-forget)
  // -----------------------------------------------------------------------
  const replyLines = [
    `${name} 様`,
    "",
    "この度はお問い合わせいただき、ありがとうございます。",
    "以下の内容で承りました。",
    "",
    "─────────────────────────",
    `お問い合わせ種別: ${category}`,
    companyName ? `会社名: ${companyName}` : null,
    budget ? `ご予算: ${budget}` : null,
    deadline ? `希望納期: ${deadline}` : null,
    "",
    "── ご相談内容 ──",
    message,
    "─────────────────────────",
    "",
    "内容を確認し、通常24時間以内にご返信いたします。",
    "お急ぎの場合は、下記よりご連絡ください。",
    "",
    "LinkedIn: https://www.linkedin.com/in/%E8%A3%95%E5%B8%8C-%E4%BD%90%E3%80%85%E4%BA%95-031837235/",
    "X (DM): https://x.com/seamlessly_yuki",
    "",
    "──",
    "Yuki Sasai",
    "https://yuki-creatives.com",
  ]
    .filter((l) => l !== null)
    .join("\n");

  fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject: "【Yuki Sasai】お問い合わせありがとうございます",
      text: replyLines,
    }),
  }).catch(() => {
    // fire-and-forget — don't block the response
  });

  // -----------------------------------------------------------------------
  // Notion save (fire-and-forget)
  // -----------------------------------------------------------------------
  saveToNotion({
    name,
    email,
    category,
    message,
    companyName: companyName || undefined,
    companyUrl: companyUrl || undefined,
    budget: budget || undefined,
    deadline: deadline || undefined,
    referral: referral || undefined,
  }).catch((err) => {
    console.error("[notion] Failed to save contact entry:", err);
  });

  return NextResponse.json({ ok: true });
}
