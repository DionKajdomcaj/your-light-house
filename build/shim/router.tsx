/**
 * A minimal stand-in for the slice of @tanstack/react-router this site uses,
 * so the route modules can run unchanged inside a single static index.html.
 *
 * Supported: file routes with layouts, dynamic $params, loaders, beforeLoad
 * redirects, notFound, validateSearch, per-route head(), <Link>, <Outlet>,
 * useRouterState, useNavigate, useSearch, useLoaderData.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

/* ------------------------------------------------------------------ errors */

export class NotFoundError extends Error {
  readonly isNotFound = true;
}
export function notFound(): NotFoundError {
  return new NotFoundError("Not found");
}

export class RedirectError extends Error {
  readonly isRedirect = true;
  constructor(public readonly to: string) {
    super(`Redirect to ${to}`);
  }
}
export function redirect(opts: { to: string; params?: Record<string, string> }): RedirectError {
  return new RedirectError(buildPath(opts.to, opts.params));
}

/* ------------------------------------------------------------- route table */

type Params = Record<string, string>;
type SearchObj = Record<string, string>;

export type RouteOptions = {
  component?: React.ComponentType;
  notFoundComponent?: React.ComponentType;
  loader?: (ctx: { params: Params }) => unknown;
  beforeLoad?: (ctx: { params: Params }) => void;
  validateSearch?: { parse: (v: unknown) => SearchObj } | ((v: unknown) => SearchObj);
  head?: (ctx: { loaderData?: unknown; params: Params }) => HeadResult;
};

export type HeadResult = {
  meta?: Array<Record<string, string>>;
  links?: Array<Record<string, string>>;
};

export type RouteObject = {
  id: string;
  options: RouteOptions;
  useLoaderData: <T = unknown>() => T;
  useSearch: <T = SearchObj>() => T;
  useNavigate: () => (opts: NavigateOptions) => void;
  useRouteContext: () => Record<string, unknown>;
  useParams: () => Params;
};

const routes = new Map<string, RouteObject>();

export function createFileRoute(id: string) {
  return (options: RouteOptions): RouteObject => {
    const route: RouteObject = {
      id,
      options,
      useLoaderData: <T,>() => useMatch().loaderData as T,
      useSearch: <T,>() => {
        const raw = useLocationState().search;
        const v = options.validateSearch;
        if (!v) return raw as T;
        return (typeof v === "function" ? v(raw) : v.parse(raw)) as T;
      },
      useNavigate: () => useNavigate(),
      useRouteContext: () => ({}),
      useParams: () => useMatch().params,
    };
    routes.set(id, route);
    return route;
  };
}

/** `/products/` -> `/products`, `/` stays `/` */
function idToPattern(id: string): string {
  if (id === "/") return "/";
  return id.endsWith("/") ? id.slice(0, -1) : id;
}

function isLayout(id: string): boolean {
  if (id.endsWith("/")) return false;
  const prefix = id + "/";
  for (const other of routes.keys()) if (other !== id && other.startsWith(prefix)) return true;
  return false;
}

function segments(path: string): string[] {
  return path.split("/").filter(Boolean);
}

function matchPattern(pattern: string, pathname: string): Params | null {
  const ps = segments(pattern);
  const xs = segments(pathname);
  if (ps.length !== xs.length) return null;
  const params: Params = {};
  for (let i = 0; i < ps.length; i++) {
    if (ps[i].startsWith("$")) params[ps[i].slice(1)] = decodeURIComponent(xs[i]);
    else if (ps[i] !== xs[i]) return null;
  }
  return params;
}

type Match = { route: RouteObject; params: Params; loaderData?: unknown };

