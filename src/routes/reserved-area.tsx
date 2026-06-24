import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell, PageHeader } from "@/components/site/SiteShell";

export const Route = createFileRoute("/reserved-area")({
  head: () => ({
    meta: [
      { title: "Reserved area — Lighthouse" },
      { name: "description", content: "B2B portal for authorized dealers — order history, stock, price lists and assets." },
      { property: "og:title", content: "Reserved area — Lighthouse" },
      { property: "og:url", content: "/reserved-area" },
    ],
    links: [{ rel: "canonical", href: "/reserved-area" }],
  }),
  component: ReservedArea,
});

function ReservedArea() {
  const [stay, setStay] = useState(false);
  return (
    <SiteShell>
      <PageHeader eyebrow="B2B" title="Reserved area" />

      <section className="container-x grid gap-16 pb-32 md:grid-cols-12">
        <form className="md:col-span-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Field name="email" label="Email" type="email" />
          <Field name="password" label="Password" type="password" />

          <label className="flex items-center gap-3 text-sm">
            <input type="checkbox" checked={stay} onChange={(e) => setStay(e.target.checked)} />
            Stay signed in
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="bg-[color:var(--ink)] px-8 py-4 text-sm text-white hover:opacity-90">
              Sign in
            </button>
            <a href="#" className="text-sm hover:opacity-60">Forgot password →</a>
          </div>

          <div className="pt-8 border-t border-[color:var(--ink-light)]/40">
            <div className="eyebrow">Not a dealer yet?</div>
            <a href="#" className="cta-link mt-3 border-b border-black/80">
              Request access <span aria-hidden>→</span>
            </a>
          </div>
        </form>

        <aside className="md:col-span-6 md:pl-12 md:border-l md:border-[color:var(--ink-light)]/40">
          <div className="eyebrow">Benefits</div>
          <h2 className="h-section mt-4 text-2xl">What's inside</h2>
          <ul className="mt-8 space-y-4 text-sm text-[color:var(--ink-muted)]">
            {[
              "Live stock availability across all SKUs",
              "Order history and re-order from past lines",
              "Trade price lists in your currency",
              "Full B2B catalog with technical attributes",
              "Marketing assets — photography, datasheets, logos",
              "Direct line to your country account manager",
            ].map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden className="mt-2 block h-1 w-1 rounded-full bg-[color:var(--ink)]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </SiteShell>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">{label}</label>
      <input id={name} name={name} type={type} required className="mt-2 w-full border-b border-[color:var(--ink-light)]/80 bg-transparent py-3 outline-none focus:border-[color:var(--ink)]" />
    </div>
  );
}
