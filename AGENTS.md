# AGENTS.md

## Cursor Cloud specific instructions

This is a static Astro 4 site (Fenix Flooring) with Tailwind CSS, TypeScript, and Netlify hosting. No database, Docker, or backend services are needed.

### Running the dev server

```bash
npm run dev          # starts on http://localhost:4321
```

See `README.md` "Getting Started" for full details.

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Full CI suite | `npm run preflight` (build + SEO/content validation) |
| Content QA only | `npm run content:qa:rendered` |
| Link verification | `npm run verify-internal-links` |

### Caveats

- **No ESLint or `astro check`**: The project has no ESLint config. `@astrojs/check` is not installed, so `astro check` is unavailable. TypeScript is used but checked implicitly during build.
- **Netlify Forms**: The contact form uses Netlify Forms, which only processes submissions when deployed to Netlify. Locally the form renders but does not submit.
- **Playwright**: Declared in `devDependencies` but no test files or config exist yet; `npm test` will fail.
- **Preflight is the main validation**: `npm run preflight` runs build + pre-deploy checks + content QA — this is the closest thing to a CI lint/test gate.
