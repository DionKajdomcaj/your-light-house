import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

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
            <div className="mt-4 text-sm">
              <a href="https://www.instagram.com/lighthouse.studio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-60" aria-label="Instagram">
                <Instagram className="h-4 w-4" strokeWidth={1.5} />
                <span>@lighthouse.studio</span>
              </a>
            </div>
          </div>


        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-[color:var(--ink-light)]/60 pt-6 text-xs text-[color:var(--ink-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Lighthouse SH.P.K. — All rights reserved.</p>
          <p>{"\n"}</p>
        </div>
      </div>
    </footer>
  );
}
