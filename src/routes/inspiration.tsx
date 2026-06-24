import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import insp1 from "@/assets/inspiration-1.jpg";
import insp2 from "@/assets/inspiration-2.jpg";
import insp3 from "@/assets/inspiration-3.jpg";
import insp4 from "@/assets/inspiration-4.jpg";
import colModern from "@/assets/collection-modern.jpg";
import colClassic from "@/assets/collection-classic.jpg";
import colOutdoor from "@/assets/collection-outdoor.jpg";

export const Route = createFileRoute("/inspiration")({
  head: () => ({
    meta: [
      { title: "Inspiration — LightHouse" },
      { name: "description", content: "Homes, hotels and restaurants where LightHouse fixtures were specified." },
      { property: "og:title", content: "Inspiration — LightHouse" },
      { property: "og:url", content: "/inspiration" },
    ],
    links: [{ rel: "canonical", href: "/inspiration" }],
  }),
  component: InspirationPage,
});

const projects = [
  { img: insp2, title: "Hotel Bellavista", place: "Lake Como, IT", role: "Lobby chandeliers" },
  { img: insp1, title: "Private residence", place: "Stockholm, SE", role: "Reading room lighting" },
  { img: insp3, title: "Trattoria Settima", place: "Milan, IT", role: "Linear suspensions" },
  { img: insp4, title: "Hotel Linnea", place: "Copenhagen, DK", role: "Guest-room sconces" },
  { img: colModern, title: "Casa Olmo", place: "Bologna, IT", role: "Dining pendants" },
  { img: colClassic, title: "Villa Aurora", place: "Florence, IT", role: "Entry chandelier" },
  { img: colOutdoor, title: "House on the Cliff", place: "Liguria, IT", role: "Terrace lighting" },
];

export default function InspirationPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Inspiration"
        title="Where the light has gone."
        intro="A growing archive of homes and public rooms our fixtures have travelled to — sent in by the architects and owners who specified them."
      />
      <section className="container-x columns-1 gap-6 pb-32 md:columns-2 lg:columns-3">
        {projects.map((p) => (
          <figure key={p.title} className="mb-6 break-inside-avoid">
            <div className="overflow-hidden bg-secondary">
              <img src={p.img} alt={p.title} loading="lazy" className="w-full" />
            </div>
            <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-sm">
              <div>
                <div className="font-display text-lg">{p.title}</div>
                <div className="text-muted-foreground">{p.place}</div>
              </div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {p.role}
              </div>
            </figcaption>
          </figure>
        ))}
      </section>
    </SiteShell>
  );
}
