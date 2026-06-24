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
          { title: `${loaderData.collection.name} — LightHouse` },
          { name: "description", content: loaderData.collection.description },
          { property: "og:title", content: `${loaderData.collection.name} — LightHouse` },
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
        <h1 className="text-4xl">Collection not found</h1>
        <Link to="/collections" className="mt-6 inline-block underline">
          Back to collections
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
      <section className="relative h-[70vh] min-h-[480px] w-full overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-16 text-white">
          <div className="eyebrow opacity-80">Collection</div>
          <h1 className="mt-4 text-5xl md:text-7xl">{collection.name}</h1>
          <p className="mt-6 max-w-xl text-base opacity-90 md:text-lg">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </h2>
          <div className="text-sm text-muted-foreground">Sorted by newest</div>
        </div>

        {products.length === 0 ? (
          <p className="text-muted-foreground">
            This collection is being photographed. Please come back soon.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p: (typeof products)[number]) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-background">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {p.type}
                    </div>
                    <h3 className="mt-1 text-xl font-display">{p.name}</h3>
                  </div>
                  <div className="text-sm tabular-nums">€ {p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
