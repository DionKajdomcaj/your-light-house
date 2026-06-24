import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import storyImg from "@/assets/story.jpg";
import insp2 from "@/assets/inspiration-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Atelier — LightHouse" },
      { name: "description", content: "The story of LightHouse — a small Italian lighting workshop in Brescia." },
      { property: "og:title", content: "Atelier — LightHouse" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="The atelier"
        title="A small workshop, lit from within."
        intro="LightHouse was founded in 2008 in a converted print works outside Brescia. Eighteen people now design, prototype, finish and ship every fixture that leaves the building."
      />

      <section className="container-x grid gap-12 pb-24 md:grid-cols-12">
        <div className="md:col-span-7">
          <div className="aspect-[5/4] overflow-hidden">
            <img src={storyImg} alt="Inside the workshop" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-5 md:pt-8">
          <h2 className="text-3xl md:text-4xl">Designed in pencil.</h2>
          <p className="mt-6 text-muted-foreground">
            Every new piece begins as a full-size drawing on tracing paper.
            From there it becomes a wood-and-wire mock-up, then a working
            prototype in its intended materials. Nothing reaches production
            without spending a season hanging in the studio.
          </p>
          <p className="mt-4 text-muted-foreground">
            We work in brass, blackened steel, hand-blown opal and amber
            glass, and cast aluminium. Wiring and dimming components are
            sourced from European manufacturers; finishes are applied in
            our own polishing room.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-x grid gap-10 py-20 md:grid-cols-3">
          {[
            { n: "18", l: "People in the workshop" },
            { n: "84", l: "Active pieces in catalogue" },
            { n: "10 yr", l: "Minimum production lifespan" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-6xl text-foreground">{s.n}</div>
              <div className="mt-3 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl md:text-4xl">Made to be re-made.</h2>
          <p className="mt-6 text-muted-foreground">
            A LightHouse fixture is a long object. Send a pendant back
            after twenty years and we will re-wire it, re-finish the brass,
            replace the glass — and ship it home. The drawing files,
            tooling and spare parts for every piece in the catalogue are
            kept on site.
          </p>
        </div>
        <div className="aspect-[4/3] overflow-hidden">
          <img src={insp2} alt="Installed fixtures" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </section>
    </SiteShell>
  );
}
