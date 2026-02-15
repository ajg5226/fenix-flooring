# Blog Post Handoff & Structure Guide

How to create, structure, and hand off blog posts for the Fenix Flooring blog. Use this as the single reference for file format, frontmatter, body structure, editorial sections, and the tooling that processes posts.

---

## 1. File location and URL

| What | Where |
|------|--------|
| **Content directory** | `src/content/blog/` |
| **File format** | One `.md` file per post |
| **Filename** | `your-url-slug.md` (lowercase, hyphens, no spaces) |
| **URL** | `/resources/your-url-slug/` (slug = filename without `.md`) |

**Example:** `commercial-flooring-cost-guide-se-pa.md` → `https://www.fenixflooring.com/resources/commercial-flooring-cost-guide-se-pa/`

---

## 2. Frontmatter (YAML)

All posts are validated against the blog content collection schema. Invalid frontmatter will cause a build error.

### Required

| Field | Type | Notes |
|-------|------|--------|
| `title` | string | Used in `<title>`, OG, and on the page. Quote if it contains a colon. |
| `description` | string | Meta description and social. 155–160 chars. Quote if it contains a colon. |
| `pubDate` | date | ISO date or parseable string (e.g. `2025-07-12`). |

### Optional

| Field | Type | Default | Notes |
|-------|------|---------|--------|
| `updatedDate` | date | — | Set when you revise the post. |
| `draft` | boolean | `false` | `true` = excluded from build and index. |
| `tags` | string[] | `[]` | Use a consistent set across posts (see tag list below). |
| `category` | string | — | e.g. `Guides`, `Technical`, `Industry`, `Planning`. |
| `image` | string | — | Path for OG/schema (e.g. `/images/post.jpg`). |
| `imageAlt` | string | — | Alt text for image and OG. |
| `author` | string | `Fenix Flooring Team` | Shown in meta and on the page. |
| `autoInternalLinks` | boolean | `true` | When `false`, no internal links are auto-injected in this post (use for rare exceptions). |

### YAML gotcha: colons

If **title** or **description** contains a colon (`:`), wrap the value in **double quotes** or the parser will break (e.g. “title: Required”, “pubDate: Invalid date”):

```yaml
title: "Commercial Flooring Cost Guide: SE PA Pricing"
description: "Installed pricing for LVT, carpet tile, and more in the Philadelphia suburbs."
```

### Suggested tags (use consistently)

`cost-guides`, `planning`, `moisture-mitigation`, `lvt-lvp`, `vct`, `tile`, `commercial-installation`, `after-hours`, `subfloor-prep`, `technical`, `guides`, `healthcare-flooring`, `education-flooring`, `retail-flooring`, `commercial-flooring`, `se-pa`, `epoxy`, `carpet-tile`

---

## 3. Body structure and formatting

- **No H1 in the body.** The post title from frontmatter is the page H1. Start with H2 (`##`) for the first section.
- **Use H2 for main sections, H3 for subsections.** Keeps outline and anchor links consistent.
- **Standard Markdown:** paragraphs, **bold**, *italic*, lists, [links](/services/), blockquotes, tables, code (inline or fenced). Key phrases (flooring types, services, industries) are **auto-linked** at build time (see below); you can still add manual links.
- **Do not use:**
  - HTML comments for editor-only notes (meta, keywords, etc.)—they clutter the file; remove or keep in a separate brief.
  - `:::remark` or other custom directive blocks for FAQ or scripts—they may render as visible content. Use the standard FAQ section format below.
  - Unreferenced footnote definitions (e.g. `[^1]: ...` at the end with no `[^1]` in the text)—remove or convert to a “References” list.

### Citation artifacts (AI-generated content)

If content is pasted from an AI tool that adds inline citations, remove any `:contentReference[oaicite:...]{index=...}` (or similar) before saving. Search for `contentReference` or `oaicite` and delete those fragments.

---

## 4. Auto-injected internal links (SEO)

At **build time**, the site turns the first occurrence of key phrases in each post into internal links to the right pages (flooring types, services, industries). You don’t add these by hand; they’re generated from the central link map in `src/config/internalLinks.ts`.

- **What gets linked:** Phrases like “LVT/LVP”, “moisture mitigation”, “carpet tile”, “Office buildings”, “Commercial Flooring Installation”, etc., when they appear in the body (first occurrence per target URL per post).
- **Opt out:** Set `autoInternalLinks: false` in frontmatter for a post to disable auto-linking on that post only.

