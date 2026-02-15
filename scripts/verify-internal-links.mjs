#!/usr/bin/env node
/**
 * Verifies that built resource (blog) pages contain auto-injected internal links.
 * Run after `npm run build`. Exits 0 if OK, 1 if verification fails.
 *
 * Usage: node scripts/verify-internal-links.mjs
 * (from project root, with dist/ present)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distResources = path.join(projectRoot, 'dist', 'resources');

// Auto-injected links point to /flooring/slug/, /services/slug/, /industries/slug/
// (nav/footer use bare /flooring/ etc.; content links have a path segment)
const AUTO_LINK_PATTERN = /href="\/(flooring|services|industries)\/[^"]+\/"/g;

function getResourcePostPaths() {
  if (!fs.existsSync(distResources)) return [];
  const entries = fs.readdirSync(distResources, { withFileTypes: true });
  const postDirs = entries.filter((e) => e.isDirectory() && e.name !== 'tag');
  return postDirs.map((d) => path.join(distResources, d.name, 'index.html'));
}

function countAutoLinksInHtml(html) {
  const matches = html.matchAll(AUTO_LINK_PATTERN);
  return [...matches].length;
}

function main() {
  const postPaths = getResourcePostPaths().filter((p) => fs.existsSync(p));

  if (postPaths.length === 0) {
    console.log('verify-internal-links: no resource post pages in dist/resources/ (run build first).');
    process.exit(0);
  }

  let withLinks = 0;
  const totalLinks = { flooring: 0, services: 0, industries: 0 };

  for (const filePath of postPaths) {
    const html = fs.readFileSync(filePath, 'utf8');
    const count = countAutoLinksInHtml(html);
    if (count > 0) withLinks++;
    // Count by type for report
    for (const m of html.matchAll(AUTO_LINK_PATTERN)) {
      if (m[1] === 'flooring') totalLinks.flooring++;
      else if (m[1] === 'services') totalLinks.services++;
      else totalLinks.industries++;
    }
  }

  const totalAutoLinks =
    totalLinks.flooring + totalLinks.services + totalLinks.industries;

  console.log('Internal links verification (auto-injected in blog content):');
  console.log(
    `  Resource posts: ${postPaths.length} | With auto-links: ${withLinks}`
  );
  console.log(
    `  Total auto-links in content: ${totalAutoLinks} (flooring: ${totalLinks.flooring}, services: ${totalLinks.services}, industries: ${totalLinks.industries})`
  );

  if (withLinks === 0 && postPaths.length > 0) {
    console.error(
      '\nverify-internal-links: no auto-injected links found in any resource post. Check remarkAutoInternalLinks and internal link map.'
    );
    process.exit(1);
  }

  console.log('  OK.\n');
  process.exit(0);
}

main();
