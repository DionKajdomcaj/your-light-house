import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteShell({
  children,
  overImage = false,
}: {
  children: ReactNode;
  overImage?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--surface)]">
      <SiteHeader overImage={overImage} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="container-x pt-36 pb-16 lg:pt-44 lg:pb-24">
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h1 className="h-display mt-6 max-w-5xl text-4xl md:text-6xl lg:text-7xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-8 max-w-2xl text-base text-[color:var(--ink-muted)] md:text-lg leading-relaxed">
          {intro}
        </p>
      ) : null}
    </section>
  );
}
