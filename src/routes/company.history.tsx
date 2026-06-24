import { createFileRoute } from "@tanstack/react-router";
import storyImg from "@/assets/story.jpg";
import insp2 from "@/assets/inspiration-2.jpg";
import insp3 from "@/assets/inspiration-3.jpg";
import insp4 from "@/assets/inspiration-4.jpg";

export const Route = createFileRoute("/company/history")({
  head: () => ({
    meta: [
      { title: "History — Lighthouse" },
      { name: "description", content: "Founded 1974 in Mirano. The history of a family-run Italian lighting house." },
      { property: "og:title", content: "History — Lighthouse" },
      { property: "og:image", content: storyImg },
      { property: "og:url", content: "/company/history" },
    ],
    links: [{ rel: "canonical", href: "/company/history" }],
  }),
  component: HistoryPage,
});

const milestones = [
  { y: "1969", t: "A batch of Murano glass acquired at auction is finished by hand into chandeliers." },
  { y: "1971", t: "First wholesale orders ship from a converted workshop on the Venetian mainland." },
  { y: "1974", t: "Lighthouse is formally founded by Giovanbattista Strano in Mirano (VE)." },
  { y: "1976", t: "First catalog printed. Twenty active references." },
  { y: "1990", t: "Production moves into the present-day facility on Via Taglio Destro." },
  { y: "2007", t: "Outdoor line introduced." },
  { y: "2008", t: "Technical line — recessed and tracks — introduced." },
  { y: "2009", t: "Distribution opens in North America." },
  { y: "2010", t: "First three-thousand-SKU catalog." },
  { y: "2012", t: "LED conversion of the decorative range begins." },
  { y: "2013", t: "Second-generation management takes over operations." },
  { y: "2014", t: "Showroom inaugurated in Mirano." },
  { y: "2018", t: "Warehouse expands to 15,000 sqm." },
  { y: "2019", t: "Concept line ‘Your home, our light.’ launched." },
  { y: "2024", t: "Three hundred and fifty-six active collections, sold across five continents." },
];

function HistoryPage() {
  return (
    <>
      <section className="container-x pt-10">
        <h1 className="h-display text-4xl md:text-6xl lg:text-7xl">Our company, our family</h1>
        <div className="mt-12 aspect-[16/9] overflow-hidden">
          <img src={storyImg} alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="text-xl leading-relaxed md:text-2xl">
            Lighthouse was born in 1974 from one intuition — that design
            lighting could belong in every home, not just the few. Fifty
            years on, the company is still family-run, still in the same
            town on the Venetian mainland, still building light as it
            always did.
          </p>
        </div>
        <div className="md:col-span-6">
          <p className="text-[color:var(--ink-muted)] leading-relaxed">
            From a workshop of three to a warehouse of fifteen thousand
            square metres, the values have not moved: enthusiasm for
            things well made, an attitude to transparency, the habit of
            simplicity. Today Lighthouse sells across five continents,
            from one building, with the same family at the helm.
          </p>
        </div>
      </section>

      {/* archival gallery */}
      <section className="container-x pb-24">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {[insp2, insp3, insp4, storyImg].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover grayscale" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[color:var(--surface-soft)] py-24 md:py-32">
        <div className="container-x">
          <div className="mb-14 text-center">
            <div className="eyebrow">Our story</div>
            <h2 className="h-section mt-4 text-3xl md:text-4xl">Fifty years of light</h2>
          </div>
          <ol className="mx-auto max-w-2xl">
            {milestones.map((m, i) => (
              <li key={m.y} className="text-center">
                <div className="h-display text-5xl md:text-6xl">{m.y}</div>
                <p className="mt-5 text-[color:var(--ink-muted)] leading-relaxed">{m.t}</p>
                {i < milestones.length - 1 ? (
                  <div className="my-12 flex justify-center" aria-hidden>
                    <span className="block h-1.5 w-1.5 rounded-full bg-[color:var(--ink)]" />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
