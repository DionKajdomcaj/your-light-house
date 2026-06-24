import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { collections } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — LightHouse" },
      { name: "description", content: "Modern, classic, outdoor and kids lighting collections from LightHouse." },
      { property: "og:title", content: "Collections — LightHouse" },
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
        eyebrow="Catalogue"
        title="Four collections, one workshop."
        intro="Each collection is led by a single designer and stays in production for at least a decade. Browse the worlds below or visit a specific piece."
      />
      <section className="container-x grid gap-x-6 gap-y-16 pb-32 md:grid-cols-2">
        {collections.map((c, i) => (
          <Link
            key={c.slug}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            </div>
            <div className="mt-6 flex items-start justify-between gap-6">
              <div>
                <div className="eyebrow text-muted-foreground">{c.tagline}</div>
                <h2 className="mt-2 text-3xl md:text-4xl">{c.name}</h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  {c.description}
                </p>
              </div>
              <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