function resolveMatches(pathname: string): { matches: Match[]; notFound: boolean } {
  const leaves = [...routes.values()].filter((r) => !isLayout(r.id));
  // Static segments win over dynamic ones ($slug).
  leaves.sort((a, b) => {
    const dyn = (id: string) => segments(id).filter((s) => s.startsWith("$")).length;
    return dyn(a.id) - dyn(b.id);
  });

  for (const leaf of leaves) {
    const params = matchPattern(idToPattern(leaf.id), pathname);
    if (!params) continue;
    const chain: Match[] = [];
    for (const route of routes.values()) {
      if (isLayout(route.id) && (leaf.id === route.id || leaf.id.startsWith(route.id + "/"))) {
        chain.push({ route, params });
      }
    }
    chain.sort((a, b) => a.route.id.length - b.route.id.length);
    chain.push({ route: leaf, params });
    return { matches: chain, notFound: false };
  }
  return { matches: [], notFound: true };
}

/* ---------------------------------------------------------------- location */

/**
 * Served over http(s) the app uses real paths; opened straight from disk
 * (file://) it falls back to hash paths so deep links keep working.
 */
const useHash = typeof window !== "undefined" && window.location.protocol === "file:";

/**
 * Sub-directory the site is served from, e.g. "/your-light-house/" on a
 * GitHub Pages project site. Set via `window.__BASE__` in index.html.
 */
const BASE: string = (() => {
  const raw =
    (typeof window !== "undefined" && (window as unknown as { __BASE__?: string }).__BASE__) || "/";
  const withLead = raw.startsWith("/") ? raw : "/" + raw;
  return withLead.endsWith("/") ? withLead : withLead + "/";
})();

/** "/your-light-house/products" -> "/products" */
function stripBase(pathname: string): string {
  if (BASE === "/") return pathname;
  const noSlash = BASE.slice(0, -1);
  if (pathname === noSlash) return "/";
  if (pathname.startsWith(BASE)) return "/" + pathname.slice(BASE.length);
  return pathname;
}

/**
 * Resolve a bundled image. Served from a sub-directory the path needs the
 * base prefix; opened from disk it stays relative to index.html.
 */
export function assetUrl(p: string): string {
  return useHash ? "./" + p : BASE + p;
}

/** "/products" -> "/your-light-house/products" */
function withBase(pathname: string): string {
  if (BASE === "/") return pathname;
  return pathname === "/" ? BASE : BASE.slice(0, -1) + pathname;
}

function readLocation(): { pathname: string; searchStr: string } {
  if (typeof window === "undefined") return { pathname: "/", searchStr: "" };
  if (useHash) {
    const raw = window.location.hash.replace(/^#/, "") || "/";
    const qi = raw.indexOf("?");
    return qi === -1
      ? { pathname: raw, searchStr: "" }
      : { pathname: raw.slice(0, qi), searchStr: raw.slice(qi + 1) };
  }
  return {
    pathname: stripBase(window.location.pathname || "/"),
    searchStr: window.location.search.replace(/^\?/, ""),
  };
}

function normalize(pathname: string): string {
  if (!pathname.startsWith("/")) pathname = "/" + pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  return pathname;
}

const listeners = new Set<() => void>();
let snapshot = serialize();

function serialize(): string {
  const { pathname, searchStr } = readLocation();
  return normalize(pathname) + (searchStr ? "?" + searchStr : "");
}

function emit() {
  const next = serialize();
  if (next === snapshot) return;
  snapshot = next;
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("popstate", emit);
  window.addEventListener("hashchange", emit);
}

export type NavigateOptions = {
  to?: string;
  params?: Params;
  search?: SearchObj;
  replace?: boolean;
  resetScroll?: boolean;
};

export function buildPath(to: string, params?: Params): string {
  if (!params) return to;
  return to.replace(/\$([A-Za-z0-9_]+)/g, (m, key: string) =>
    params[key] != null ? encodeURIComponent(params[key]) : m,
  );
}

export function buildHref(opts: NavigateOptions, current?: string): string {
  const pathname = normalize(opts.to != null ? buildPath(opts.to, opts.params) : current ?? "/");
  const qs = opts.search
    ? new URLSearchParams(
        Object.entries(opts.search).filter(([, v]) => v !== "" && v != null) as [string, string][],
      ).toString()
    : "";
  const full = pathname + (qs ? "?" + qs : "");
  return useHash ? "#" + full : withBase(pathname) + (qs ? "?" + qs : "");
}

export function navigateTo(href: string, replace = false, resetScroll = true) {
  if (useHash) {
    const target = href.startsWith("#") ? href : "#" + href;
    if (replace) window.history.replaceState(null, "", target);
    else window.history.pushState(null, "", target);
  } else {
    if (replace) window.history.replaceState(null, "", href);
    else window.history.pushState(null, "", href);
  }
  emit();
  if (resetScroll) window.scrollTo(0, 0);
}

function useLocationState() {
  const href = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => snapshot,
    () => snapshot,
  );
  return useMemo(() => {
    const qi = href.indexOf("?");
    const pathname = qi === -1 ? href : href.slice(0, qi);
    const searchStr = qi === -1 ? "" : href.slice(qi + 1);
    const search: SearchObj = {};
    new URLSearchParams(searchStr).forEach((v, k) => (search[k] = v));
    return { href, pathname, searchStr, search };
  }, [href]);
}

