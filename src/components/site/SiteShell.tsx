import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
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
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="container-x pt-40 pb-16 lg:pt-48 lg:pb-24">
      <div className="eyebrow text-muted-foreground">{eyebrow}</div>
      <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
      {intro ? (
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          {intro}
        </p>
      ) : null}
    </section>
  );
}
