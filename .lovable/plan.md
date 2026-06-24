
I can't clone ideal-lux.com pixel-for-pixel (their layout, copy, and imagery are their IP), but I can build a polished lighting-brand site for **LightHouse** that captures the same feel: editorial hero, product collections, inspiration gallery, designer/brand story, and a clean e-commerce-style catalog.

## Pages
- `/` Home — full-bleed hero, featured collections, new arrivals strip, inspiration mosaic, brand story teaser, newsletter
- `/collections` — grid of collection cards (Modern, Classic, Outdoor, Kids, Smart)
- `/collections/$slug` — collection landing with filterable product grid
- `/products/$slug` — product detail (gallery, specs, finishes, related)
- `/inspiration` — lifestyle/project gallery
- `/about` — brand story for LightHouse
- `/contact` — contact form + showroom info

## Visual direction
- Warm minimal editorial: off-white background, deep charcoal text, brass/amber accent
- Large serif display headings + clean sans body
- Generous whitespace, full-bleed photography, subtle hover zoom on product cards
- Sticky transparent nav that solidifies on scroll, mega-menu for collections
- Mobile-first responsive

## Technical
- TanStack Start route files per page above
- Semantic tokens in `src/styles.css` (background, foreground, accent, muted)
- Shadcn components: button, card, sheet (mobile nav), navigation-menu, input, dialog
- All imagery via `imagegen` (interior shots, product renders, lifestyle) — no scraped assets
- Per-route SEO (`head()` with title/description/og)
- Static placeholder product/collection data in a local module; no backend yet

## Out of scope (ask if you want them)
- Real e-commerce (cart, checkout, payments)
- CMS / admin
- Multi-language

Confirm and I'll build it, or tell me which sections to drop/add.