**How to ensure they’re working**

1. Build the site: `npm run build`
2. Run the verification script: `npm run verify-internal-links`

The script checks that built resource pages in `dist/resources/` contain auto-injected links (to `/flooring/...`, `/services/...`, `/industries/...`). It prints how many posts have links and total counts; it exits with an error if there are post pages but no auto-links. Use this in CI or locally after each build to confirm internal links are generating correctly.

---

## 5. Editorial sections at the bottom (optional)

Three optional sections are processed automatically. If present, they **must** use the exact formats below so the build pipeline can strip, rename, or extract them.

### 5.1 Internal links to include (author-only, stripped)

- **Purpose:** Checklist for which internal links to add into the article. Not for readers.
- **Format:** A single line with no heading: `Internal links to include`, then a list of items until the next `##` or end of file.
- **What the site does:** Removes this line and the following list from the rendered page.

**Example:**

```markdown
Internal links to include
- "Commercial Flooring Types Explained" — anchor text: flooring types guide
- "LVT vs Carpet Tile for Offices" — anchor text: LVT vs carpet
```

### 5.2 Source notes (shown as “References”)

- **Purpose:** References or citations for readers.
- **Format:** A level-2 heading exactly `## Source notes`, then a bullet list (e.g. `- [Source: ...]`).
- **What the site does:** The heading is renamed to **References** and the list is shown in the post.

**Example:**

```markdown
## Source notes

- [Source: Manufacturer spec]
- [Source: Industry guidance]
```

### 5.3 FAQPage JSON-LD Schema (SEO only, not visible)

- **Purpose:** FAQ structured data for search (rich results). Must not appear as visible content.
- **Format:** A level-2 heading **exactly** `## FAQPage JSON-LD Schema` (or `## FAQPage JSON‑LD Schema`), then a fenced code block with language `json` containing valid [FAQPage](https://schema.org/FAQPage) JSON. The JSON must have `"@type": "FAQPage"` and a `mainEntity` array of Question/Answer objects.
- **What the site does:** The heading and code block are removed from the body. The JSON is parsed; if valid, it is injected as a `<script type="application/ld+json">` in the page `<head>`. Readers never see the raw JSON.

**Example:**

````markdown
## FAQPage JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Your question here?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your answer here."
      }
    }
  ]
}
```
````

**Important:** Use this heading + ` ```json ` block only. Do **not** wrap the script in `:::remark` or raw `<script>` tags in the markdown; the pipeline only recognizes the heading + fenced code block. The closing ` ``` ` for the code block is required.

Order at the end of the post is flexible, but a common order is: main content → **Internal links to include** → **## Source notes** → **## FAQPage JSON-LD Schema** + code block.

---

## 6. Packages and plugins involved

### Content and build

- **Astro** (`astro` ^4) – SSG and content collections.
- **Content collections** – Blog content is defined in `src/content/config.ts` (collection name: `blog`). Each `.md` file is validated against the schema and exposed as an entry with `id`, `slug`, `body`, and `data` (frontmatter).
- **Markdown processing** – Astro compiles markdown to HTML. The following plugin runs on **all** markdown (including blog posts).

### Custom plugin (blog editorial)

- **`remarkBlogEditorial`** – `src/utils/remarkBlogEditorial.js`, registered in `astro.config.mjs` under `markdown.remarkPlugins`.
  - Strips the paragraph “Internal links to include” and any immediately following list nodes.
  - Renames the heading “Source notes” to “References”.
  - Removes the heading “FAQPage JSON-LD Schema” (or “FAQPage JSON‑LD Schema”) and the very next fenced code block (the JSON block).

So by the time the post body is rendered to HTML, those three sections have already been transformed or removed in the markdown AST.

### FAQ extraction (at render time)

- **`processBlogBody`** – `src/utils/blogBody.ts`, called from `src/pages/resources/[slug].astro`.
  - Reads the **raw** markdown body (before it’s rendered).
  - Finds `## FAQPage JSON-LD Schema` and the following ` ```json ... ``` ` block; parses the JSON; validates `@type === 'FAQPage'` and `mainEntity`.
  - Returns `{ markdown, faqSchema }`. Only `faqSchema` is used: it’s passed into the layout’s `schema` array so the page outputs an extra `<script type="application/ld+json">` in the head. The visible body is already cleaned by the remark plugin, so the FAQ section doesn’t appear on the page.

### Styling

