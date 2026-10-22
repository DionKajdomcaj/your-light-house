import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductGrid } from "@/components/site/ProductGrid";
import { products, collections } from "@/lib/catalog";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/new-releases")({
  head: () => ({
    meta: [
      { title: "New releases — Lighthouse" },
      { name: "description", content: "The latest Lighthouse collections and pieces this season." },
      { property: "og:title", content: "New releases — Lighthouse" },
      { property: "og:image", content: heroImg },
      { property: "og:url", content: "/new-releases" },
    ],
    links: [{ rel: "canonical", href: "/new-releases" }],
  }),
  component: NewReleases,
});

function NewReleases() {
  const featured = collections.slice(0, 3);
  const items = products.slice(0, 16);
  return (
    <SiteShell overImage>
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="container-x relative z-10 flex h-full flex-col items-start justify-end pb-20 text-[color:var(--on-image)]">
          <div className="eyebrow !text-white/80">Spring / Summer 2026</div>
          <h1 className="h-display mt-5 max-w-3xl text-5xl md:text-7xl">New releases</h1>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <p className="max-w-2xl text-lg text-[color:var(--ink-muted)] leading-relaxed">
          Eighty-two new pieces. Three families. Brass, opal glass and
          blackened steel — drawn in Prishtine, assembled by hand.
        </p>
      </section>

      <section className="container-x pb-20">
        <h2 className="h-section mb-10 text-2xl md:text-3xl">Featured collections</h2>
        <div className="grid gap-1 md:grid-cols-3">
          {featured.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group relative block aspect-[3/4] overflow-hidden">
              <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[color:var(--ink)]">
                <span className="t-product">{c.name}</span>
                <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x pb-32">
        <h2 className="h-section mb-10 text-2xl md:text-3xl">All new pieces</h2>
        <ProductGrid items={items} />
      </section>
    </SiteShell>
  );
}
