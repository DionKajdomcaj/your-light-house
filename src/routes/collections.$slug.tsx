import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { getCollection, getProductsByCollection } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return {
      collection,
      products: getProductsByCollection(params.slug),
    };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.collection.name} — Lighthouse` },
          { name: "description", content: loaderData.collection.description },
          { property: "og:title", content: `${loaderData.collection.name} — Lighthouse` },
          { property: "og:description", content: loaderData.collection.description },
          { property: "og:image", content: loaderData.collection.image },
          { property: "og:url", content: `/collections/${loaderData.collection.slug}` },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `/collections/${loaderData.collection.slug}` }]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-x py-40 text-center">
        <h1 className="h-section text-3xl">Collection not found</h1>
        <Link to="/collections" className="cta-link mt-6 border-b border-black/80">
          Back to collections <span aria-hidden>→</span>
        </Link>
      </div>
    </SiteShell>
  ),
  component: CollectionDetail,
});

function CollectionDetail() {
  const { collection, products } = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="container-x pt-36 pb-10 lg:pt-44">
        <nav className="text-xs uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
          <Link to="/collections" className="hover:text-[color:var(--ink)]">Collections</Link>
          <span className="mx-2">/</span>
          <span>{collection.name}</span>
        </nav>
        <div className="mt-10 grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="eyebrow">{collection.tagline}</div>
            <h1 className="h-display mt-5 text-4xl md:text-6xl lg:text-7xl">{collection.name}</h1>
          </div>
          <p className="md:col-span-5 text-[color:var(--ink-muted)] leading-relaxed">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="mb-10 flex items-end justify-between">
          <div className="text-sm text-[color:var(--ink-muted)]">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-[color:var(--ink-muted)]">No pieces in this collection yet.</p>
        ) : (
          <div className="grid gap-x-6 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-[color:var(--surface)]">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>
                <div className="mt-5">
                  <div className="t-code">cod. {p.id.slice(-6)}</div>
                  <div className="t-product mt-1">{p.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