export function useNavigate() {
  const loc = useLocationState();
  return useCallback(
    (opts: NavigateOptions) => navigateTo(buildHref(opts, loc.pathname), opts.replace),
    [loc.pathname],
  );
}

export function useRouter() {
  return useMemo(
    () => ({
      invalidate: () => listeners.forEach((l) => l()),
      navigate: (opts: NavigateOptions) => navigateTo(buildHref(opts)),
    }),
    [],
  );
}

export function useRouterState<T>({ select }: { select: (s: RouterState) => T }): T {
  const loc = useLocationState();
  return select({ location: { pathname: loc.pathname, search: loc.search, href: loc.href } });
}

export type RouterState = {
  location: { pathname: string; search: SearchObj; href: string };
};

/* -------------------------------------------------------------- match tree */

const MatchContext = createContext<{ matches: Match[]; index: number } | null>(null);

function useMatch(): Match {
  const ctx = useContext(MatchContext);
  if (!ctx) throw new Error("useMatch outside a route");
  return ctx.matches[ctx.index];
}

export function Outlet() {
  const ctx = useContext(MatchContext);
  if (!ctx) return null;
  const next = ctx.index + 1;
  if (next >= ctx.matches.length) return null;
  return <MatchRenderer matches={ctx.matches} index={next} />;
}

function MatchRenderer({ matches, index }: { matches: Match[]; index: number }) {
  const value = useMemo(() => ({ matches, index }), [matches, index]);
  const Component = matches[index].route.options.component;
  return (
    <MatchContext.Provider value={value}>
      {Component ? <Component /> : <Outlet />}
    </MatchContext.Provider>
  );
}

/* -------------------------------------------------------------------- head */

function applyHead(results: HeadResult[]) {
  const meta: Record<string, string> = {};
  let title: string | undefined;
  const canonicals: string[] = [];

  for (const r of results) {
    for (const m of r.meta ?? []) {
      if (m.title != null) title = m.title;
      else if (m.name) meta["name:" + m.name] = m.content ?? "";
      else if (m.property)
        meta["property:" + m.property] =
          m.property === "og:url" ? withBase(m.content ?? "/") : m.content ?? "";
    }
    for (const l of r.links ?? [])
      if (l.rel === "canonical" && l.href) canonicals.push(withBase(l.href));
  }

  if (title) document.title = title;

  document.querySelectorAll("[data-route-head]").forEach((el) => el.remove());
  const head = document.head;
  for (const [key, content] of Object.entries(meta)) {
    const [kind, name] = [key.slice(0, key.indexOf(":")), key.slice(key.indexOf(":") + 1)];
    // Update the static tag if there is one, otherwise add a managed tag.
    const existing = head.querySelector(`meta[${kind}="${CSS.escape(name)}"]:not([data-route-head])`);
    if (existing) {
      existing.setAttribute("content", content);
      continue;
    }
    const el = document.createElement("meta");
    el.setAttribute(kind, name);
    el.setAttribute("content", content);
    el.setAttribute("data-route-head", "");
    head.appendChild(el);
  }
  for (const href of canonicals) {
    const el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    el.setAttribute("href", href);
    el.setAttribute("data-route-head", "");
    head.appendChild(el);
  }
}

