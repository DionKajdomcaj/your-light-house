import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

const tabs = ["General", "Indoor", "Outdoor", "Technical", "Selection", "Price lists"] as const;
type Tab = (typeof tabs)[number];

const catalogs: { tab: Tab; title: string; year: string; size: string }[] = [
  { tab: "General", title: "General catalog 2026", year: "2026", size: "82 MB" },
  { tab: "General", title: "General catalog 2024", year: "2024", size: "78 MB" },
  { tab: "Indoor", title: "Indoor collections", year: "2026", size: "46 MB" },
  { tab: "Indoor", title: "Suspensions selection", year: "2026", size: "18 MB" },
  { tab: "Outdoor", title: "Outdoor collections", year: "2026", size: "22 MB" },
  { tab: "Technical", title: "Technical & track systems", year: "2026", size: "31 MB" },
  { tab: "Selection", title: "Hospitality selection", year: "2026", size: "12 MB" },
  { tab: "Selection", title: "Retail selection", year: "2026", size: "14 MB" },
  { tab: "Price lists", title: "Price list — Italy", year: "2026", size: "3 MB" },
  { tab: "Price lists", title: "Price list — Europe", year: "2026", size: "3 MB" },
  { tab: "Price lists", title: "Price list — USA", year: "2026", size: "3 MB" },
];

export const Route = createFileRoute("/catalogs")({
  head: () => ({
    meta: [
      { title: "Downloads — Lighthouse" },
      { name: "description", content: "Download Lighthouse catalogs, selections and price lists." },
      { property: "og:title", content: "Downloads — Lighthouse" },
      { property: "og:url", content: "/catalogs" },
    ],
    links: [{ rel: "canonical", href: "/catalogs" }],
  }),
  component: CatalogsPage,
});

function CatalogsPage() {
  const [tab, setTab] = useState<Tab>("General");
  const items = catalogs.filter((c) => c.tab === tab);
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Library"
        title="Downloads"
        intro="Catalogs, selections and price lists in PDF. CAD files and per-product datasheets are available on each product page."
      />

      <section className="container-x pb-6">
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-[color:var(--ink-light)]/40 py-5 text-sm">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`transition-opacity hover:opacity-60 ${tab === t ? "underline underline-offset-4" : ""}`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="container-x pb-24">
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <li key={c.title} className="group block">
              <div className="aspect-[3/4] bg-[color:var(--surface-soft)]" />
              <div className="mt-5 flex items-start justify-between gap-3">
                <div>
                  <div className="t-product">{c.title}</div>
                  <div className="t-code mt-1">PDF · {c.year} · {c.size}</div>
                </div>
                <select className="text-xs bg-transparent border-b border-[color:var(--ink-light)]/80 py-1">
                  <option>EN</option><option>IT</option><option>FR</option><option>DE</option><option>ES</option><option>RU</option>
                </select>
              </div>
              <a href="#" className="cta-link mt-4 border-b border-black/80">Download <span aria-hidden>→</span></a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[color:var(--surface-soft)] py-16">
        <div className="container-x grid gap-6 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <h2 className="h-section text-2xl">CAD & technical files</h2>
            <p className="mt-3 text-[color:var(--ink-muted)]">
              Per-product DWG, 3DM and datasheet downloads live on each product page.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a href="/products" className="cta-link border-b border-black/80">
              Browse the catalog <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
