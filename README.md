# Lighthouse

The Lighthouse catalog site, built as a single static `index.html` and hosted on GitHub Pages:
<https://dionkajdomcaj.github.io/your-light-house/>

## Layout

```
index.html      the whole site — inlined CSS and JS, including the full catalog
404.html        a copy of index.html; GitHub Pages serves it for deep links
assets/         the local photography referenced by the page
src/            source the page is generated from
build/          the generator
```

`index.html`, `404.html` and `assets/` are generated — edit `src/`, then rebuild.

## Rebuilding

```sh
cd build
npm install     # once
npm run build
```

That bundles `src/` into `../index.html`, compiles Tailwind from `src/styles.css`,
copies `src/assets` to `../assets`, and writes `../404.html`.

To host somewhere other than the `/your-light-house/` sub-path:

```sh
BASE=/ npm run build
```

## How it works

`src/` keeps the original TanStack Router route files unchanged. `build/shim/router.tsx`
is a small stand-in for the parts of `@tanstack/react-router` the site uses — file routes,
layouts, `$params`, loaders, redirects, `notFound`, search params and per-route `head()` —
so the whole thing runs client-side from one file. Served over http(s) it uses real paths;
opened straight from disk it falls back to hash paths.