/* -------------------------------------------------------------------- Link */

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  params?: Params;
  search?: SearchObj;
  replace?: boolean;
};

export function Link({ to, params, search, replace, onClick, children, ...rest }: LinkProps) {
  const href = buildHref({ to, params, search });
  return (
    <a
      {...rest}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        navigateTo(href, replace);
      }}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ router */

export function RouterView({
  notFoundComponent: RootNotFound,
}: {
  notFoundComponent: React.ComponentType;
}) {
  const loc = useLocationState();

  const resolved = useMemo(() => {
    const { matches, notFound: missing } = resolveMatches(loc.pathname);
    if (missing) return { kind: "not-found" as const };

    for (const m of matches) {
      try {
        m.route.options.beforeLoad?.({ params: m.params });
      } catch (err) {
        if (err instanceof RedirectError) return { kind: "redirect" as const, to: err.to };
        throw err;
      }
    }

    for (const m of matches) {
      if (!m.route.options.loader) continue;
      try {
        m.loaderData = m.route.options.loader({ params: m.params });
      } catch (err) {
        if (err instanceof NotFoundError) {
          return { kind: "route-not-found" as const, matches };
        }
        throw err;
      }
    }
    return { kind: "ok" as const, matches };
  }, [loc.pathname]);

  useEffect(() => {
    if (resolved.kind === "redirect") navigateTo(buildHref({ to: resolved.to }), true);
  }, [resolved]);

  useEffect(() => {
    if (resolved.kind !== "ok") {
      document.querySelectorAll("[data-route-head]").forEach((el) => el.remove());
      return;
    }
    applyHead(
      resolved.matches
        .map((m) =>
          m.route.options.head?.({ loaderData: m.loaderData, params: m.params }) ?? {},
        )
        .filter(Boolean),
    );
  }, [resolved, loc.href]);

  if (resolved.kind === "not-found" || resolved.kind === "redirect") {
    return resolved.kind === "redirect" ? null : <RootNotFound />;
  }

  if (resolved.kind === "route-not-found") {
    // Render the deepest route's own notFoundComponent inside its layouts.
    const matches = resolved.matches;
    const leaf = matches[matches.length - 1];
    const Fallback = leaf.route.options.notFoundComponent ?? RootNotFound;
    const chain: Match[] = [
      ...matches.slice(0, -1),
      { route: { ...leaf.route, options: { component: Fallback } }, params: leaf.params },
    ];
    return <MatchRenderer matches={chain} index={0} />;
  }

  return <MatchRenderer matches={resolved.matches} index={0} />;
}

/** Route plain in-app <a href="/..."> links (outside <Link>) through the router. */
export function installAnchorInterceptor() {
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    const anchor = (e.target as HTMLElement | null)?.closest?.("a");
    if (!anchor) return;
    const raw = anchor.getAttribute("href");
    if (!raw || !raw.startsWith("/") || anchor.hasAttribute("target")) return;
    const [rawPath, rawQuery] = raw.split("?");
    const appPath = normalize(stripBase(rawPath));
    if (!resolveMatches(appPath).matches.length) return;
    e.preventDefault();
    const search: SearchObj = {};
    new URLSearchParams(rawQuery ?? "").forEach((v, k) => (search[k] = v));
    navigateTo(buildHref({ to: appPath, search }));
  });
}
