import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/40">
      <div className="container-x grid gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl">LightHouse</div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A lighting house designing decorative and architectural fixtures
            from a workshop in Brescia, Italy. Every piece assembled by hand,
            shipped worldwide.
          </p>
        </div>

        <div>
          <div className="eyebrow text-muted-foreground">Catalogue</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/collections" className="hover:underline">All collections</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "modern" }} className="hover:underline">Modern</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "classic" }} className="hover:underline">Classic</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "outdoor" }} className="hover:underline">Outdoor</Link></li>
            <li><Link to="/inspiration" className="hover:underline">Inspiration</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow text-muted-foreground">Maison</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="hover:underline">The atelier</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><a href="#" className="hover:underline">Trade programme</a></li>
            <li><a href="#" className="hover:underline">Press</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} LightHouse — Maison de lumière, Brescia</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
