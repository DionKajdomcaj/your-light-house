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
      .slice(0, 4);
    return { product, collection, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Lighthouse` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Lighthouse` },
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
        <h1 className="h-section text-3xl">Product not found</h1>
        <Link to="/collections" className="cta-link mt-6 border-b border-black/80">
          Browse collections <span aria-hidden>→</span>
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
      <section className="container-x pt-32 pb-8 lg:pt-40">
        <nav className="text-xs uppercase tracking-[0.18em] text-[color:var(--ink-muted)]">
          <Link to="/collections" className="hover:text-[color:var(--ink)]">Collections</Link>
          {collection ? (
            <>
              <span className="mx-2">/</span>
              <Link
                to="/collections/$slug"
                params={{ slug: collection.slug }}
                className="hover:text-[color:var(--ink)]"
              >
                {collection.name}
              </Link>
            </>
          ) : null}
        </nav>
      </section>

      <section className="container-x grid gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="aspect-square overflow-hidden bg-[color:var(--surface)]">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-10 mix-blend-multiply"
            />
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <div className="t-code">cod. {product.id.slice(-6)}</div>
          <h1 className="h-section mt-3 text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-4 text-base text-[color:var(--ink-muted)]">{product.type}</div>

          <p className="mt-8 text-[color:var(--ink-muted)] leading-relaxed">
            {product.description}
          </p>

          <div className="mt-10">
            <div className="eyebrow">Finish</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.finishes.map((f: string) => (
                <button
                  key={f}
                  type="button"
                  className="border border-[color:var(--ink)] px-4 py-2 text-xs uppercase tracking-[0.08em] hover:bg-[color:var(--ink)] hover:text-white transition-colors"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="flex-1 bg-[color:var(--ink)] px-6 py-4 text-center text-sm tracking-wide text-white hover:opacity-90"
            >
              Find a retailer
            </Link>
            <Link
              to="/contact"
              className="flex-1 border border-[color:var(--ink)] px-6 py-4 text-center text-sm tracking-wide hover:bg-[color:var(--ink)] hover:text-white transition-colors"
            >
              Request information
            </Link>
          </div>

          <dl className="mt-12 divide-y divide-[color:var(--ink-light)]/60 border-y border-[color:var(--ink-light)]/60">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 py-4 text-sm">
                <dt className="text-[color:var(--ink-muted)]">{s.label}</dt>
                <dd className="text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-[color:var(--ink-light)]/40 py-20">
          <div className="container-x">
            <h2 className="h-section mb-10 text-2xl md:text-3xl">From the same collection</h2>
            <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-4">
              {related.map((p) => (
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
                  <div className="mt-4">
                    <div className="t-code">cod. {p.id.slice(-6)}</div>
                    <div className="t-product mt-1">{p.name}</div>
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
