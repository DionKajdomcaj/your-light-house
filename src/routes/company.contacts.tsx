import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/company/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — Lighthouse" },
      { name: "description", content: "Reach Lighthouse — Veterrnik 1, Prishtine, Kosovo." },
      { property: "og:title", content: "Contacts — Lighthouse" },
      { property: "og:url", content: "/company/contacts" },
    ],
    links: [{ rel: "canonical", href: "/company/contacts" }],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="container-x pt-10 pb-16">
        <h1 className="h-display text-4xl md:text-6xl">Contacts</h1>
      </section>

      <section className="container-x grid gap-12 pb-16 md:grid-cols-12">
        <div className="md:col-span-5 space-y-8">
          <div>
            <div className="eyebrow">Headquarters</div>
            <address className="not-italic mt-4 leading-7 text-[color:var(--ink-muted)]">
              Lighthouse SH.P.K.<br />
              Veterrnik - 1<br />
              10000, Prishtine, XK<br />
              T +383 45 555 355<br />
              <a href="mailto:info@lighthouse-kos.com" className="hover:opacity-60">info@lighthouse-kos.com</a><br />
              <a
                href="https://www.instagram.com/lighthouse.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
              >
                @lighthouse.studio
              </a>
            </address>
          </div>
          <div>
            <div className="eyebrow">Hours</div>
            <p className="mt-4 text-[color:var(--ink-muted)]">
              Monday — Friday, 09:00 — 18:00 CET
            </p>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="aspect-[16/10] w-full overflow-hidden border border-[color:var(--ink-light)]/40 grayscale">
            <iframe
              title="Map of Lighthouse headquarters"
              src="https://www.openstreetmap.org/export/embed.html?bbox=20.89%2C42.65%2C20.93%2C42.68&amp;layer=mapnik"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-20 border-t border-[color:var(--ink-light)]/40">
        <h2 className="h-section text-2xl md:text-3xl">Write to us</h2>
        {sent ? (
          <div className="mt-10 border border-[color:var(--ink-light)]/60 p-10 text-center">
            <div className="eyebrow">Thank you</div>
            <p className="mt-4 text-[color:var(--ink-muted)]">We will be in touch within two business days.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-10 grid gap-6 max-w-3xl"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field name="name" label="Name" />
              <Field name="email" label="Email" type="email" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field name="country" label="Country" />
              <Field name="subject" label="Subject" />
            </div>
            <div>
              <label className="eyebrow">Message</label>
              <textarea required rows={5} className="mt-2 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent px-0 py-3 outline-none focus:border-[color:var(--ink)]" />
            </div>
            <label className="flex items-start gap-3 text-sm text-[color:var(--ink-muted)]">
              <input type="checkbox" required className="mt-1" />
              I have read and accept the privacy policy.
            </label>
            <button type="submit" className="inline-flex items-center gap-3 self-start bg-[color:var(--ink)] px-8 py-4 text-sm text-white hover:opacity-90">
              Send message <span aria-hidden>→</span>
            </button>
          </form>
        )}
      </section>
    </>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      <input id={name} name={name} type={type} required className="mt-2 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent px-0 py-3 outline-none focus:border-[color:var(--ink)]" />
    </div>
  );
}
