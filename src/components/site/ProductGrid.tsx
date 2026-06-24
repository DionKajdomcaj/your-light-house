import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/catalog";

export function ProductGrid({ items }: { items: Product[] }) {
  if (items.length === 0) {
    return (
      <p className="text-[color:var(--ink-muted)] py-20 text-center">
        No products match these filters yet.
      </p>
    );
  }
  return (
    <div className="grid gap-x-6 gap-y-16 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <Link
          key={p.slug}
          to="/products/$slug"
          params={{ slug: p.slug }}
          className="group block"
        >
          <div className="relative aspect-square overflow-hidden bg-[color:var(--surface)]">
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90"
            />
          </div>
          <div className="mt-5">
            <div className="t-code">cod. {p.id.slice(-6)}</div>
            <div className="t-product mt-1">{p.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function SubcategoryNav({
  items,
  active,
}: {
  items: { slug: string; label: string; href: string }[];
  active?: string;
}) {
  return (
    <nav className="container-x flex flex-wrap gap-x-6 gap-y-3 border-y border-[color:var(--ink-light)]/40 py-5 text-sm">
      {items.map((it) => (
        <Link
          key={it.slug}
          to={it.href}
          className={`transition-opacity hover:opacity-60 ${
            active === it.slug ? "underline underline-offset-4" : ""
          }`}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
