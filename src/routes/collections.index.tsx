import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { collections } from "@/lib/catalog";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Lighthouse" },
      { name: "description", content: "All Lighthouse collections — pendants, wall, ceiling, floor, table and track lighting." },
      { property: "og:title", content: "Collections — Lighthouse" },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Catalog"
        title="Collections"
        intro="Six families of light, drawn from a single catalog. Pendants, wall, ceiling, floor, table and track."
      />
      <section className="container-x grid gap-x-6 gap-y-20 pb-32 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.slug}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className="group block"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--surface-soft)]">
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-10 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90"
              />
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <div className="eyebrow">{c.tagline}</div>
                <h2 className="h-sub mt-2 text-xl">{c.name}</h2>
                <p className="mt-3 max-w-md text-sm text-[color:var(--ink-muted)] leading-relaxed">
                  {c.description}
                </p>
              </div>
              <span aria-hidden className="mt-2 text-lg">→</span>
            </div>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
