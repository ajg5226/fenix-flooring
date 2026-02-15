# Resources → Blog Reform Plan (MVP)

**Scope:** Reform the MVP resources section into a blog-style experience with 15+ posts and full SEO implementation.  
**Target:** `fenix-flooring-test-mvp`  
**Content:** At least 15 blog posts (existing 3 + new posts you provide by EOD).

---

## 1. Current State Summary

| Area | Current |
|------|--------|
| **Resources index** | Single page listing 3 hardcoded resources (title, slug, description). No pagination, no tags. |
| **Individual posts** | One `.astro` file per post with full content in the file. Breadcrumbs + CTA. No Article schema, no article-specific meta. |
| **SEO** | BaseLayout: title, description, canonical, OG/Twitter, robots. Schema: BreadcrumbList only on posts. `getArticleSchema()` exists in `schema.ts` but is unused. |
| **URLs** | `/resources/`, `/resources/[slug]/` (e.g. `commercial-flooring-cost-guide`). |

---

## 2. Target Architecture

### 2.1 Content model (blog posts)

**Recommended: Astro Content Collections**

- **Why:** Single source of truth, type-safe frontmatter, easy to add 15+ posts without new .astro files, built-in validation.
- **Location:** `src/content/blog/` (or keep naming as `resources` in URLs; collection can still be named `blog` internally).
- **Format:** Markdown or MDX. Each file = one post.

**Frontmatter schema (per post):**

```yaml
title: string          # Display + SEO
description: string    # Meta description (155–160 chars)
slug: string          # URL segment (optional if derived from filename)
pubDate: string       # ISO date – SEO + schema
updatedDate: string   # Optional – schema dateModified
draft: boolean        # Exclude from build when true
tags: string[]        # For filtering + SEO (keywords, article:tag)
category: string      # Optional – e.g. "Guides", "Technical" (article:section)
image: string         # Path to featured image – OG + schema
imageAlt: string      # Alt for featured image – a11y + SEO
author: string        # e.g. "Fenix Flooring Team" – schema + og:article:author
```

**URLs:** Keep current pattern: `/resources/` (index), `/resources/[slug]/` (post). No change for users or existing links.

### 2.2 Blog index page (`/resources/`)

- **Layout:** Blog listing (cards with featured image, title, excerpt, date, tags).
- **Features:**
  - List all published posts (from content collection), newest first.
  - Optional: pagination (e.g. 10 per page) or “Load more” once you have 15+.
  - Filter by tag (e.g. `/resources/?tag=lvt` or dedicated tag pages; see below).
- **SEO:** One H1 (e.g. “Commercial Flooring Blog” or “Resources”), meta title/description focused on blog/resource hub, optional `ItemList` schema for the list.

### 2.3 Individual post pages

- **Implementation:** Dynamic route `src/pages/resources/[slug].astro` that loads post by `slug` from the content collection. This replaces the current one-file-per-post .astro pages.
- **Layout:** Reuse current post layout: hero with title + description, breadcrumbs, prose body, CTA. Add: published/updated dates, tags (links), optional “Related posts” (e.g. same tag).
- **Content:** Rendered from collection (Markdown/MDX). Existing 3 posts migrated into collection entries so URLs stay the same.

### 2.4 Tags and tag pages (SEO + discoverability)

- **Tag list:** Derived from frontmatter `tags` across all posts.
- **Tag pages:** e.g. `/resources/tag/[tag].astro` → `/resources/tag/lvt/`, `/resources/tag/cost-guides/`.
  - Each tag page: list of posts with that tag, unique title (e.g. “LVT & LVP | Fenix Flooring Blog”), meta description, canonical URL.
  - **SEO:** Noindex tag pages if you prefer to consolidate “authority” on main blog and post URLs; or index them for long-tail (recommended: index with clear titles/descriptions).
- **Internal linking:** Blog index and each post show tags as links to tag pages; tag pages link back to posts and to blog index.

---

## 3. SEO Implementation Checklist

### 3.1 On-page SEO (every post + index + tag pages)

