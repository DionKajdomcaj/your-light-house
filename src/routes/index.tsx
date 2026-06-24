import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { collections, products } from "@/lib/catalog";
import heroImg from "@/assets/hero.jpg";
import insp1 from "@/assets/inspiration-1.jpg";
import insp2 from "@/assets/inspiration-2.jpg";
import insp3 from "@/assets/inspiration-3.jpg";
import insp4 from "@/assets/inspiration-4.jpg";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LightHouse — Decorative & architectural lighting" },
      { name: "description", content: "A maison de lumière from Brescia. Pendants, chandeliers, sconces and outdoor lighting, hand-assembled in Italy." },
      { property: "og:title", content: "LightHouse — Decorative & architectural lighting" },
      { property: "og:description", content: "A maison de lumière from Brescia. Hand-assembled lighting for modern homes." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 3);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt="A brass sputnik chandelier illuminating a contemporary living room at dusk"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
        <div className="container-x relative z-10 flex h-full flex-col justify-end pb-20 text-[color:var(--background)]">
          <div className="eyebrow opacity-80">Spring collection — 2026</div>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.02] text-balance md:text-7xl lg:text-8xl">
            Light, considered as a material.
          </h1>
          <p className="mt-6 max-w-xl text-base opacity-90 md:text-lg">
            Eighty-two new pieces in brass, opal glass and blackened steel —
            drawn in our Brescia studio, assembled by hand.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 bg-background px-6 py-3 text-sm tracking-wide text-foreground transition-colors hover:bg-background/90"
            >
              Explore collections
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/inspiration"
              className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-sm tracking-wide text-white transition-colors hover:bg-white/10"
            >
              See it installed
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-4">
          <div className="eyebrow text-muted-foreground">The house</div>
        </div>
        <div className="md:col-span-8">
          <p className="text-2xl leading-snug text-foreground md:text-4xl">
            LightHouse is a small Italian lighting house. We draw, prototype and
            assemble every fixture in a single workshop outside Brescia —
            so a pendant can be re-finished, a chandelier re-wired, a sconce
            reissued in a different metal, decades after it leaves us.
          </p>
        </div>
      </section>

      {/* Collections */}
      <section className="container-x pb-24 md:pb-32">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <div className="eyebrow text-muted-foreground">Collections</div>
            <h2 className="mt-3 text-4xl md:text-5xl">Four worlds of light</h2>
          </div>
          <Link
            to="/collections"
            className="hidden text-sm tracking-wide text-foreground/80 underline-offset-4 hover:underline md:inline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 text-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="border-t border-border bg-secondary/40 py-24 md:py-32">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <div className="eyebrow text-muted-foreground">New this season</div>
              <h2 className="mt-3 text-4xl md:text-5xl">Recently arrived</h2>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {featured.map((p) => (
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
                  <div className="text-sm tabular-nums text-foreground/80">
                    € {p.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration mosaic */}
      <section className="container-x py-24 md:py-32">
        <div className="mb-12 grid items-end gap-6 md:grid-cols-2">
          <div>
            <div className="eyebrow text-muted-foreground">Inspiration</div>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Light in lived-in rooms
            </h2>
          </div>
          <p className="text-muted-foreground md:text-right">
            Photographs from homes, hotels and restaurants where our fixtures
            were specified — submitted by their architects and owners.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          <div className="col-span-2 row-span-2 aspect-[4/5] overflow-hidden">
            <img src={insp1} alt="Reading nook with arc lamp" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="col-span-2 aspect-[4/3] overflow-hidden">
            <img src={insp2} alt="Hotel lobby with brass globe pendants" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={insp3} alt="Restaurant with linear suspensions" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="aspect-square overflow-hidden">
            <img src={insp4} alt="Bedside with amber sconces" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="mt-10">
          <Link to="/inspiration" className="text-sm underline underline-offset-4">
            Browse the full archive →
          </Link>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-border">
        <div className="container-x grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
          <div className="aspect-[5/4] overflow-hidden">
            <img src={storyImg} alt="Inside the LightHouse atelier" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="eyebrow text-muted-foreground">The atelier</div>
            <h2 className="mt-4 text-4xl md:text-5xl">
              A workshop, not a factory.
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              Eighteen people. One building. Every drawing tested in a full-scale
              prototype before it enters production — and every fixture wired,
              finished and photographed under the same roof.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm tracking-wide"
            >
              Read our story
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container-x grid gap-8 py-20 md:grid-cols-2 md:items-center">
          <h2 className="text-3xl md:text-4xl">
            Letters from the workshop, four times a year.
          </h2>
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
            />
            <button
              type="submit"
              className="bg-foreground px-6 py-3 text-sm tracking-wide text-background transition-colors hover:bg-foreground/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
