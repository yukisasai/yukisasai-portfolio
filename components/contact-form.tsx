"use client";

import { useRef, useState } from "react";
import { links } from "@/lib/site";

// ---------------------------------------------------------------------------
// Fixed values — always sent as Japanese regardless of UI locale
// ---------------------------------------------------------------------------
const CATEGORY_VALUES = [
  "Webサイト制作",
  "WordPress制作・改修",
  "システム開発",
  "AI活用・自動化",
  "UI/UXデザイン",
  "技術相談",
  "その他",
] as const;

const BUDGET_VALUES = [
  "未定",
  "〜10万円",
  "10〜30万円",
  "30〜50万円",
  "50〜100万円",
  "100万円以上",
] as const;

const DEADLINE_VALUES = [
  "できるだけ早く",
  "1ヶ月以内",
  "3ヶ月以内",
  "相談したい",
] as const;

const REFERRAL_VALUES = [
  "Google検索",
  "LinkedIn",
  "Facebook",
  "GitHub",
  "Zenn",
  "紹介",
  "その他",
] as const;

// Map keys used in messages JSON to fixed Japanese values
const CATEGORY_KEYS = ["website", "wordpress", "system", "ai", "uiux", "consulting", "other"] as const;
const BUDGET_KEYS = ["undecided", "under10", "10to30", "30to50", "50to100", "over100"] as const;
const DEADLINE_KEYS = ["asap", "within1month", "within3months", "discuss"] as const;
const REFERRAL_KEYS = ["google", "linkedin", "facebook", "github", "zenn", "referral", "other"] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Status = "idle" | "sending" | "success" | "error" | "not_configured";

type FieldErrors = {
  name?: string;
  email?: string;
  category?: string;
  message?: string;
  companyUrl?: string;
};

