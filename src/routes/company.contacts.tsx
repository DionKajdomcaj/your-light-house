import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/company/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — Lighthouse" },
      { name: "description", content: "Reach Lighthouse — headquarters in Mirano (VE), Italy." },
      { property: "og:title", content: "Contacts — Lighthouse" },
      { property: "og:url", content: "/company/contacts" },
    ],
    links: [{ rel: "canonical", href: "/company/contacts" }],
  }),
  component: ContactsPage,
});

const departments = [
  { d: "Sales — Italy", e: "italia@lighthouse.example", p: "+39 041 57 90 501" },
  { d: "Sales — Europe", e: "europe@lighthouse.example", p: "+39 041 57 90 502" },
  { d: "Sales — Americas", e: "americas@lighthouse.example", p: "+39 041 57 90 503" },
  { d: "Sales — MEA", e: "mea@lighthouse.example", p: "+39 041 57 90 504" },
  { d: "Sales — APAC", e: "apac@lighthouse.example", p: "+39 041 57 90 505" },
  { d: "Customer service", e: "service@lighthouse.example", p: "+39 041 57 90 510" },
  { d: "Press & marketing", e: "press@lighthouse.example", p: "+39 041 57 90 520" },
  { d: "HR & careers", e: "careers@lighthouse.example", p: "+39 041 57 90 530" },
];

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
              Lighthouse S.p.A.<br />
              Via Taglio Destro 32<br />
              30035 Mirano (VE) — Italy<br />
              T +39 041 57 90 500<br />
              info@lighthouse.example
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
              src="https://www.openstreetmap.org/export/embed.html?bbox=12.10%2C45.49%2C12.13%2C45.51&amp;layer=mapnik"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-16 border-t border-[color:var(--ink-light)]/40">
        <h2 className="h-section text-2xl md:text-3xl">Departments</h2>
        <ul className="mt-10 divide-y divide-[color:var(--ink-light)]/40 border-y border-[color:var(--ink-light)]/40">
          {departments.map((d) => (
            <li key={d.d} className="grid gap-2 py-5 text-sm md:grid-cols-3 md:items-center">
              <span className="t-product">{d.d}</span>
              <a href={`mailto:${d.e}`} className="text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]">{d.e}</a>
              <span className="text-[color:var(--ink-muted)] md:text-right">{d.p}</span>
            </li>
          ))}
        </ul>
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
