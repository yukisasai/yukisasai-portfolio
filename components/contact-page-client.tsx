"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";
import { links } from "@/lib/site";

const ContactSuccessCtx = createContext<(() => void) | null>(null);

export function useContactSuccess() {
  return useContext(ContactSuccessCtx);
}

type Props = {
  children: React.ReactNode;
  successTitle: string;
  successBody: string;
  locale: string;
  backLabel: string;
};

export function ContactPageClient({
  children,
  successTitle,
  successBody,
  locale,
  backLabel,
}: Props) {
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink sm:h-24 sm:w-24">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-ink sm:h-12 sm:w-12"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-sans text-3xl font-bold sm:text-4xl md:text-5xl">
          {successTitle}
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          {successBody}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${locale}`} className="btn btn-primary">
            {backLabel}
          </Link>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            LinkedIn
          </a>
          <a
            href={links.x}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
          >
            X
          </a>
        </div>
      </main>
    );
  }

  return (
    <ContactSuccessCtx.Provider value={() => setSuccess(true)}>
      {children}
    </ContactSuccessCtx.Provider>
  );
}
