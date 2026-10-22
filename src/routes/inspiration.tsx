import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import insp1 from "@/assets/inspiration-1.jpg";
import insp2 from "@/assets/inspiration-2.jpg";
import insp3 from "@/assets/inspiration-3.jpg";
import insp4 from "@/assets/inspiration-4.jpg";
import storyImg from "@/assets/story.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/inspiration")({
  head: () => ({
    meta: [
      { title: "Inspiration — Lighthouse" },
      { name: "description", content: "Lighthouse fixtures installed in homes, hotels and restaurants." },
      { property: "og:title", content: "Inspiration — Lighthouse" },
      { property: "og:url", content: "/inspiration" },
    ],
    links: [{ rel: "canonical", href: "/inspiration" }],
  }),
  component: InspirationPage,
});

function InspirationPage() {
  const items = [
    { src: insp1, caption: "Private residence — Milan" },
    { src: insp2, caption: "Hotel lobby — Florence" },
    { src: insp3, caption: "Restaurant — Bologna" },
    { src: insp4, caption: "Bedroom suite — Como" },
    { src: storyImg, caption: "Atelier — Prishtine" },
    { src: heroImg, caption: "Showroom — Prishtine" },
  ];

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Inspiration"
        title="Light in lived-in rooms"
        intro="Photographs from homes, hotels and restaurants where our fixtures were specified — submitted by their architects and owners."
      />
      <section className="container-x grid gap-1 pb-32 md:grid-cols-2">
        {items.map((it, i) => (
          <figure key={i} className={`relative ${i % 3 === 0 ? "md:col-span-2" : ""}`}>
            <div className={`overflow-hidden ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
              <img src={it.src} alt={it.caption} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <figcaption className="absolute bottom-4 left-4 text-[color:var(--on-image)] text-sm">
              {it.caption}
            </figcaption>
          </figure>
        ))}
      </section>
    </SiteShell>
  );
}
