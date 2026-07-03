import { NextResponse } from "next/server";

// Rate limiting — simple in-memory store (resets on deploy)
const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 5; // max requests
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const company = String(data.company ?? "").trim(); // honeypot

  // Honeypot — bots get silent success
  if (company) {
    return NextResponse.json({ ok: true });
  }

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const to = process.env.CONTACT_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

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
