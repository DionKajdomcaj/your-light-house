import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductGrid, SubcategoryNav } from "@/components/site/ProductGrid";
import { products } from "@/lib/catalog";
import insp3 from "@/assets/inspiration-3.jpg";

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
  const items = products.filter((p) => p.collection === "track");
  return (
    <SiteShell overImage>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img src={insp3} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-[color:var(--on-image)]">
          <div className="eyebrow !text-white/80">Catalog</div>
          <h1 className="h-display mt-4 text-5xl md:text-7xl">
            Technical <span className="opacity-80">[{items.length}]</span>
          </h1>
        </div>
      </section>

      <SubcategoryNav
        items={[
          { slug: "track", label: "Tracks", href: "/products/technical" },
          { slug: "recessed", label: "Recessed", href: "/products/technical" },
          { slug: "systems", label: "Systems", href: "/products/technical" },
        ]}
      />

      <section className="container-x py-16">
        <ProductGrid items={items} />
      </section>
    </SiteShell>
  );
}