| Element | Implementation |
|--------|----------------|
| **Title** | Unique per page. Pattern: `[Post Title] \| Fenix Flooring` or `[Post Title] \| Commercial Flooring Blog`. Keep under ~60 characters where possible. |
| **Meta description** | Unique per page, 155–160 characters, include primary keyword and a clear CTA or summary. From frontmatter `description` for posts. |
| **Headings** | One H1 per page (post title or blog title). Logical H2 → H3 hierarchy in body (already in place in current posts). |
| **Keywords** | Use naturally in title, description, first paragraph, and headings. Optional: `keywords` meta (low impact but harmless). |
| **URLs** | Clean, consistent: `/resources/[slug]/`. No unnecessary query params for canonical content. |

### 3.2 Technical SEO

| Element | Implementation |
|--------|----------------|
| **Canonical** | Every page: `<link rel="canonical" href="...">`. BaseLayout already supports `canonical`; ensure post and tag pages pass correct canonical (e.g. `siteConfig.url + '/resources/' + slug + '/'`). |
| **Robots** | `index, follow` for blog index and all post and tag pages. Use `noindex, follow` only for utility pages (e.g. pagination page 2+ if you want only page 1 indexed). |
| **Sitemap** | Include `/resources/`, all `/resources/[slug]/`, and all `/resources/tag/[tag]/` with correct `lastmod` (from frontmatter `updatedDate` or `pubDate`). Differentiate priority/changefreq: e.g. blog index `priority` 0.8, posts 0.7, tag pages 0.6. |
| **Structured data** | See next section. |
| **Mobile & performance** | Already responsive; ensure images in posts use responsive images and lazy loading where appropriate. |

### 3.3 Structured data (Schema.org)

| Page type | Schema |
|-----------|--------|
| **Blog index** | `BreadcrumbList` (Home → Resources). Optional: `ItemList` with one `ListItem` per post (name, url, position). |
| **Post** | `BreadcrumbList` (Home → Resources → [Post title]). `Article` or `BlogPosting`: headline, description, url, datePublished, dateModified, image, author (Organization), publisher. Optional: `keywords` from tags. Use existing `getArticleSchema()` in `schema.ts`; extend if needed (e.g. BlogPosting, mainEntityOfPage). |
| **Tag page** | `BreadcrumbList` (Home → Resources → Tag: [tag]). Optional: `ItemList` for posts on that tag. |

### 3.4 Social and rich results (OG / Twitter / Article)

| Element | Implementation |
|--------|----------------|
| **OG** | BaseLayout already has `og:title`, `og:description`, `og:image`, `og:url`. For posts add: `og:type` = `article`, `article:published_time`, `article:modified_time`, `article:author`, `article:section` (from category), `article:tag` (from tags). |
| **Twitter** | Keep `summary_large_image`; ensure post-specific title, description, image are passed. |
| **Featured image** | Per-post `image` in frontmatter; use for OG/Twitter and Article schema. Fallback to site default if missing. |

### 3.5 Internal linking and content

- **Blog index** → All posts (title + link), tag links.
- **Each post** → Tags (→ tag pages), optional “Related posts” (same tag or category), CTA to services/contact.
- **Tag pages** → Posts with that tag, link back to blog index.
- **Footer/Nav** | Keep “Resources” pointing to `/resources/` (blog index).

---

## 4. Implementation Phases

### Phase 1: Content collection and data layer

1. Add content config: `src/content/config.ts` with schema for `blog` (or `resources`) collection (title, description, slug, pubDate, updatedDate, draft, tags, category, image, imageAlt, author).
2. Create `src/content/blog/` and migrate the 3 existing posts into Markdown files with the above frontmatter. Preserve current slugs so URLs are unchanged.
3. Add a helper (e.g. `src/utils/blog.ts`) to get all posts, get post by slug, get all tags, get posts by tag.

### Phase 2: Blog index and dynamic post page

4. Replace `src/pages/resources/index.astro` with new blog index: pull posts from collection, sort by date, render as cards (image, title, excerpt, date, tags). Add optional pagination or “Load more.”
5. Add `src/pages/resources/[slug].astro` (getStaticPaths from collection). Render post with BaseLayout, breadcrumbs, Article schema, and article-specific meta (OG article, dates, author, tags).
6. Extend BaseLayout (or create BlogLayout) to accept optional `article` prop and output `og:type=article`, `article:published_time`, etc.
7. Remove or redirect old static resource .astro files (e.g. `commercial-flooring-cost-guide.astro`) once [slug] is in place so only one URL per post exists.

