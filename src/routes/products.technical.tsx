import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductGrid, SubcategoryNav } from "@/components/site/ProductGrid";
import { getProductsByTopLevel, getCollectionsByTopLevel } from "@/lib/catalog";
import hero from "@/assets/cat-technical.jpg";

export const Route = createFileRoute("/products/technical")({
  head: () => ({
    meta: [
      { title: "Technical — Lighthouse" },
      { name: "description", content: "Technical lighting — track, recessed and linear systems." },
      { property: "og:title", content: "Technical — Lighthouse" },
      { property: "og:url", content: "/products/technical" },
    ],
    links: [{ rel: "canonical", href: "/products/technical" }],
  }),
  component: TechPage,
});

function TechPage() {
  const items = getProductsByTopLevel("technical");
  const subs = getCollectionsByTopLevel("technical");
  return (
    <SiteShell overImage>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-[color:var(--on-image)]">
          <div className="eyebrow !text-white/80">Catalog</div>
          <h1 className="h-display mt-4 text-5xl md:text-7xl">
            Technical <span className="opacity-80">[{items.length}]</span>
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
