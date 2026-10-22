import { createFileRoute } from "@tanstack/react-router";
import insp2 from "@/assets/inspiration-2.jpg";
import insp3 from "@/assets/inspiration-3.jpg";
import insp4 from "@/assets/inspiration-4.jpg";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/company/warehouse")({
  head: () => ({
    meta: [
      { title: "Warehouse — Lighthouse" },
      { name: "description", content: "Fifteen thousand square metres of stock in Prishtine, ready to ship across five continents." },
      { property: "og:title", content: "Warehouse — Lighthouse" },
      { property: "og:image", content: insp2 },
      { property: "og:url", content: "/company/warehouse" },
    ],
    links: [{ rel: "canonical", href: "/company/warehouse" }],
  }),
  component: WarehousePage,
});

function WarehousePage() {
  return (
    <>
      <section className="container-x pt-10">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={insp2} alt="" className="h-full w-full object-cover" />
        </div>
        <h1 className="h-display mt-10 text-4xl md:text-6xl">Ready to ship</h1>
      </section>

      <section className="container-x grid gap-10 py-20 md:grid-cols-4">
        {[
          { n: "15,000 m²", l: "Warehouse surface" },
          { n: "3,000+", l: "SKUs in stock" },
          { n: "5", l: "Continents served" },
          { n: "74+", l: "Collaborators" },
        ].map((s) => (
          <div key={s.l}>
            <div className="h-display text-4xl md:text-5xl">{s.n}</div>
            <div className="mt-3 text-sm text-[color:var(--ink-muted)]">{s.l}</div>
          </div>
        ))}
      </section>

      <section className="container-x grid gap-12 pb-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="h-section text-2xl md:text-3xl">A stock-first model</h2>
        </div>
        <div className="md:col-span-7">
          <p className="text-[color:var(--ink-muted)] leading-relaxed">
            Every active reference in the catalog is kept on the floor.
            Orders placed before noon CET ship the same day; pallet loads
            move through a dedicated logistics dock. The result, for
            dealers and contractors, is something rare in decorative
            lighting — predictability.
          </p>
        </div>
      </section>

      <section className="container-x grid grid-cols-2 gap-2 pb-24 md:grid-cols-3">
        {[insp3, insp4, storyImg, insp2, insp3, insp4].map((src, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </section>
    </>
  );
}
