#!/usr/bin/env node
/**
 * Pre-deploy validation suite for Fenix Flooring website.
 * Runs against the built dist/ directory and checks:
 *   1. Build output exists
 *   2. Canonical tag audit
 *   3. Sitemap validation
 *   4. Redirect page validation
 *   5. Noindex compliance
 *   6. Meta tag completeness
 *   7. Internal link integrity
 *   8. Blog auto-links
 *   9. Image reference check
 *
 * Usage:
 *   npm run build && node scripts/pre-deploy-checks.mjs
 *   — or —
 *   npm run preflight          (build + checks)
 *
 * Exit code 0 = all checks pass, 1 = one or more failures.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST = path.join(PROJECT_ROOT, 'dist');
const SITE_URL = 'https://www.fenixflooring.com';

// --- Known configuration ---

const KNOWN_NOINDEX_PATHS = [
  '/thank-you/',
  '/404.html',
  '/go/linkedin/',
  '/flooring/epoxy-resinous/',
  '/flooring/polished-concrete/',
  '/case-studies/retail-polished-concrete/',
];

const KNOWN_REDIRECT_PAGES = [
  {
    pagePath: '/industries/residential/',
    targetPath: '/residential/',
    targetCanonical: `${SITE_URL}/residential/`,
  },
];

// Paths that are utility/redirect pages with minimal HTML (skip meta tag checks)
const UTILITY_PAGES = [
  '/go/linkedin/',
];

// Paths that are not real content pages (exclude from "missing from sitemap" check)
const SITEMAP_EXCLUDE_PATHS = new Set([
  '/404.html',
  ...KNOWN_NOINDEX_PATHS,
  ...KNOWN_REDIRECT_PAGES.map((r) => r.pagePath),
  ...UTILITY_PAGES,
]);

// Deprecated internal link targets that should no longer appear
const DEPRECATED_LINK_TARGETS = ['/industries/residential/'];

// --- Helpers ---

function getAllHtmlFiles(dir, base = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHtmlFiles(full, rel));
    } else if (entry.name.endsWith('.html')) {
      results.push({ rel, full });
    }
  }
  return results;
}

function htmlToPagePath(relPath) {
  // dist/about/index.html -> /about/
  // dist/404.html -> /404.html
  let p = '/' + relPath.replace(/\\/g, '/');
  if (p.endsWith('/index.html')) {
    p = p.replace('/index.html', '/');
  }
  return p;
}

function pagePathToDistFile(pagePath) {
  // /about/ -> dist/about/index.html
  // /404.html -> dist/404.html
  if (pagePath.endsWith('/')) {
    return path.join(DIST, pagePath, 'index.html');
  }
  return path.join(DIST, pagePath);
}

function pass(name, detail) {
  console.log(`[PASS] ${name}: ${detail}`);
  return { name, passed: true };
}

function fail(name, detail, issues = []) {
  console.log(`[FAIL] ${name}: ${detail}`);
  for (const issue of issues.slice(0, 20)) {
    console.log(`       - ${issue}`);
  }
  if (issues.length > 20) {
    console.log(`       ... and ${issues.length - 20} more`);
  }
  return { name, passed: false };
}

// =====================================================================
// CHECK 1: Build output exists
// =====================================================================
function checkBuildOutput(htmlFiles) {
  const name = 'Build output';
  if (!fs.existsSync(DIST)) {
    return fail(name, 'dist/ directory not found — run npm run build first');
  }
  if (htmlFiles.length === 0) {
    return fail(name, 'dist/ contains no HTML files');
  }
  return pass(name, `${htmlFiles.length} pages`);
}

// =====================================================================
// CHECK 2: Canonical tag audit
// =====================================================================
function checkCanonicals(htmlFiles) {
  const name = 'Canonical tags';
  const issues = [];
  let verified = 0;

  for (const { rel, full } of htmlFiles) {
    const pagePath = htmlToPagePath(rel);
    const html = fs.readFileSync(full, 'utf8');
    const isNoindex = /name="robots"\s+content="noindex/i.test(html);
    const isRedirect = /http-equiv="refresh"/i.test(html);

    // Skip noindex pages that don't use BaseLayout (like the redirect stub)
    if (isRedirect) {
      // Redirect pages should have canonical pointing elsewhere
      const canonicals = [...html.matchAll(/rel="canonical"\s+href="([^"]+)"/g)];
      if (canonicals.length === 1) {
        const url = canonicals[0][1];
        if (!url.startsWith(SITE_URL)) {
          issues.push(`${pagePath}: redirect canonical not www: ${url}`);
        }
      }
      continue;
    }

    if (isNoindex) continue; // noindex pages don't get canonical

    const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)];
    if (canonicals.length === 0) {
      issues.push(`${pagePath}: missing canonical tag`);
      continue;
    }
    if (canonicals.length > 1) {
      issues.push(`${pagePath}: multiple canonical tags (${canonicals.length})`);
      continue;
    }

    const url = canonicals[0][1];
    if (!url.startsWith(`${SITE_URL}/`)) {
      issues.push(`${pagePath}: canonical not www: ${url}`);
      continue;
    }
    if (url.includes('//') && url.indexOf('//') !== url.indexOf('://') + 1) {
      issues.push(`${pagePath}: canonical has double slashes: ${url}`);
      continue;
    }

    // Check self-referencing: canonical path should match page path
    const canonicalPath = new URL(url).pathname;
    if (canonicalPath !== pagePath) {
      issues.push(`${pagePath}: canonical path mismatch — canonical=${canonicalPath}`);
      continue;
    }

    verified++;
  }

  if (issues.length > 0) {
    return fail(name, `${issues.length} issue(s)`, issues);
  }
  return pass(name, `${verified} pages verified, all ${SITE_URL.replace('https://', '')}`);
}

// =====================================================================
// CHECK 3: Sitemap validation
// =====================================================================
function checkSitemap(htmlFiles) {
  const name = 'Sitemap';
  const sitemapPath = path.join(DIST, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    return fail(name, 'sitemap.xml not found in dist/');
  }

  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (locs.length === 0) {
    return fail(name, 'sitemap.xml contains no URLs');
  }

  const issues = [];

  // Collect noindex pages from built HTML
  const noindexPaths = new Set();
  for (const { rel, full } of htmlFiles) {
    const html = fs.readFileSync(full, 'utf8');
    if (/name="robots"\s+content="noindex/i.test(html)) {
      noindexPaths.add(htmlToPagePath(rel));
    }
  }

  // Build set of actual indexable page paths
  const allPagePaths = new Set(htmlFiles.map((f) => htmlToPagePath(f.rel)));
  const sitemapPaths = new Set();

  for (const loc of locs) {
    // Must be www + https
    if (!loc.startsWith(`${SITE_URL}/`)) {
      issues.push(`Non-www URL in sitemap: ${loc}`);
      continue;
    }

    const urlPath = new URL(loc).pathname;
    sitemapPaths.add(urlPath);

    // Must correspond to a built file
    const distFile = pagePathToDistFile(urlPath);
    if (!fs.existsSync(distFile)) {
      issues.push(`Sitemap URL has no built file: ${loc}`);
    }

    // Must not be a noindex page
    if (noindexPaths.has(urlPath)) {
      issues.push(`Noindex page in sitemap: ${urlPath}`);
    }

    // Must not be a known redirect
    for (const redir of KNOWN_REDIRECT_PAGES) {
      if (urlPath === redir.pagePath) {
        issues.push(`Redirect page in sitemap: ${urlPath}`);
      }
    }
  }

  // Reverse check: every indexable page should be in sitemap
  for (const pagePath of allPagePaths) {
    if (SITEMAP_EXCLUDE_PATHS.has(pagePath)) continue;
    if (noindexPaths.has(pagePath)) continue;
    if (!sitemapPaths.has(pagePath)) {
      issues.push(`Indexable page missing from sitemap: ${pagePath}`);
    }
  }

  if (issues.length > 0) {
    return fail(name, `${issues.length} issue(s)`, issues);
  }
  return pass(name, `${locs.length} URLs, all valid, no redirects/noindex pages`);
}

// =====================================================================
// CHECK 4: Redirect page validation
// =====================================================================
function checkRedirects() {
  const name = 'Redirect pages';
  const issues = [];

  for (const redir of KNOWN_REDIRECT_PAGES) {
    const filePath = pagePathToDistFile(redir.pagePath);
    if (!fs.existsSync(filePath)) {
      issues.push(`Redirect page not found: ${redir.pagePath}`);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // Must have meta refresh
    const refreshMatch = html.match(/http-equiv="refresh"\s+content="[^"]*url=([^"]+)"/i);
    if (!refreshMatch) {
      issues.push(`${redir.pagePath}: missing meta refresh`);
    } else if (!refreshMatch[1].includes(redir.targetPath)) {
      issues.push(`${redir.pagePath}: meta refresh points to ${refreshMatch[1]}, expected ${redir.targetPath}`);
    }

    // Must have canonical pointing to target
    const canonicalMatch = html.match(/rel="canonical"\s+href="([^"]+)"/);
    if (!canonicalMatch) {
      issues.push(`${redir.pagePath}: missing canonical`);
    } else if (canonicalMatch[1] !== redir.targetCanonical) {
      issues.push(`${redir.pagePath}: canonical is ${canonicalMatch[1]}, expected ${redir.targetCanonical}`);
    }

    // Must NOT have robots index,follow
    if (/name="robots"\s+content="index,\s*follow"/i.test(html)) {
      issues.push(`${redir.pagePath}: has robots index,follow (should not be indexable)`);
    }
  }

  if (issues.length > 0) {
    return fail(name, `${issues.length} issue(s)`, issues);
  }
  const summary = KNOWN_REDIRECT_PAGES.map((r) => `${r.pagePath} -> ${r.targetPath}`).join(', ');
  return pass(name, `${summary} OK`);
}

// =====================================================================
// CHECK 5: Noindex compliance
// =====================================================================
function checkNoindex(htmlFiles) {
  const name = 'Noindex compliance';
  const issues = [];

  for (const expectedPath of KNOWN_NOINDEX_PATHS) {
    const filePath = pagePathToDistFile(expectedPath);
    if (!fs.existsSync(filePath)) {
      // Some pages like /go/linkedin/ may not exist — skip
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    if (!/name="robots"\s+content="noindex/i.test(html)) {
      issues.push(`${expectedPath}: expected noindex but has index,follow`);
    }
  }

  if (issues.length > 0) {
    return fail(name, `${issues.length} issue(s)`, issues);
  }
  const count = KNOWN_NOINDEX_PATHS.filter((p) => fs.existsSync(pagePathToDistFile(p))).length;
  return pass(name, `${count} pages correctly noindexed`);
}

// =====================================================================
// CHECK 6: Meta tag completeness
// =====================================================================
function checkMetaTags(htmlFiles) {
  const name = 'Meta tags';
  const issues = [];

  for (const { rel, full } of htmlFiles) {
    const pagePath = htmlToPagePath(rel);
    const html = fs.readFileSync(full, 'utf8');

    // Skip redirect stubs and known utility pages (they use minimal HTML shells)
    if (/http-equiv="refresh"/i.test(html)) continue;
    if (UTILITY_PAGES.includes(pagePath)) continue;

    // Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/);
    if (!titleMatch || !titleMatch[1].trim()) {
      issues.push(`${pagePath}: missing or empty <title>`);
    }

    // Meta description
    if (!/name="description"\s+content="[^"]+"/i.test(html)) {
      issues.push(`${pagePath}: missing meta description`);
    }

    // OG tags
    if (!/property="og:title"\s+content="[^"]+"/i.test(html)) {
      issues.push(`${pagePath}: missing og:title`);
    }
    if (!/property="og:description"\s+content="[^"]+"/i.test(html)) {
      issues.push(`${pagePath}: missing og:description`);
    }
    if (!/property="og:url"\s+content="[^"]+"/i.test(html)) {
      issues.push(`${pagePath}: missing og:url`);
    }
    if (!/property="og:image"\s+content="[^"]+"/i.test(html)) {
      issues.push(`${pagePath}: missing og:image`);
    }

    // og:url should match canonical
    const ogUrlMatch = html.match(/property="og:url"\s+content="([^"]+)"/i);
    const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
    if (ogUrlMatch && canonicalMatch && ogUrlMatch[1] !== canonicalMatch[1]) {
      issues.push(`${pagePath}: og:url (${ogUrlMatch[1]}) != canonical (${canonicalMatch[1]})`);
    }
  }

  if (issues.length > 0) {
    return fail(name, `${issues.length} issue(s)`, issues);
  }
  return pass(name, 'all pages have title, description, OG tags');
}

// =====================================================================
// CHECK 7: Internal link integrity
// =====================================================================
function checkInternalLinks(htmlFiles) {
  const name = 'Internal links';
  const issues = [];

  // Build set of all valid page paths from dist
  const validPaths = new Set();
  for (const { rel } of htmlFiles) {
    validPaths.add(htmlToPagePath(rel));
  }
  // Also allow paths that resolve to directories with index.html
  // (e.g. /contact/ is valid if dist/contact/index.html exists)

  // Build set of all static files in dist (for asset links like /images/...)
  const allDistFiles = new Set();
  function walkDist(dir, base = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = base + '/' + entry.name;
      if (entry.isDirectory()) {
        walkDist(path.join(dir, entry.name), rel);
      } else {
        allDistFiles.add(rel);
      }
    }
  }
  walkDist(DIST);

  let totalChecked = 0;
  const deprecatedFound = [];

  for (const { rel, full } of htmlFiles) {
    const pagePath = htmlToPagePath(rel);
    const html = fs.readFileSync(full, 'utf8');

    // Extract all href values that start with /
    const hrefMatches = [...html.matchAll(/href="(\/[^"#]*)(?:#[^"]*)?"/g)];

    for (const match of hrefMatches) {
      let linkPath = match[1];
      totalChecked++;

      // Normalize: ensure trailing slash for directory-style paths
      // Skip known file extensions
      const hasExtension = /\.\w+$/.test(linkPath);

      if (!hasExtension && !linkPath.endsWith('/')) {
        linkPath = linkPath + '/';
      }

      // Check if it resolves to a file
      let resolved = false;
      if (hasExtension) {
        // Direct file reference like /sitemap.xml
        resolved = allDistFiles.has(linkPath);
      } else {
        // Directory-style: check for index.html
        resolved = validPaths.has(linkPath);
      }

      if (!resolved) {
        // Check if the path exists as a static file without extension matching
        const possibleFile = path.join(DIST, linkPath);
        if (!fs.existsSync(possibleFile) && !fs.existsSync(possibleFile + 'index.html')) {
          issues.push(`${pagePath}: broken link -> ${match[1]}`);
        }
      }

      // Check for deprecated link targets
      for (const dep of DEPRECATED_LINK_TARGETS) {
        if (linkPath === dep || match[1] === dep.replace(/\/$/, '')) {
          deprecatedFound.push(`${pagePath}: links to deprecated ${dep}`);
        }
      }
    }
  }

  const allIssues = [...issues, ...deprecatedFound];
  if (allIssues.length > 0) {
    return fail(name, `${allIssues.length} issue(s) from ${totalChecked} links checked`, allIssues);
  }
  return pass(name, `${totalChecked} links checked, 0 broken`);
}

// =====================================================================
// CHECK 8: Blog auto-links
// =====================================================================
function checkBlogAutoLinks() {
  const name = 'Blog auto-links';
  const distResources = path.join(DIST, 'resources');

  if (!fs.existsSync(distResources)) {
    return pass(name, 'no resources directory (skipped)');
  }

  const entries = fs.readdirSync(distResources, { withFileTypes: true });
  const postDirs = entries.filter((e) => e.isDirectory() && e.name !== 'tag');
  const postPaths = postDirs
    .map((d) => path.join(distResources, d.name, 'index.html'))
    .filter((p) => fs.existsSync(p));

  if (postPaths.length === 0) {
    return pass(name, 'no resource posts found (skipped)');
  }

  const AUTO_LINK_PATTERN = /href="\/(flooring|services|industries|residential)\/[^"]+\/"/g;
  let withLinks = 0;
  let totalAutoLinks = 0;

  for (const filePath of postPaths) {
    const html = fs.readFileSync(filePath, 'utf8');
    const matches = [...html.matchAll(AUTO_LINK_PATTERN)];
    if (matches.length > 0) withLinks++;
    totalAutoLinks += matches.length;
  }

  if (withLinks === 0 && postPaths.length > 0) {
    return fail(name, `${postPaths.length} posts but 0 have auto-injected links`);
  }

  return pass(name, `${totalAutoLinks} links across ${postPaths.length} posts`);
}

// =====================================================================
// CHECK 9: Image reference check
// =====================================================================
function checkImageReferences(htmlFiles) {
  const name = 'Image references';
  const issues = [];
  const checkedImages = new Set();

  for (const { rel, full } of htmlFiles) {
    const pagePath = htmlToPagePath(rel);
    const html = fs.readFileSync(full, 'utf8');

    // Match src="/images/..." and background-image: url('/images/...')
    const srcMatches = [...html.matchAll(/src="(\/images\/[^"]+)"/g)];
    const bgMatches = [...html.matchAll(/url\(['"]?(\/images\/[^'")]+)['"]?\)/g)];

    for (const match of [...srcMatches, ...bgMatches]) {
      const imgPath = match[1];
      checkedImages.add(imgPath);

      const distFile = path.join(DIST, imgPath);
      if (!fs.existsSync(distFile)) {
        issues.push(`${pagePath}: missing image ${imgPath}`);
      }
    }
  }

  if (issues.length > 0) {
    return fail(name, `${issues.length} missing image(s)`, issues);
  }
  return pass(name, `${checkedImages.size} images checked, 0 missing`);
}

// =====================================================================
// MAIN
// =====================================================================
function main() {
  console.log('');
  console.log('Pre-deploy checks against dist/');
  console.log('================================');

  const htmlFiles = getAllHtmlFiles(DIST);

  const results = [
    checkBuildOutput(htmlFiles),
    checkCanonicals(htmlFiles),
    checkSitemap(htmlFiles),
    checkRedirects(),
    checkNoindex(htmlFiles),
    checkMetaTags(htmlFiles),
    checkInternalLinks(htmlFiles),
    checkBlogAutoLinks(),
    checkImageReferences(htmlFiles),
  ];

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log('');
  if (failed === 0) {
    console.log(`${passed}/${results.length} checks passed. Ready to deploy.`);
    console.log('');
    process.exit(0);
  } else {
    console.log(`${passed}/${results.length} checks passed, ${failed} FAILED. Fix issues before deploying.`);
    console.log('');
    process.exit(1);
  }
}

main();
