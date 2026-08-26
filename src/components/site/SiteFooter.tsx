import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--surface-soft)] text-[color:var(--ink)]">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="lowercase text-2xl" style={{ letterSpacing: "-0.01em" }}>
              lighthouse
            </div>
            <address className="not-italic mt-6 text-sm leading-7 text-[color:var(--ink-muted)]">
              Lighthouse SH.P.K.<br />
              Veterrnik - 1<br />
              10000, Prishtine, XK<br />
              T +383 45 555 355
            </address>
            <div className="mt-6 text-sm">
              Get in touch — <a href="mailto:info@lighthouse-kos.com" className="hover:opacity-60">info@lighthouse-kos.com</a>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow">Company</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/company/contacts" className="hover:opacity-60">Contacts</Link></li>
              <li><Link to="/flagship-store" className="hover:opacity-60">Lighthouse store</Link></li>
              <li><Link to="/reserved-area" className="hover:opacity-60">Reserved area</Link></li>
              <li><Link to="/authorized-dealers" className="hover:opacity-60">Authorized dealers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow">Catalog</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/company/history" className="hover:opacity-60">History</Link></li>
              <li><Link to="/products" className="hover:opacity-60">All collections</Link></li>
              <li><Link to="/catalogs" className="hover:opacity-60">Downloads</Link></li>
              <li><Link to="/privacy-policy" className="hover:opacity-60">Privacy & cookies</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow">More</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#" className="hover:opacity-60">Whistleblowing</a></li>
              <li><a href="#" className="hover:opacity-60">Warranty policy</a></li>
              <li><Link to="/company/warehouse" className="hover:opacity-60">Warehouse</Link></li>
              <li><Link to="/company/company-profile" className="hover:opacity-60">Company profile</Link></li>
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
          <p>© {new Date().getFullYear()} Lighthouse S.p.A. — All rights reserved.</p>
          <p>P.Iva C.F. 02420040277</p>
        </div>
      </div>
    </footer>
  );
}
