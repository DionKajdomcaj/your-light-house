import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

const dealers = [
  { name: "Spazio Luce", city: "Milan", country: "Italy", addr: "Via Tortona 27", phone: "+39 02 0000 0001", web: "spazioluce.example" },
  { name: "Maison Lumière", city: "Paris", country: "France", addr: "12 Rue de Turenne", phone: "+33 1 00 00 00 02", web: "maisonlumiere.example" },
  { name: "Light Atelier", city: "London", country: "United Kingdom", addr: "44 Marylebone High St", phone: "+44 20 0000 0003", web: "lightatelier.example" },
  { name: "Lumen Studio", city: "New York", country: "United States", addr: "237 Lafayette St", phone: "+1 212 000 0004", web: "lumenstudio.example" },
  { name: "Casa della Luce", city: "Rome", country: "Italy", addr: "Via del Corso 110", phone: "+39 06 0000 0005", web: "casadellaluce.example" },
  { name: "Nordic Light", city: "Copenhagen", country: "Denmark", addr: "Bredgade 36", phone: "+45 00 00 00 06", web: "nordiclight.example" },
];

export const Route = createFileRoute("/authorized-dealers")({
  head: () => ({
    meta: [
      { title: "Authorized dealers — Lighthouse" },
      { name: "description", content: "Find a Lighthouse authorized showroom or reseller in your country." },
      { property: "og:title", content: "Authorized dealers — Lighthouse" },
      { property: "og:url", content: "/authorized-dealers" },
    ],
    links: [{ rel: "canonical", href: "/authorized-dealers" }],
  }),
  component: DealersPage,
});

function DealersPage() {
  const [country, setCountry] = useState("");
  const [query, setQuery] = useState("");
  const filtered = dealers.filter(
    (d) =>
      (!country || d.country === country) &&
      (!query || `${d.city} ${d.name}`.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Where to buy"
        title="Authorized dealers"
        intro="Lighthouse is sold through a curated network of showrooms and resellers worldwide. Search by country or city to find one near you."
      />

      <section className="container-x pb-12">
        <div className="grid gap-4 border-y border-[color:var(--ink-light)]/40 py-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <label className="eyebrow">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-2 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent py-3 outline-none focus:border-[color:var(--ink)]"
            >
              <option value="">All countries</option>
              {Array.from(new Set(dealers.map((d) => d.country))).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-5">
            <label className="eyebrow">City or name</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Milan"
              className="mt-2 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent py-3 outline-none focus:border-[color:var(--ink)]"
            />
          </div>
          <div className="md:col-span-3 text-sm text-[color:var(--ink-muted)] md:text-right">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      <section className="container-x pb-32 grid gap-10 md:grid-cols-12">
        <ul className="md:col-span-7 divide-y divide-[color:var(--ink-light)]/40 border-y border-[color:var(--ink-light)]/40">
          {filtered.map((d) => (
            <li key={d.name} className="py-6">
              <div className="t-product">{d.name}</div>
              <div className="t-code mt-1">{d.city} · {d.country}</div>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">{d.addr}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href={`tel:${d.phone}`} className="hover:opacity-60">{d.phone}</a>
                <a href={`https://${d.web}`} className="hover:opacity-60">{d.web}</a>
                <a href="#" className="hover:opacity-60">Get directions →</a>
              </div>
            </li>
          ))}
          {filtered.length === 0 ? (
            <li className="py-10 text-center text-[color:var(--ink-muted)]">No dealers match this search.</li>
          ) : null}
        </ul>

        <aside className="md:col-span-5 self-start border border-[color:var(--ink-light)]/60 p-8">
          <div className="eyebrow">Become a dealer</div>
          <h2 className="h-section mt-4 text-2xl">Open a Lighthouse account</h2>
          <p className="mt-4 text-sm text-[color:var(--ink-muted)] leading-relaxed">
            Showrooms, design studios and contractors: apply to carry the
            full Lighthouse catalog with trade pricing and B2B logistics.
          </p>
          <Link to="/reserved-area" className="cta-link mt-6 border-b border-black/80">
            Request access <span aria-hidden>→</span>
          </Link>
        </aside>
      </section>
    </SiteShell>
  );
}
