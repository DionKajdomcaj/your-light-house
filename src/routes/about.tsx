import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import storyImg from "@/assets/story.jpg";
import insp2 from "@/assets/inspiration-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Company — Lighthouse" },
      { name: "description", content: "Lighthouse — a family-run Italian lighting house, founded 1974." },
      { property: "og:title", content: "Company — Lighthouse" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "1969", body: "A batch of Murano glass acquired at auction is finished into chandeliers in a small Venetian workshop." },
  { year: "1974", body: "The workshop is formally founded in Mirano, on the Venetian mainland. Decorative lighting becomes the only business." },
  { year: "1989", body: "The first overseas catalog ships to Western Europe. Production moves to a purpose-built facility." },
  { year: "2004", body: "Outdoor and technical lines are introduced. The catalog crosses a thousand active references." },
  { year: "2019", body: "Three thousand SKUs, three hundred active collections, sold across five continents." },
  { year: "Today", body: "Family-run, third generation. Fifteen thousand square metres of warehouse. One identity, one catalog." },
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our company, our family"
        title="A family-run lighting house from the Venetian mainland."
        intro="Founded in 1974 in Mirano, near Venice. Three generations on, the principles are still the same — transparency, simplicity, and an enthusiasm for things well made."
      />

      <section className="container-x grid gap-16 pb-24 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="aspect-[5/4] overflow-hidden">
            <img src={storyImg} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-5 md:pt-10">
          <h2 className="h-section text-2xl md:text-3xl">Habit to simplicity</h2>
          <p className="mt-6 text-[color:var(--ink-muted)] leading-relaxed">
            Every Lighthouse fixture begins as a drawing, becomes a
            full-scale prototype, and only enters production once it has
            spent a season hanging in the studio. We work in brass,
            blackened steel, hand-blown opal and amber glass, and cast
            aluminium.
          </p>
          <p className="mt-4 text-[color:var(--ink-muted)] leading-relaxed">
            Wiring and dimming components are sourced from European
            manufacturers; finishes are applied in our own polishing room.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[color:var(--surface-soft)] py-24 md:py-32">
        <div className="container-x">
          <div className="mb-16 text-center">
            <div className="eyebrow">A short history</div>
            <h2 className="h-section mt-4 text-3xl md:text-4xl">Fifty years of light</h2>
          </div>
          <ol className="mx-auto max-w-2xl">
            {timeline.map((t, i) => (
              <li key={t.year} className="text-center">
                <div className="h-display text-5xl md:text-6xl">{t.year}</div>
                <p className="mt-5 text-[color:var(--ink-muted)] leading-relaxed">{t.body}</p>
                {i < timeline.length - 1 ? (
                  <div className="my-12 flex justify-center" aria-hidden>
                    <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--ink)]" />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-[color:var(--ink-light)]/40">
        <div className="container-x grid gap-10 py-20 md:grid-cols-4">
          {[
            { n: "3,000", l: "Active SKUs" },
            { n: "356", l: "Collections" },
            { n: "15,000 m²", l: "Warehouse" },
            { n: "5", l: "Continents" },
          ].map((s) => (
            <div key={s.l}>
              <div className="h-display text-4xl md:text-5xl">{s.n}</div>
              <div className="mt-3 text-sm text-[color:var(--ink-muted)]">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 md:grid-cols-2 md:items-center">
        <div>
          <div className="eyebrow">Concept</div>
          <h2 className="h-section mt-4 text-3xl md:text-4xl">Your home, our light.</h2>
          <p className="mt-6 text-[color:var(--ink-muted)] leading-relaxed">
            Decorative lighting without the luxury-only price tag. From
            classic Murano to minimal architectural systems — one catalog,
            one identity, one family business.
          </p>
        </div>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={insp2} alt="" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </section>
    </SiteShell>
  );
}
