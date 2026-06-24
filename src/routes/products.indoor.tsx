import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductGrid, SubcategoryNav } from "@/components/site/ProductGrid";
import { products } from "@/lib/catalog";
import insp1 from "@/assets/inspiration-1.jpg";

const INDOOR = ["pendant", "ceiling", "wall", "floor", "table"];

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
  const items = products.filter((p) => INDOOR.includes(p.collection));
  return (
    <SiteShell overImage>
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img src={insp1} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-12 text-[color:var(--on-image)]">
          <div className="eyebrow !text-white/80">Catalog</div>
          <h1 className="h-display mt-4 text-5xl md:text-7xl">
            Indoor <span className="opacity-80">[{items.length}]</span>
          </h1>
        </div>
      </section>

      <SubcategoryNav
        active="indoor"
        items={[
          { slug: "pendant", label: "Suspensions", href: "/collections/$slug".replace("$slug", "pendant") },
          { slug: "ceiling", label: "Ceiling lamps", href: "/collections/$slug".replace("$slug", "ceiling") },
          { slug: "wall", label: "Wall lamps", href: "/collections/$slug".replace("$slug", "wall") },
          { slug: "floor", label: "Floor lamps", href: "/collections/$slug".replace("$slug", "floor") },
          { slug: "table", label: "Table lamps", href: "/collections/$slug".replace("$slug", "table") },
        ]}
      />

      <section className="container-x py-16">
        <ProductGrid items={items} />
      </section>
    </SiteShell>
  );
}