### Phase 3: Tags and tag pages

8. Implement tag extraction from collection (unique list of tags).
9. Add `src/pages/resources/tag/[tag].astro` with getStaticPaths for each tag. Page: list posts for that tag, breadcrumbs, title “Posts tagged [Tag] | Fenix Flooring Blog,” meta description, optional ItemList schema.
10. On blog index and post layout, render tags as links to `/resources/tag/[tag]/`.

### Phase 4: SEO hardening

11. **Schema:** Use `getArticleSchema()` for every post (with datePublished, dateModified, image, author). Add BreadcrumbList everywhere. Optionally add ItemList on index and tag pages.
12. **Sitemap:** Update `sitemap.ts` (or integration) so blog and tag URLs are included with sensible lastmod (post’s updatedDate/pubDate), priority, and changefreq.
13. **Meta:** Ensure each post passes canonical, description, ogImage (from frontmatter), and article meta (dates, author, section, tag) into the layout.
14. **robots.txt:** No change needed unless you want to explicitly allow/disallow tag or pagination paths.

### Phase 5: Content and polish

15. Add the 15+ new blog posts as Markdown files in the content collection (using the same frontmatter schema).
16. Add optional “Related posts” on post page (e.g. same tag, limit 3).
17. Final pass: validate titles/descriptions length, run a few posts through Google Rich Results Test and a crawler (e.g. Screaming Frog) for meta and schema.

---

## 5. File and URL Summary

| Purpose | URL | Source |
|--------|-----|--------|
| Blog index | `/resources/` | `src/pages/resources/index.astro` (data from content collection) |
| Single post | `/resources/[slug]/` | `src/pages/resources/[slug].astro` + `src/content/blog/*.md` |
| Tag page | `/resources/tag/[tag]/` | `src/pages/resources/tag/[tag].astro` |
| Existing slugs to preserve | `commercial-flooring-cost-guide`, `planning-flooring-replacement-occupied-building`, `moisture-mitigation-when-needed` | Same slugs in collection entries |

---

## 6. Tag and category suggestions (for your 15+ posts)

Use a consistent set of tags so tag pages and filters are useful and SEO-friendly. Examples:

- **By topic:** `cost-guides`, `planning`, `moisture-mitigation`, `lvt-lvp`, `vct`, `tile`, `commercial-installation`, `after-hours`, `subfloor-prep`, `sustainability`, `maintenance`, `healthcare-flooring`, `education-flooring`, `retail-flooring`, etc.
- **By content type:** `guides`, `how-to`, `technical`, `industry`, `case-studies` (if you mix in short case studies).

Categories (optional, for `article:section`): e.g. “Guides,” “Technical,” “Industry,” “Planning.”

---

## 7. Quick reference: SEO checklist per post

When you add each of the 15+ posts, ensure:

- [ ] `title` and `description` (meta) unique and within length guidelines.
- [ ] `slug` is URL-friendly and matches intended URL.
- [ ] `pubDate` (and optionally `updatedDate`) set for schema and sitemap.
- [ ] `tags` (and optionally `category`) set for filtering and article:tag/section.
- [ ] `image` and `imageAlt` set for OG and Article schema.
- [ ] One H1 in the body (usually the post title).
- [ ] Internal links to relevant services/flooring/industry pages where natural.

This plan is inclusive of tagging, content structure, and full SEO implementation (on-page, technical, structured data, social, sitemap, internal linking) so the MVP resources section becomes a scalable, SEO-optimized blog ready for 15+ posts.

---

## 8. Handing off new blog posts

See **`docs/BLOG-POST-HANDOFF.md`** for:

- **Option A:** One Markdown file per post in `src/content/blog/` (filename = URL slug).
- **Option B:** Paste multiple posts in one message using the `---POST---` delimiter format.
- **Option C:** Spreadsheet/table with slug, title, description, dates, tags, and body (or path to body).

Use the same frontmatter schema as the existing posts; the handoff doc includes a template and SEO checklist.
