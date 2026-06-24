import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { getProduct, getCollection, products as allProducts } from "@/lib/catalog";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    const collection = getCollection(product.collection);
    const related = allProducts
      .filter((p) => p.collection === product.collection && p.slug !== product.slug)
      .slice(0, 3);
    return { product, collection, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — LightHouse` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — LightHouse` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.image },
          { property: "og:type", content: "product" },
          { property: "og:url", content: `/products/${loaderData.product.slug}` },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `/products/${loaderData.product.slug}` }]
      : [],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-x py-40 text-center">
        <h1 className="text-4xl">Product not found</h1>
        <Link to="/collections" className="mt-6 inline-block underline">
          Browse collections
        </Link>
      </div>
    </SiteShell>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product, collection, related } = Route.useLoaderData();

  return (
    <SiteShell>
      <section className="container-x pt-28 pb-12 lg:pt-36">
        <nav className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/collections" className="hover:text-foreground">Collections</Link>
          {collection ? (
            <>
              <span className="mx-2">/</span>
              <Link
                to="/collections/$slug"
                params={{ slug: collection.slug }}
                className="hover:text-foreground"
              >
                {collection.name}
              </Link>
            </>
          ) : null}
        </nav>
      </section>

      <section className="container-x grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="eyebrow text-muted-foreground">{product.type}</div>
          <h1 className="mt-3 text-4xl md:text-5xl">{product.name}</h1>
          <div className="mt-4 text-xl tabular-nums">€ {product.price.toLocaleString()}</div>

          <p className="mt-8 text-muted-foreground">{product.description}</p>

          <div className="mt-10">
            <div className="eyebrow text-muted-foreground">Finish</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.finishes.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="border border-border px-4 py-2 text-sm hover:border-foreground"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button className="flex-1 bg-foreground px-6 py-4 text-sm tracking-wide text-background hover:bg-foreground/90">
              Add to enquiry
            </button>
            <button className="flex-1 border border-foreground px-6 py-4 text-sm tracking-wide hover:bg-foreground hover:text-background">
              Request a sample
            </button>
          </div>

          <dl className="mt-12 divide-y divide-border border-y border-border">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 py-4 text-sm">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-border py-20">
          <div className="container-x">
            <h2 className="mb-10 text-3xl">From the same collection</h2>
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-background">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="font-display text-lg">{p.name}</span>
                    <span className="tabular-nums">€ {p.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SiteShell>
  );
}
