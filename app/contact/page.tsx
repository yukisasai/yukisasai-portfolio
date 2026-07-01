import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.body,
};

export default function ContactPage() {
  return (
    <main id="top" className="container-content min-h-screen py-24">
      <Link href="/" className="label-mono link-underline">
        ← Back
      </Link>

      <h1 className="mt-10 font-sans text-4xl font-bold sm:text-5xl">
        {contact.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{contact.body}</p>

      <div className="mt-12">
        <ContactForm />
      </div>
    </main>
  );
}
