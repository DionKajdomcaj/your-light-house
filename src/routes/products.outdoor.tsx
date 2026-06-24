import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SubcategoryNav } from "@/components/site/ProductGrid";
import insp2 from "@/assets/inspiration-2.jpg";

export const Route = createFileRoute("/products/outdoor")({
  head: () => ({
    meta: [
      { title: "Outdoor — Lighthouse" },
      { name: "description", content: "Outdoor lighting — wall, recessed, projectors and bollards." },
      { property: "og:title", content: "Outdoor — Lighthouse" },
      { property: "og:url", content: "/products/outdoor" },
    ],
    links: [{ rel: "canonical", href: "/products/outdoor" }],
  }),
  component: OutdoorPage,
});

function OutdoorPage() {
  return (
    <SiteShell overImage>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img src={insp2} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-[color:var(--on-image)]">
          <div className="eyebrow !text-white/80">Catalog</div>
          <h1 className="h-display mt-4 text-5xl md:text-7xl">Outdoor</h1>
        </div>
      </section>

      <SubcategoryNav
        items={[
          { slug: "wall", label: "Wall lamps", href: "/products/outdoor" },
          { slug: "recessed", label: "Recessed lights", href: "/products/outdoor" },
          { slug: "spotlights", label: "Spotlights", href: "/products/outdoor" },
          { slug: "bollards", label: "Bollards", href: "/products/outdoor" },
        ]}
      />

      <section className="container-x py-24 text-center">
        <p className="mx-auto max-w-xl text-[color:var(--ink-muted)]">
          The outdoor collection is currently being photographed. New
          fixtures land in the catalog later this season.
        </p>
        <Link to="/catalogs" className="cta-link mt-8 border-b border-black/80">
          Browse downloadable catalogs <span aria-hidden>→</span>
        </Link>
      </section>
    </SiteShell>
  );
}
