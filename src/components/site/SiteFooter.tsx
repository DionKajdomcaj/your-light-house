import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--surface-soft)] text-[color:var(--ink)]">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="lowercase text-2xl" style={{ letterSpacing: "-0.01em" }}>
              lighthouse
            </div>
            <address className="not-italic mt-6 text-sm leading-7 text-[color:var(--ink-muted)]">
              Lighthouse S.p.A.<br />
              Via dell'Industria, 12<br />
              30035 Mirano (VE) — Italy<br />
              T +39 041 000 0000
            </address>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Catalog</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/collections" className="hover:opacity-60">Indoor</Link></li>
              <li><Link to="/collections" className="hover:opacity-60">Outdoor</Link></li>
              <li><Link to="/collections" className="hover:opacity-60">Technical</Link></li>
              <li><Link to="/inspiration" className="hover:opacity-60">Inspiration</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow">Company</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/about" className="hover:opacity-60">History</Link></li>
              <li><Link to="/contact" className="hover:opacity-60">Where to buy</Link></li>
              <li><Link to="/contact" className="hover:opacity-60">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow">Follow</div>
            <div className="mt-5 flex items-center gap-4">
              <a href="#" aria-label="Instagram" className="hover:opacity-60"><Instagram className="h-4 w-4" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Facebook" className="hover:opacity-60"><Facebook className="h-4 w-4" strokeWidth={1.5} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-60"><Linkedin className="h-4 w-4" strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[color:var(--ink-light)]/60 pt-6 text-xs text-[color:var(--ink-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Lighthouse — All rights reserved.</p>
          <p>VAT IT 00000000000 — REA VE-000000</p>
        </div>
      </div>
    </footer>
  );
}
