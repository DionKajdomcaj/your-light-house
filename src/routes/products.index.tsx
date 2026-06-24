import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductGrid, SubcategoryNav } from "@/components/site/ProductGrid";
import { products, collections } from "@/lib/catalog";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: `All collections — Lighthouse` },
      { name: "description", content: "Browse every Lighthouse collection — indoor, outdoor and technical lighting." },
      { property: "og:title", content: "All collections — Lighthouse" },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: AllProducts,
});

function AllProducts() {
  return (
    <SiteShell>
      <section className="container-x pt-36 pb-10 lg:pt-44">
        <h1 className="h-display text-4xl md:text-6xl">
          All collections <span className="text-[color:var(--ink-muted)]">[{collections.length}]</span>
        </h1>
      </section>

      <SubcategoryNav
        items={[
          { slug: "indoor", label: "Indoor", href: "/products/indoor" },
          { slug: "outdoor", label: "Outdoor", href: "/products/outdoor" },
          { slug: "technical", label: "Technical", href: "/products/technical" },
          { slug: "bulbs", label: "Bulbs", href: "/bulbs" },
          { slug: "accessories", label: "Accessories", href: "/accessories" },
        ]}
      />

      <section className="container-x py-16">
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {collections.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="hover:opacity-60">
              {c.name}
            </Link>
          ))}
        </div>
        <ProductGrid items={products} />
      </section>
    </SiteShell>
  );
}
