import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { SubcategoryNav } from "@/components/site/ProductGrid";

export const Route = createFileRoute("/bulbs")({
  head: () => ({
    meta: [
      { title: "Bulbs — Lighthouse" },
      { name: "description", content: "Light sources by socket, wattage and color temperature — sold separately." },
      { property: "og:title", content: "Bulbs — Lighthouse" },
      { property: "og:url", content: "/bulbs" },
    ],
    links: [{ rel: "canonical", href: "/bulbs" }],
  }),
  component: BulbsPage,
});

function BulbsPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Light sources" title="Bulbs" intro="LED and conventional bulbs sold separately. Filter by socket, wattage, lumens, color temperature and dimming." />

      <SubcategoryNav
        items={[
          { slug: "e27", label: "E27", href: "/bulbs" },
          { slug: "e14", label: "E14", href: "/bulbs" },
          { slug: "g9", label: "G9", href: "/bulbs" },
          { slug: "gu10", label: "GU10", href: "/bulbs" },
          { slug: "led", label: "LED only", href: "/bulbs" },
          { slug: "dimmable", label: "Dimmable", href: "/bulbs" },
        ]}
      />

      <section className="container-x py-24 text-center">
        <p className="mx-auto max-w-xl text-[color:var(--ink-muted)]">
          The bulb sub-catalog is being updated to the 2026 range. Get in
          touch with your dealer for current stock and pricing.
        </p>
      </section>
    </SiteShell>
  );
}
