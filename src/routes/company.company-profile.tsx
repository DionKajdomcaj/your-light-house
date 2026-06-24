import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/company/company-profile")({
  head: () => ({
    meta: [
      { title: "Company profile — Lighthouse" },
      { name: "description", content: "Download the Lighthouse company profile, press kit and brand assets." },
      { property: "og:title", content: "Company profile — Lighthouse" },
      { property: "og:url", content: "/company/company-profile" },
    ],
    links: [{ rel: "canonical", href: "/company/company-profile" }],
  }),
  component: CompanyProfilePage,
});

const facts = [
  ["Founded", "1974"],
  ["Headquarters", "Mirano (VE), Italy"],
  ["Ownership", "Family — third generation"],
  ["Active SKUs", "3,000+"],
  ["Active collections", "356"],
  ["Markets", "5 continents"],
  ["Certifications", "ISO 9001, RoHS, CE"],
];

const downloads = [
  { t: "Company profile (EN)", s: "PDF · 6.4 MB" },
  { t: "Press kit 2026", s: "ZIP · 42 MB" },
  { t: "Brand assets — logo & guidelines", s: "ZIP · 18 MB" },
];

function CompanyProfilePage() {
  return (
    <>
      <section className="container-x pt-10 pb-16">
        <h1 className="h-display text-4xl md:text-6xl">Company profile</h1>
        <p className="mt-8 max-w-2xl text-lg text-[color:var(--ink-muted)] leading-relaxed">
          A one-page summary of who Lighthouse is, what it makes, and how
          it operates — for journalists, architects, and prospective
          partners.
        </p>
      </section>

      <section className="container-x grid gap-16 pb-20 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="h-section text-2xl">Key facts</h2>
          <dl className="mt-8 divide-y divide-[color:var(--ink-light)]/40 border-y border-[color:var(--ink-light)]/40">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4 text-sm">
                <dt className="text-[color:var(--ink-muted)]">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-6 space-y-10">
          <div>
            <div className="eyebrow">Mission</div>
            <p className="mt-3 text-lg leading-relaxed">
              To make designed light part of every home — not the few.
            </p>
          </div>
          <div>
            <div className="eyebrow">Vision</div>
            <p className="mt-3 text-lg leading-relaxed">
              A single family of three thousand fixtures, in production
              for decades, made by one workshop on the Venetian mainland.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-soft)] py-20">
        <div className="container-x">
          <h2 className="h-section text-2xl">Downloads</h2>
          <ul className="mt-8 divide-y divide-[color:var(--ink-light)]/40 border-y border-[color:var(--ink-light)]/40">
            {downloads.map((d) => (
              <li key={d.t} className="flex items-center justify-between gap-6 py-5">
                <div>
                  <div className="t-product">{d.t}</div>
                  <div className="t-code mt-1">{d.s}</div>
                </div>
                <a href="#" className="cta-link border-b border-black/80">
                  Download <span aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
