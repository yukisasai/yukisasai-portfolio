"use client";

import { useRef, useState } from "react";
import { links } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "not_configured";

type ContactFormDict = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  successTitle: string;
  successBody: string;
  notConfiguredTitle: string;
  notConfiguredBody: string;
  errorDefault: string;
  errorNetwork: string;
};

export function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Double-submit prevention
    if (submitting.current) return;
    submitting.current = true;
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
      if (res.status === 429) {
        setStatus("error");
        setErrorMsg(dict.errorDefault);
        return;
      }
      setStatus("error");
      setErrorMsg(body?.error ?? dict.errorDefault);
    } catch {
      setStatus("error");
      setErrorMsg(dict.errorNetwork);
    } finally {
      submitting.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card max-w-xl">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-50">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-ink" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-sans text-xl font-bold">{dict.successTitle}</p>
        <p className="mt-2 text-muted">{dict.successBody}</p>
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div role="status" className="card max-w-xl">
        <p className="font-sans text-xl font-bold">{dict.notConfiguredTitle}</p>
        <p className="mt-2 text-muted">{dict.notConfiguredBody}</p>
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

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6" noValidate>
      <div>
        <label htmlFor="name" className="label-mono mb-2 block">
          {dict.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={isSending}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="email" className="label-mono mb-2 block">
          {dict.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={isSending}
          className="field"
        />
      </div>

      <div>
        <label htmlFor="message" className="label-mono mb-2 block">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={isSending}
          className="field resize-y"
        />
      </div>

      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm" style={{ color: "#b00020" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSending}
        aria-disabled={isSending}
      >
        {isSending ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {dict.sending}
          </span>
        ) : (
          dict.send
        )}
      </button>
    </form>
  );
}
