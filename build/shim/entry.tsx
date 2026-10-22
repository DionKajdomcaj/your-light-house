import React from "react";
import { createRoot } from "react-dom/client";
import { Link, RouterView, installAnchorInterceptor, useRouter } from "@tanstack/react-router";

// Route modules register themselves with the router on import.
import "@/routes/index";
import "@/routes/products";
import "@/routes/products.index";
import "@/routes/products.indoor";
import "@/routes/products.outdoor";
import "@/routes/products.technical";
import "@/routes/products.$slug";
import "@/routes/collections.index";
import "@/routes/collections.$slug";
import "@/routes/company";
import "@/routes/company.index";
import "@/routes/company.contacts";
import "@/routes/company.warehouse";
import "@/routes/company.company-profile";
import "@/routes/bulbs";
import "@/routes/accessories";
import "@/routes/new-releases";
import "@/routes/inspiration";
import "@/routes/catalogs";
import "@/routes/authorized-dealers";
import "@/routes/flagship-store";
import "@/routes/reserved-area";
import "@/routes/contact";
import "@/routes/privacy-policy";
import "@/routes/search";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorView({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: unknown }
> {
  state = { error: null as unknown };
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (this.state.error) return <ErrorView reset={() => this.setState({ error: null })} />;
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <RouterView notFoundComponent={NotFoundComponent} />
    </ErrorBoundary>
  );
}

installAnchorInterceptor();
createRoot(document.getElementById("root")!).render(<App />);
