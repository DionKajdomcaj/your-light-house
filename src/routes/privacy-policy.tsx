import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy & cookies — Lighthouse" },
      { name: "description", content: "How Lighthouse collects, uses and protects personal data on this website." },
      { property: "og:title", content: "Privacy & cookies — Lighthouse" },
      { property: "og:url", content: "/privacy-policy" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  { id: "controller", t: "Data controller", b: "Lighthouse SH.P.K., Veterrnik - 1, 10000 Prishtine, XK. T +383 45 555 355, info@lighthouse-kos.com." },
  { id: "data", t: "Data we collect", b: "Contact form submissions, dealer account information, analytics on anonymous visit patterns. We do not knowingly collect personal data from children under 16." },
  { id: "purpose", t: "Purposes of processing", b: "To answer enquiries, deliver B2B services, fulfil legal obligations, and improve the site." },
  { id: "legal", t: "Legal basis", b: "Consent, contractual necessity, and legitimate interest as defined by Regulation (EU) 2016/679 (GDPR)." },
  { id: "retention", t: "Retention", b: "Contact form data is kept for 24 months. Dealer accounts are kept for the duration of the commercial relationship plus 10 years." },
  { id: "rights", t: "Your rights", b: "Access, rectification, erasure, restriction, portability and objection. Contact info@lighthouse-kos.com." },
  { id: "cookies", t: "Cookies", b: "We use strictly necessary cookies by default. Analytics and marketing cookies require your consent via the banner shown on first visit." },
  { id: "transfers", t: "International transfers", b: "Where data leaves the EEA it is protected by Standard Contractual Clauses approved by the European Commission." },
  { id: "updates", t: "Updates to this policy", b: "We will post any changes here with a revised effective date." },
];

function PrivacyPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Legal" title="Privacy & cookies" intro="Effective date: 1 January 2026" />

      <section className="container-x grid gap-12 pb-32 md:grid-cols-12">
        <aside className="md:col-span-3">
          <div className="eyebrow">Contents</div>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:opacity-60">{s.t}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="md:col-span-9 max-w-[720px] space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2 className="h-sub text-xl">{s.t}</h2>
              <p className="mt-4 text-[color:var(--ink-muted)] leading-relaxed">{s.b}</p>
            </section>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
