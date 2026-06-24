import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, Globe, X, ArrowLeft } from "lucide-react";

const nav = [
  { to: "/collections", label: "Indoor" },
  { to: "/collections", label: "Outdoor" },
  { to: "/collections", label: "Technical" },
  { to: "/inspiration", label: "Inspiration" },
  { to: "/about", label: "Company" },
  { to: "/contact", label: "Where to buy" },
] as const;

export function SiteHeader({ overImage = false }: { overImage?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onImage = overImage && !scrolled && !open;
  const fg = onImage ? "text-[color:var(--on-image)]" : "text-[color:var(--ink)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        onImage
          ? "bg-transparent"
          : "bg-white border-b border-[color:var(--ink-light)]/40"
      }`}
    >
      <div className={`container-x flex h-16 items-center justify-between lg:h-20 ${fg}`}>
        <Link to="/" className="flex items-center">
          <span className="text-xl lowercase tracking-tight" style={{ fontWeight: 400, letterSpacing: "-0.01em" }}>
            lighthouse
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item, i) => (
            <Link
              key={`${item.label}-${i}`}
              to={item.to}
              className="text-sm font-normal transition-opacity hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center transition-opacity hover:opacity-60 lg:inline-flex"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Language"
            className="hidden h-9 w-9 items-center justify-center transition-opacity hover:opacity-60 lg:inline-flex"
          >
            <Globe className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-60"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white text-[color:var(--ink)]">
          <div className="container-x flex h-16 items-center justify-between lg:h-20">
            <button
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back
            </button>
            <span className="lowercase text-xl">lighthouse</span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="h-9 w-9 inline-flex items-center justify-center">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="container-x mt-8 flex flex-col divide-y divide-[color:var(--ink-light)]/40 border-t border-[color:var(--ink-light)]/40">
            {nav.map((item, i) => (
              <Link
                key={`${item.label}-m-${i}`}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-6 text-2xl uppercase tracking-[0.06em] font-light"
              >
                {item.label}
                <span aria-hidden>→</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
