import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Where to buy — Lighthouse" },
      { name: "description", content: "Find a Lighthouse retailer or contact the company directly." },
      { property: "og:title", content: "Where to buy — Lighthouse" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Where to buy"
        title="Speak to us"
        intro="Find a retailer near you, request a catalog, or write to the company directly."
      />

      <section className="container-x grid gap-16 pb-32 md:grid-cols-12">
        <div className="md:col-span-5 space-y-10">
          <div>
            <div className="eyebrow">Headquarters</div>
            <address className="not-italic mt-4 text-sm leading-7 text-[color:var(--ink-muted)]">
              Lighthouse SH.P.K.<br />
              Veterrnik - 1<br />
              10000, Prishtine, XK<br />
              T +383 45 555 355<br />
              <a href="mailto:info@lighthouse-kos.com" className="hover:opacity-60">info@lighthouse-kos.com</a><br />
              <a href="https://www.instagram.com/lighthouse.studio" target="_blank" rel="noopener noreferrer" className="hover:opacity-60">@lighthouse.studio</a>
            </address>
          </div>
          <div>
            <div className="eyebrow">Trade enquiries</div>
            <p className="mt-4 text-sm text-[color:var(--ink-muted)] leading-relaxed">
              Architects, interior designers and resellers — request access
              to our trade catalog and pricing.
            </p>
          </div>
          <div>
            <div className="eyebrow">Hours</div>
            <p className="mt-4 text-sm text-[color:var(--ink-muted)]">
              Monday — Friday<br />
              09:00 — 18:00 CET
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          {sent ? (
            <div className="border border-[color:var(--ink-light)]/60 p-10 text-center">
              <div className="eyebrow">Thank you</div>
              <h2 className="h-section mt-4 text-2xl md:text-3xl">Your message has been sent</h2>
              <p className="mt-4 text-[color:var(--ink-muted)]">We will be in touch within two business days.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
              </div>
              <Field label="Company / studio" name="company" />
              <Field label="Country" name="country" />
              <div>
                <label className="eyebrow block">Message</label>
                <textarea
                  required
                  rows={6}
                  className="mt-2 w-full border border-[color:var(--ink-light)]/80 bg-transparent px-0 py-3 text-base outline-none focus:border-[color:var(--ink)]"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-[color:var(--ink)] px-8 py-4 text-sm tracking-wide text-white hover:opacity-90"
              >
                Send message <span aria-hidden>→</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent px-0 py-3 text-base outline-none focus:border-[color:var(--ink)]"
      />
    </div>
  );
}
