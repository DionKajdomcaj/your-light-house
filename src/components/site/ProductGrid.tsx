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
    <div className="grid gap-x-8 gap-y-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const dim = p.specs.find((s) => s.label === "Dimensions")?.value;
        return (
          <Link
            key={p.slug}
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden bg-white">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-10 mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-8">
              <div className="text-sm text-[color:var(--ink-muted)]">cod. {p.id.slice(-6)}</div>
              <div className="mt-2 flex items-center gap-3">
                <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                <span
                  aria-hidden
                  className="inline-flex h-7 w-10 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              {dim && (
                <div className="mt-4 text-[15px] text-[color:var(--ink-muted)]">
                  Ø {dim.replace(/^D\s*/, "").replace(/\s*x\s*H/, " x H").replace(/\s*mm$/, "")} mm
                </div>
              )}
            </div>
          </Link>
        );
      })}
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
