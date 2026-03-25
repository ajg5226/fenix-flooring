# CLAUDE.md

## Project Overview

Fenix Flooring is a lead-generation static website for a commercial flooring contractor serving Eastern Pennsylvania, Delaware, and New Jersey (90-mile radius from Pottstown, PA). Built with Astro for maximum SEO performance and static delivery.

## Tech Stack

- **Astro 4.0+** (static site generator)
- **TypeScript 5.0**
- **Tailwind CSS 3.4** with custom brand palette
- **Netlify** for hosting and form handling
- **Playwright** for E2E testing

## Common Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Build static site → dist/
npm run preview      # Preview production build locally

npm run test                    # Run Playwright E2E tests
npm run verify-internal-links   # Check for broken internal links
npm run checks                  # Pre-deploy validation checks
npm run content:qa              # Content quality assurance
npm run content:qa:all          # Full QA suite
npm run preflight               # Full preflight: build + 9 validation checks (used in CI)
```

## Architecture

### Key Directories

- `src/pages/` — Auto-routed Astro pages (~50 total); follows file-based routing
- `src/components/` — Reusable Astro components (Header, Footer, QuoteForm, FAQ, CTA, etc.)
- `src/content/blog/` — Markdown blog posts using Astro Content Collections
- `src/config/` — Data-driven config for site info, services, flooring types, areas, industries
- `src/layouts/BaseLayout.astro` — Master page template; handles all SEO meta tags
- `src/utils/` — Schema generators, blog utilities, text helpers, Remark plugins
- `scripts/` — Node.js validation scripts (content QA, pre-deploy checks, link verification)
- `docs/` — Project documentation (blog handoff guide, content plan, UTM taxonomy)

### Content Architecture

All site data is driven by TypeScript config files:

- `src/config/site.ts` — Master config: business info, nav menus, form options
- `src/config/services.ts` — Service definitions
- `src/config/flooring.ts` — Flooring types catalog
- `src/config/areas.ts` — Service area pages
- `src/config/residential.ts` — Residential services

### Blog System

- Blog posts live in `src/content/blog/` as Markdown files
- Schema defined in `src/content/config.ts` (Zod validation)
- Required frontmatter: `title`, `description`, `pubDate`
- Custom Remark plugins auto-inject internal links and handle editorial formatting at build time
- See `docs/BLOG-POST-HANDOFF.md` for full authoring guide

### SEO & Schema

- Every page gets canonical tags, OG tags, and Twitter Card meta automatically via `BaseLayout.astro`
- JSON-LD schema generation is centralized in `src/utils/schema.ts`
- Sitemap auto-generated via `@astrojs/sitemap`
- `noindex` is applied to utility pages (thank-you, privacy, etc.) — validated by preflight

## CI/CD

GitHub Actions runs `npm run preflight` on PRs targeting `staging`, `master`, or `main`. The preflight validates:

1. Build compiles without errors
2. Canonical tags on all pages
3. Sitemap validity
4. Redirect functionality
5. Noindex compliance
6. Meta tags completeness (title, description, OG)
7. Internal link integrity
8. Blog auto-link injection
9. Image file reference resolution

**All PRs must pass preflight before merging.**

## Brand Colors (Tailwind Custom Palette)

| Name       | Hex     | Usage              |
|------------|---------|--------------------|
| Charcoal   | #222121 | Primary text       |
| Ochre      | #85754E | Primary accent     |
| Sand/Taupe | #D0C7B3 | Secondary          |
| Terracotta | #A45D44 | Tertiary           |

## Deployment

- **Platform:** Netlify
- **Build command:** `npm run build`
- **Publish dir:** `dist/`
- **Forms:** Netlify Forms (no custom backend)
- Redirects and security headers configured in `netlify.toml` and `public/_headers`
- Non-www → www canonicalization enforced via redirects

## Development Notes

- No backend or database — this is a fully static site
- Add new pages by creating `.astro` files in `src/pages/`; routing is automatic
- Add new blog posts by creating `.md` files in `src/content/blog/` with valid frontmatter
- Extend service/flooring/area pages by updating the relevant config file in `src/config/`
- When adding images, place them in `public/images/` and verify references with `npm run content:qa`
- Run `npm run verify-internal-links` after any URL or page changes