- **Tailwind CSS** (`tailwindcss`, `@astrojs/tailwind`) – Layout and utilities.
- **@tailwindcss/typography** – `prose` classes for the blog body (used in the post template).

### Other

- **@astrojs/sitemap** – Generates sitemap; blog URLs are included when the site is built.

---

## 7. End-to-end flow (how a post becomes a page)

1. **Source:** `src/content/blog/<slug>.md` (frontmatter + body).
2. **Content collection:** Astro loads the file, validates frontmatter against the blog schema, and exposes an entry with `body` (raw markdown) and `data` (frontmatter).
3. **Static path:** `src/pages/resources/[slug].astro` uses `getStaticPaths()` to generate one path per published post (draft = false).
4. **Per-request (build):** For each slug, the page loads the entry, calls `processBlogBody(post.body)` to get `faqSchema`, then calls `render(post)` to compile the markdown. The **remark plugin** runs during that compile step, so the body HTML no longer contains “Internal links to include,” and “Source notes” becomes “References,” and the FAQ heading + code block are removed.
5. **Layout:** BaseLayout receives the array of schemas (breadcrumb, article, and optionally `faqSchema`) and outputs each as `<script type="application/ld+json">` in the head. The post body is rendered inside the blog-prose container.

---

## 8. Full post template

Copy and adapt this into `src/content/blog/<your-slug>.md`:

````markdown
---
title: "Your Post Title"
description: "One or two sentences for search and social. 155–160 characters."
pubDate: 2025-01-15
updatedDate: 2025-02-01
draft: false
tags:
  - cost-guides
  - lvt-lvp
category: "Guides"
author: "Fenix Flooring Team"
---

## First section heading

First paragraph. Use **bold** for key terms. [Link to services](/services/) where relevant.

## Second section

- Bullet lists
- Work as usual

### Subsection (H3)

More content.

## Source notes

- [Source: Example reference]

## FAQPage JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Example question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Example answer."
      }
    }
  ]
}
```
````

Omit “Internal links to include,” “Source notes,” and/or “FAQPage JSON-LD Schema” if you don’t need them.

---

## 9. Handoff options (for AI or teammates)

### Option A: One file per post (recommended)

Create or paste the full post in `src/content/blog/<slug>.md` using the structure above.

### Option B: Multiple posts in one message

Use a separator so each post can be turned into a file:

```
---POST---
slug: my-first-post
title: My First Post
description: Short meta description. 155–160 chars.
pubDate: 2025-01-15
tags: cost-guides, planning
category: Guides

Body in Markdown. Start with ## for first section.

---POST---
slug: my-second-post
...
```

Instruction to give: “Add the following blog posts using the format in docs/BLOG-POST-HANDOFF.md (Option B). Create one markdown file per post in `src/content/blog/` with the slug as the filename (e.g. `my-first-post.md`).”

### Option C: Table

Provide a table with columns: slug, title, description, pubDate, tags, category, body (or path to body). Bodies can be in the table or in separate files (e.g. `body_my-post.md`).

---

## 10. SEO checklist per post

- [ ] **title** – Unique, ~60 characters or less, includes main keyword.
- [ ] **description** – Unique, 155–160 characters, keyword and summary or CTA.
- [ ] **slug** – URL-friendly (lowercase, hyphens), matches intent.
- [ ] **pubDate** – Set; set **updatedDate** when you revise.
- [ ] **tags** – At least one; reuse the same tag set for tag pages.
- [ ] **image** + **imageAlt** – For OG, schema, and accessibility.
- [ ] **Body** – No H1 in body; use H2/H3; internal links where it makes sense.

---

## 11. Where things live

| Item | Path or URL |
|------|-------------|
| Blog index | `/resources/` |
| Single post | `/resources/[slug]/` |
| Tag page | `/resources/tag/[tag]/` |
| Post files | `src/content/blog/*.md` |
| Content config (schema) | `src/content/config.ts` |
| Remark plugin | `src/utils/remarkBlogEditorial.js` |
| FAQ/body preprocessing | `src/utils/blogBody.ts` |
| Post page template | `src/pages/resources/[slug].astro` |
| Blog utilities | `src/utils/blog.ts` |
| This guide | `docs/BLOG-POST-HANDOFF.md` |
| Broader plan | `docs/RESOURCES-TO-BLOG-PLAN.md` |

After adding or changing posts, run `npm run build` (or your deploy pipeline) to regenerate the site and sitemap.
