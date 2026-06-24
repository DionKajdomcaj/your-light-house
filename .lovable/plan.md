# Why every page 404s

`src/routeTree.gen.ts` is stale/corrupt. It was hand-edited in an earlier turn and never regenerated properly. Evidence from the current file:

- `collections.$slug.tsx` (declares `/collections/$slug`) is registered as `/$slug` — so `/collections/anything` falls through to root-level `$slug`.
- `company.history.tsx`, `company.contacts.tsx`, `company.warehouse.tsx`, `company.company-profile.tsx` are registered at `/history`, `/contacts`, `/warehouse`, `/company-profile` instead of nested under `/company/*`.
- Duplicate `id: '/'` entries appear in the tree.
- `/products/` exists but nothing maps `/products` → that index cleanly without a `products.tsx` layout.

Result: most nav clicks land on TanStack's notFound boundary.

## Fix

1. Delete `src/routeTree.gen.ts` and let the TanStack Router Vite plugin regenerate it from the existing files in `src/routes/`. Restart the dev server so the plugin re-scans.
2. Add a tiny `src/routes/products.tsx` layout (just `<Outlet />`) so `products.index.tsx` (`/products/`) and the children (`products.indoor`, `products.outdoor`, `products.technical`, `products.$slug`) nest correctly under a real `/products` parent and `/products` resolves cleanly.
3. Verify by reading the regenerated `routeTree.gen.ts` — every route ID should match its `createFileRoute(...)` string (e.g. `/collections/$slug`, `/company/history`, `/products/indoor`).
4. Spot-check in the running preview: `/collections/ceiling`, `/company/history`, `/products`, `/products/indoor`, `/new-releases`.

No component code changes needed beyond the new `products.tsx` layout. Header `Link` targets already match the intended URLs.
