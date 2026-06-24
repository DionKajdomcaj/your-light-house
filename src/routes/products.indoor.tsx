import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductGrid, SubcategoryNav } from "@/components/site/ProductGrid";
import { getProductsByTopLevel, getCollectionsByTopLevel } from "@/lib/catalog";
import hero from "@/assets/cat-indoor.jpg";

export const Route = createFileRoute("/products/indoor")({
  head: () => ({
    meta: [
      { title: "Indoor — Lighthouse" },
      { name: "description", content: "Indoor lighting — pendants, ceiling, wall, floor and table lamps." },
      { property: "og:title", content: "Indoor — Lighthouse" },
      { property: "og:image", content: "/og-indoor.jpg" },
      { property: "og:url", content: "/products/indoor" },
    ],
    links: [{ rel: "canonical", href: "/products/indoor" }],
  }),
  component: IndoorPage,
});

function IndoorPage() {
  const items = getProductsByTopLevel("indoor");
  const subs = getCollectionsByTopLevel("indoor");
  return (
    <SiteShell overImage>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-[color:var(--on-image)]">
          <div className="eyebrow !text-white/80">Catalog</div>
          <h1 className="h-display mt-4 text-5xl md:text-7xl">
            Indoor <span className="opacity-80">[{items.length}]</span>
          </h1>
        </div>
      </section>

      <SubcategoryNav
        items={subs.map((c) => ({ slug: c.slug, label: c.name, href: `/collections/${c.slug}` }))}
      />

      <section className="container-x py-16">
        <ProductGrid items={items} />
      </section>
    </SiteShell>
  );
}
