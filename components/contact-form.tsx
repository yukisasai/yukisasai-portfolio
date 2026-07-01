"use client";

import { useState } from "react";
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
      setErrorMsg(body?.error ?? dict.errorDefault);
    } catch {
      setStatus("error");
      setErrorMsg(dict.errorNetwork);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="card max-w-xl">
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

      <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
        {status === "sending" ? dict.sending : dict.send}
      </button>
    </form>
  );
}