type ContactFormDict = {
  requiredSection: string;
  optionalSection: string;
  name: string;
  email: string;
  category: string;
  message: string;
  companyName: string;
  companyUrl: string;
  budget: string;
  deadline: string;
  referral: string;
  selectPlaceholder: string;
  required: string;
  optional: string;
  categoryOptions: Record<(typeof CATEGORY_KEYS)[number], string>;
  budgetOptions: Record<(typeof BUDGET_KEYS)[number], string>;
  deadlineOptions: Record<(typeof DEADLINE_KEYS)[number], string>;
  referralOptions: Record<(typeof REFERRAL_KEYS)[number], string>;
  send: string;
  sending: string;
  successTitle: string;
  successBody: string;
  notConfiguredTitle: string;
  notConfiguredBody: string;
  errorDefault: string;
  errorNetwork: string;
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    categoryRequired: string;
    messageRequired: string;
    urlInvalid: string;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;

// ---------------------------------------------------------------------------
// Chevron icon for selects
// ---------------------------------------------------------------------------
function ChevronIcon() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ContactForm({ dict }: { dict: ContactFormDict }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const submitting = useRef(false);

  function validate(fd: FormData): FieldErrors {
    const errors: FieldErrors = {};

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const category = String(fd.get("category") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const companyUrl = String(fd.get("companyUrl") ?? "").trim();

    if (!name) errors.name = dict.validation.nameRequired;
    if (!email) errors.email = dict.validation.emailRequired;
    else if (!EMAIL_RE.test(email)) errors.email = dict.validation.emailInvalid;
    if (!category) errors.category = dict.validation.categoryRequired;
    if (!message) errors.message = dict.validation.messageRequired;
    if (companyUrl && !URL_RE.test(companyUrl)) errors.companyUrl = dict.validation.urlInvalid;

    return errors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting.current) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const errors = validate(fd);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    submitting.current = true;
    setStatus("sending");
    setErrorMsg("");

    const data = Object.fromEntries(fd.entries());

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

  // -----------------------------------------------------------------------
  // Success screen
  // -----------------------------------------------------------------------
  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center sm:py-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink sm:h-16 sm:w-16">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-ink sm:h-8 sm:w-8"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h3 className="font-sans text-xl font-bold sm:text-2xl">
          {dict.successTitle}
        </h3>

        <div className="mt-5 max-w-sm space-y-2 text-sm leading-relaxed text-muted sm:text-base">
          <p>{dict.successBody}</p>
        </div>

        <div className="mt-8 flex gap-3">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary text-sm"
          >
            LinkedIn
          </a>
          <a
            href={links.x}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary text-sm"
          >
            X
          </a>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Not configured screen
  // -----------------------------------------------------------------------
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

  // -----------------------------------------------------------------------
  // Form
  // -----------------------------------------------------------------------
  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-8" noValidate>
      {/* ── Required section ── */}
      <p className="font-mono text-xs font-medium tracking-wider text-muted uppercase">
        {dict.requiredSection}
      </p>

      {/* Name */}
      <div>
        <label htmlFor="name" className="label-mono mb-2 block">
          {dict.name} <span className="text-muted">*</span>
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
        {fieldErrors.name && (
          <p className="mt-1 text-sm" style={{ color: "#b00020" }}>{fieldErrors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-mono mb-2 block">
          {dict.email} <span className="text-muted">*</span>
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
        {fieldErrors.email && (
          <p className="mt-1 text-sm" style={{ color: "#b00020" }}>{fieldErrors.email}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="label-mono mb-2 block">
          {dict.category} <span className="text-muted">*</span>
        </label>
        <div className="relative">
          <select
            id="category"
            name="category"
            required
            disabled={isSending}
            defaultValue=""
            className="field appearance-none pr-10"
          >
            <option value="" disabled>
              {dict.selectPlaceholder}
            </option>
            {CATEGORY_KEYS.map((key, i) => (
              <option key={key} value={CATEGORY_VALUES[i]}>
                {dict.categoryOptions[key]}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
        {fieldErrors.category && (
          <p className="mt-1 text-sm" style={{ color: "#b00020" }}>{fieldErrors.category}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label-mono mb-2 block">
          {dict.message} <span className="text-muted">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          disabled={isSending}
          className="field resize-none"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm" style={{ color: "#b00020" }}>{fieldErrors.message}</p>
        )}
      </div>

      {/* ── Divider ── */}
      <hr className="border-line" />

      {/* ── Optional section ── */}
      <p className="font-mono text-xs font-medium tracking-wider text-muted uppercase">
        {dict.optionalSection}
      </p>

      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="label-mono mb-2 block">
          {dict.companyName}
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          autoComplete="organization"
          disabled={isSending}
          className="field"
        />
      </div>

      {/* Company URL */}
      <div>
        <label htmlFor="companyUrl" className="label-mono mb-2 block">
          {dict.companyUrl}
        </label>
        <input
          id="companyUrl"
          name="companyUrl"
          type="url"
          autoComplete="url"
          placeholder="https://"
          disabled={isSending}
          className="field"
        />
        {fieldErrors.companyUrl && (
          <p className="mt-1 text-sm" style={{ color: "#b00020" }}>{fieldErrors.companyUrl}</p>
        )}
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className="label-mono mb-2 block">
          {dict.budget}
        </label>
        <div className="relative">
          <select
            id="budget"
            name="budget"
            disabled={isSending}
            defaultValue=""
            className="field appearance-none pr-10"
          >
            <option value="">{dict.selectPlaceholder}</option>
            {BUDGET_KEYS.map((key, i) => (
              <option key={key} value={BUDGET_VALUES[i]}>
                {dict.budgetOptions[key]}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label htmlFor="deadline" className="label-mono mb-2 block">
          {dict.deadline}
        </label>
        <div className="relative">
          <select
            id="deadline"
            name="deadline"
            disabled={isSending}
            defaultValue=""
            className="field appearance-none pr-10"
          >
            <option value="">{dict.selectPlaceholder}</option>
            {DEADLINE_KEYS.map((key, i) => (
              <option key={key} value={DEADLINE_VALUES[i]}>
                {dict.deadlineOptions[key]}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className="label-mono mb-2 block">
          {dict.referral}
        </label>
        <div className="relative">
          <select
            id="referral"
            name="referral"
            disabled={isSending}
            defaultValue=""
            className="field appearance-none pr-10"
          >
            <option value="">{dict.selectPlaceholder}</option>
            {REFERRAL_KEYS.map((key, i) => (
              <option key={key} value={REFERRAL_VALUES[i]}>
                {dict.referralOptions[key]}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
      </div>

      {/* Honeypot */}
      <div aria-hidden className="hidden">
        <label htmlFor="_hp">HP</label>
        <input id="_hp" name="_hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p role="alert" className="text-sm" style={{ color: "#b00020" }}>
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary mx-auto block"
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
