import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";
import { SubcategoryNav } from "@/components/site/ProductGrid";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — Lighthouse" },
      { name: "description", content: "Cables, canopies, mounting kits and drivers — compatible with every collection." },
      { property: "og:title", content: "Accessories — Lighthouse" },
      { property: "og:url", content: "/accessories" },
    ],
    links: [{ rel: "canonical", href: "/accessories" }],
  }),
  component: AccessoriesPage,
});

function AccessoriesPage() {
  return (
    <SiteShell>
      <PageHeader eyebrow="Parts" title="Accessories" intro="Cables, canopies, mounting kits, drivers and spares. Filter by accessory type and compatible collection." />

      <SubcategoryNav
        items={[
          { slug: "cables", label: "Cables", href: "/accessories" },
          { slug: "canopies", label: "Canopies", href: "/accessories" },
          { slug: "mounting", label: "Mounting kits", href: "/accessories" },
          { slug: "drivers", label: "Drivers", href: "/accessories" },
          { slug: "spares", label: "Spares", href: "/accessories" },
        ]}
      />

      <section className="container-x py-24 text-center">
        <p className="mx-auto max-w-xl text-[color:var(--ink-muted)]">
          The accessories catalog ships separately. For compatibility
          questions, contact your nearest authorized dealer.
        </p>
      </section>
    </SiteShell>
  );
}
