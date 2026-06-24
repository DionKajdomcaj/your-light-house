import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { collections, products } from "@/lib/catalog";
import insp1 from "@/assets/inspiration-1.jpg";
import insp2 from "@/assets/inspiration-2.jpg";
import insp3 from "@/assets/inspiration-3.jpg";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lighthouse — Light up your ideal" },
      { name: "description", content: "Decorative and technical lighting from Italy. Indoor, outdoor, recessed, systems." },
      { property: "og:title", content: "Lighthouse — Light up your ideal" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);
  const trios = [
    { to: "/collections", label: "Indoor", image: insp1 },
    { to: "/collections", label: "Outdoor", image: insp2 },
    { to: "/collections", label: "Technical", image: insp3 },
  ];

  return (
    <SiteShell overImage>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-[color:var(--on-image)]">
          <h1 className="h-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl">
            Light up your ideal
          </h1>
          <Link to="/collections" className="cta-link cta-link-on-image mt-10 border-b border-white/70">
            Browse the catalog <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* THREE CATEGORY CARDS */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-1 md:grid-cols-3">
          {trios.map((c) => (
            <Link key={c.label} to={c.to} className="group relative block aspect-[3/4] overflow-hidden">
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-6 left-6 text-[color:var(--on-image)]">
                <span className="text-lg">{c.label} <span aria-hidden>→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL STATEMENT */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow">Our company, our family</div>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl leading-snug md:text-3xl">
              A family-run lighting house from the Venetian mainland.
              Three thousand pieces in catalog, three hundred and fifty-six
              active collections, one warehouse of fifteen thousand square
              metres. Sold across five continents.
            </p>
            <Link to="/about" className="cta-link mt-10 border-b border-black/80">
              Read our history <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container-x pb-24 md:pb-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="h-section text-2xl md:text-3xl">New this season</h2>
          <Link to="/collections" className="hidden md:inline-flex items-center gap-2 text-sm hover:opacity-60">
            All collections <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
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
                  className="absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-300 group-hover:opacity-90 mix-blend-multiply"
                />
              </div>
              <div className="mt-5">
                <div className="t-code">cod. {p.id.slice(-6)}</div>
                <div className="t-product mt-1">{p.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COLLECTIONS STRIP */}
      <section className="bg-[color:var(--surface-soft)] py-24 md:py-32">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="h-section text-2xl md:text-3xl">Explore our collections</h2>
          </div>
          <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {collections.map((c) => (
              <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group relative block aspect-[3/4] overflow-hidden">
                <img src={c.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[color:var(--ink)]">
                  <span className="t-product">{c.name}</span>
                  <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIER */}
      <section className="container-x py-24 md:py-32">
        <div className="grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="aspect-[5/4] overflow-hidden">
              <img src={storyImg} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="eyebrow">Since 1974</div>
            <h2 className="h-section mt-5 text-3xl md:text-4xl">Enthusiasm for things well made</h2>
            <p className="mt-6 text-[color:var(--ink-muted)] leading-relaxed">
              A passion that began in 1969 with a batch of Murano glass and
              became, five years later, a workshop. Today, three generations
              later, the principles are the same — transparency, simplicity,
              and a quiet kind of craftsmanship.
            </p>
            <Link to="/about" className="cta-link mt-8 border-b border-black/80">
              Our history <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
