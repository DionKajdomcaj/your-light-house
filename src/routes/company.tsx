import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/company")({
  component: CompanyLayout,
});

const tabs = [
  { to: "/company/contacts", label: "Contacts" },
  { to: "/company/warehouse", label: "Warehouse" },
  { to: "/company/company-profile", label: "Company profile" },
] as const;

function CompanyLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <SiteShell>
      <div className="container-x pt-36 pb-6 lg:pt-44" />
      <nav className="container-x flex flex-wrap gap-x-8 gap-y-3 border-b border-[color:var(--ink-light)]/40 pb-5 text-sm">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`transition-opacity hover:opacity-60 ${
              path === t.to ? "underline underline-offset-4" : ""
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </SiteShell>
  );
}
