import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import insp1 from "@/assets/inspiration-1.jpg";
import insp4 from "@/assets/inspiration-4.jpg";
import storyImg from "@/assets/story.jpg";

export const Route = createFileRoute("/flagship-store")({
  head: () => ({
    meta: [
      { title: "Lighthouse store — Mirano" },
      { name: "description", content: "Visit the Lighthouse flagship store in Mirano (VE) — the full catalog under one roof." },
      { property: "og:title", content: "Lighthouse store — Mirano" },
      { property: "og:image", content: insp1 },
      { property: "og:url", content: "/flagship-store" },
    ],
    links: [{ rel: "canonical", href: "/flagship-store" }],
  }),
  component: FlagshipStore,
});

function FlagshipStore() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Showroom" title="The Mirano store" />

      <section className="container-x pb-16">
        <div className="aspect-[16/9] overflow-hidden">
          <img src={insp1} alt="" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="container-x grid gap-12 pb-20 md:grid-cols-12">
        <div className="md:col-span-5 space-y-8">
          <div>
            <div className="eyebrow">Address</div>
            <p className="not-italic mt-3 leading-7 text-[color:var(--ink-muted)]">
              Via Taglio Destro 32<br />
              30035 Mirano (VE) — Italy<br />
              T +39 041 57 90 500
            </p>
          </div>
          <div>
            <div className="eyebrow">Opening hours</div>
            <p className="mt-3 text-[color:var(--ink-muted)] leading-7">
              Monday — Friday, 09:00 — 13:00 · 14:30 — 18:30<br />
              Saturday, 09:30 — 12:30<br />
              Sunday, closed
            </p>
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="text-lg leading-relaxed">
            Eight hundred square metres next to the workshop. Every active
            collection in the catalog, hung and lit. Walk in to specify a
            project, see a fixture in person, or just to look.
          </p>
        </div>
      </section>

      <section className="container-x grid grid-cols-2 gap-2 pb-24 md:grid-cols-3">
        {[insp4, storyImg, insp1].map((src, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </section>

      <section className="container-x pb-32">
        <div className="aspect-[16/9] overflow-hidden border border-[color:var(--ink-light)]/40 grayscale">
          <iframe
            title="Map to the Lighthouse store"
            src="https://www.openstreetmap.org/export/embed.html?bbox=12.10%2C45.49%2C12.13%2C45.51&amp;layer=mapnik"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </section>
    </SiteShell>
  );
}
