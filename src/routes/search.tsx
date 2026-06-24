import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { products, collections } from "@/lib/catalog";

const search = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/search")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Search — Lighthouse" },
      { name: "description", content: "Search the Lighthouse catalog." },
      { property: "og:title", content: "Search — Lighthouse" },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const query = q.trim().toLowerCase();
  const pHits = query
    ? products.filter((p) => `${p.name} ${p.family} ${p.id}`.toLowerCase().includes(query))
    : [];
  const cHits = query
    ? collections.filter((c) => `${c.name} ${c.tagline}`.toLowerCase().includes(query))
    : [];

  return (
    <SiteShell>
      <section className="container-x pt-36 pb-10 lg:pt-44">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
            navigate({ search: { q: v } });
          }}
        >
          <label className="eyebrow">Search</label>
          <input
            name="q"
            defaultValue={q}
            placeholder="Search products, collections, codes…"
            autoFocus
            className="mt-3 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent py-4 text-2xl outline-none focus:border-[color:var(--ink)]"
          />
        </form>
      </section>

      <section className="container-x pb-32">
        {!query ? (
          <p className="text-[color:var(--ink-muted)] py-20 text-center">
            Type to search the full catalog.
          </p>
        ) : pHits.length + cHits.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[color:var(--ink-muted)]">No results for "{q}".</p>
            <Link to="/products" className="cta-link mt-6 border-b border-black/80">
              Browse collections <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-sm text-[color:var(--ink-muted)] py-6 border-y border-[color:var(--ink-light)]/40">
              {pHits.length + cHits.length} results for "{q}"
            </div>

            {pHits.length > 0 ? (
              <div className="mt-12">
                <h2 className="eyebrow">Products</h2>
                <div className="mt-6 grid gap-x-6 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {pHits.slice(0, 24).map((p) => (
                    <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group block">
                      <div className="relative aspect-square overflow-hidden bg-[color:var(--surface)]">
                        <img src={p.image} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply" />
                      </div>
                      <div className="mt-4">
                        <div className="t-code">cod. {p.id.slice(-6)}</div>
                        <div className="t-product mt-1">{p.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {cHits.length > 0 ? (
              <div className="mt-16">
                <h2 className="eyebrow">Collections</h2>
                <ul className="mt-6 divide-y divide-[color:var(--ink-light)]/40 border-y border-[color:var(--ink-light)]/40">
                  {cHits.map((c) => (
                    <li key={c.slug}>
                      <Link to="/collections/$slug" params={{ slug: c.slug }} className="flex items-center justify-between py-5 hover:opacity-60">
                        <span className="t-product">{c.name}</span>
                        <span aria-hidden>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </section>
    </SiteShell>
  );
}
