import * as esbuild from "esbuild";
import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const project = path.join(root, "..");

/** `@/...` -> src/..., router/zod -> local shims, images -> ./assets/<file> */
const resolvePlugin = {
  name: "lh-resolve",
  setup(build) {
    build.onResolve({ filter: /^@tanstack\/react-router$/ }, () => ({
      path: path.join(root, "shim/router.tsx"),
    }));
    build.onResolve({ filter: /^zod$/ }, () => ({ path: path.join(root, "shim/zod.ts") }));
    build.onResolve({ filter: /\.(jpg|jpeg|png|svg|webp)$/ }, (args) => {
      if (args.namespace === "asset-url") return;
      const file = args.path.replace(/^@\//, "");
      return { path: path.basename(file), namespace: "asset-url" };
    });
    build.onResolve({ filter: /^@\// }, (args) => {
      const base = path.join(project, "src", args.path.slice(2));
      for (const ext of ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
        const candidate = base + ext;
        if (ext !== "" && fs.existsSync(candidate)) return { path: candidate };
        if (ext === "" && fs.existsSync(candidate) && fs.statSync(candidate).isFile())
          return { path: candidate };
      }
      return { path: base };
    });
    build.onLoad({ filter: /.*/, namespace: "asset-url" }, (args) => ({
      contents:
        `import { assetUrl } from ${JSON.stringify(path.join(root, "shim/router.tsx"))};\n` +
        `export default assetUrl(${JSON.stringify("assets/" + args.path)});`,
      loader: "js",
      resolveDir: root,
    }));
  },
};

const BASE = process.env.BASE ?? "/your-light-house/";

await esbuild.build({
  entryPoints: [path.join(root, "shim/entry.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  plugins: [resolvePlugin],
  platform: "browser",
  // ../src has no node_modules of its own; bare imports (react, lucide-react,
  // ...) resolve from this folder, which also rules out a second React copy.
  nodePaths: [path.join(root, "node_modules")],
  outfile: path.join(root, "out/app.js"),
  legalComments: "none",
  logLevel: "warning",
});

// Tailwind resolves `@import "tailwindcss"` relative to the file it sits in, so
// stage a copy of src/styles.css inside build/out (next to build/node_modules)
// with its @source globs rewritten to absolute paths.
fs.mkdirSync(path.join(root, "out"), { recursive: true });
const styles = fs
  .readFileSync(path.join(project, "src/styles.css"), "utf8")
  .replace(/@source\s+"([^"]+)"/g, (_m, glob) =>
    `@source "${path.resolve(path.join(project, "src"), glob)}"`,
  );
fs.writeFileSync(
  path.join(root, "out/tw.css"),
  `${styles}\n@source "${path.join(root, "shim")}";\n`,
);

execFileSync(
  "npx",
  [
    "@tailwindcss/cli",
    "-i", path.join(root, "out/tw.css"),
    "-o", path.join(root, "out/app.css"),
    "--minify",
  ],
  { stdio: "inherit", cwd: root },
);

const css = fs.readFileSync(path.join(root, "out/app.css"), "utf8");
// Guard against an accidental </script> inside a string literal.
const js = fs.readFileSync(path.join(root, "out/app.js"), "utf8").replaceAll("</script", "<\\/script");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Lighthouse &mdash; Light up your ideal</title>
<meta name="description" content="Lighthouse &mdash; decorative and technical lighting. Indoor, outdoor, recessed and systems. Family-run, from Prishtine." />
<meta property="og:site_name" content="Lighthouse" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Lighthouse &mdash; Light up your ideal" />
<meta property="og:url" content="/" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" />
<style>
${css}</style>
</head>
<body>
<div id="root"></div>
<script>window.__BASE__ = ${JSON.stringify(BASE)};</script>
<script>
${js}</script>
</body>
</html>
`;

// Mirror src/assets next to the page.
const assetsOut = path.join(project, "assets");
fs.mkdirSync(assetsOut, { recursive: true });
for (const file of fs.readdirSync(path.join(project, "src/assets"))) {
  fs.copyFileSync(path.join(project, "src/assets", file), path.join(assetsOut, file));
}

fs.writeFileSync(path.join(project, "index.html"), html);
// GitHub Pages has no SPA rewrite; it serves 404.html for unknown paths.
fs.writeFileSync(path.join(project, "404.html"), html);
fs.writeFileSync(path.join(project, ".nojekyll"), "");

console.log(`built index.html + 404.html (base ${BASE}, ${(html.length / 1e6).toFixed(2)} MB)`);
