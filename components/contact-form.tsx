"use client";

import { useState } from "react";
import { links } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "not_configured";

/**
 * お問い合わせフォーム。
 * 送信先メールは API 側の環境変数（CONTACT_EMAIL）で管理する。
 * メール/プロバイダ未設定のときは not_configured を返し、代替導線を案内する。
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = await res.json().catch(() => ({}));
      if (res.status === 503 || body?.error === "not_configured") {
        setStatus("not_configured");
        return;
      }
      setStatus("error");
      setErrorMsg(body?.error ?? "送信に失敗しました。時間をおいて再度お試しください。");
    } catch {
      setStatus("error");
      setErrorMsg("ネットワークエラーが発生しました。");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card max-w-xl">
        <p className="font-sans text-xl font-bold">Thank you.</p>
        <p className="mt-2 text-muted">
          メッセージを受け取りました。折り返しご連絡します。
        </p>
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div role="status" className="card max-w-xl">
        <p className="font-sans text-xl font-bold">準備中です</p>
        <p className="mt-2 text-muted">
          お問い合わせフォームは現在準備中です。お急ぎの場合は GitHub または
          LinkedIn からご連絡ください。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={links.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
            LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="label-mono mb-2 block">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="email" className="label-mono mb-2 block">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field"
        />
      </div>

      <div>
        <label htmlFor="message" className="label-mono mb-2 block">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="field resize-y"
        />
      </div>

      {/* スパム避け（人間には見えない蜜壺フィールド） */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm" style={{ color: "#b00020" }}>
          {errorMsg}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
