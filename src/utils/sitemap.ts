import type { AstroIntegration } from 'astro';
import { writeFile, readFile, stat, readdir } from 'fs/promises';
import { join, basename } from 'path';
import { siteConfig } from '../config/site';

/**
 * Custom sitemap generator for Astro 4 compatibility
 * Uses pages from astro:build:done hook instead of routes
 */
type PostMeta = {
  slug: string;
  pubDate?: Date;
  updatedDate?: Date;
};

function formatIso(date?: Date) {
  return date ? date.toISOString() : new Date().toISOString();
}

function latestDate(dates: Array<Date | undefined>): Date | undefined {
  const valid = dates.filter((d): d is Date => !!d);
  if (valid.length === 0) return undefined;
  return new Date(Math.max(...valid.map((d) => d.getTime())));
}

async function readPostMeta(filePath: string): Promise<PostMeta | null> {
  try {
    const raw = await readFile(filePath, 'utf-8');
    const pubMatch = raw.match(/^pubDate:\s*["']?([^\n"']+)/m);
    const updatedMatch = raw.match(/^updatedDate:\s*["']?([^\n"']+)/m);
    const pubDate = pubMatch ? new Date(pubMatch[1]) : undefined;
    const updatedDate = updatedMatch ? new Date(updatedMatch[1]) : undefined;
    const stats = await stat(filePath);
    const fileDate = stats.mtime;
    const slug = basename(filePath).replace(/\.md$/, '');
    return {
      slug,
      pubDate: pubDate ?? fileDate,
      updatedDate: updatedDate ?? fileDate,
    };
  } catch {
    return null;
  }
}

async function loadPostMeta(): Promise<PostMeta[]> {
  try {
    const contentDir = join(process.cwd(), 'src', 'content', 'blog');
    const entries = await readdir(contentDir, { withFileTypes: true });
    const metas = await Promise.all(
      entries
        .filter((e) => e.isFile() && e.name.endsWith('.md'))
        .map((e) => readPostMeta(join(contentDir, e.name)))
    );
    return metas.filter((m): m is PostMeta => !!m);
  } catch {
    return [];
  }
}

export function sitemapIntegration(): AstroIntegration {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ pages, dir, logger }) => {
        if (!siteConfig.url) {
          logger.warn('Sitemap requires site URL. Skipping sitemap generation.');
          return;
        }

        if (!pages || pages.length === 0) {
          logger.warn('No pages found for sitemap generation.');
          return;
        }

        const siteUrl = new URL(siteConfig.url);
        const posts = await loadPostMeta();
        const latestPostDate = latestDate(
          posts.flatMap((p) => [p.updatedDate, p.pubDate])
        );

        // Build set of noindex pages by reading built HTML
        let dirPath: string;
        if (dir.pathname) {
          dirPath = decodeURIComponent(dir.pathname);
        } else {
          const dirStr = dir.toString().replace(/^file:\/\//, '');
          dirPath = decodeURIComponent(dirStr);
        }

        const noindexPages = new Set<string>();
        const redirectPages = new Set<string>();
        for (const page of pages) {
          let pathname = page.pathname || '';
          if (!pathname.startsWith('/')) pathname = '/' + pathname;
          if (!pathname.endsWith('/')) pathname = pathname + '/';
          const htmlPath = join(dirPath, pathname, 'index.html');
          try {
            const html = await readFile(htmlPath, 'utf-8');
            if (/name="robots"\s+content="noindex/i.test(html)) {
              noindexPages.add(pathname);
            }
            if (/http-equiv="refresh"/i.test(html)) {
              redirectPages.add(pathname);
            }
          } catch {
            // File may not exist as index.html (e.g. 404.html)
          }
        }

        // Generate URLs from pages
        const urls = pages
          .filter((page) => {
            const pathname = page.pathname || '';
            const normalizedPath = pathname.startsWith('/') ? pathname : '/' + pathname;
            const withTrailing = normalizedPath.endsWith('/') ? normalizedPath : normalizedPath + '/';
            // Filter out 404
            if (pathname.includes('404')) return false;
            // Filter out noindex pages
            if (noindexPages.has(withTrailing)) return false;
            // Filter out redirect stubs
            if (redirectPages.has(withTrailing)) return false;
            return true;
          })
          .map((page) => {
            let pathname = page.pathname || '';

            // Ensure pathname starts with /
            if (!pathname.startsWith('/')) {
              pathname = '/' + pathname;
            }

            // Remove index.html suffix if present
            if (pathname.endsWith('/index.html')) {
              pathname = pathname.replace('/index.html', '/');
            } else if (pathname.endsWith('.html')) {
              pathname = pathname.replace('.html', '/');
            }

            // Determine lastmod based on content when possible
            let lastmod: string | undefined;
            const resourceMatch = pathname.match(/^\/resources\/([^/]+)\/?$/);
            if (resourceMatch) {
              const slug = resourceMatch[1];
              const match = posts.find((p) => p.slug === slug);
              lastmod = formatIso(
                latestDate([match?.updatedDate, match?.pubDate])
              );
            } else if (pathname.startsWith('/resources/tag/')) {
              lastmod = formatIso(latestPostDate);
            }

            if (!lastmod) {
              lastmod = formatIso();
            }

            // Build full URL
            const fullUrl = new URL(pathname, siteUrl).href;

            return {
              loc: fullUrl,
              lastmod,
              changefreq: 'weekly' as const,
              priority: 0.7,
            };
          });

        // Generate XML sitemap
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

        // Write sitemap to dist directory (dirPath resolved above)
        const sitemapPath = join(dirPath, 'sitemap.xml');
        await writeFile(sitemapPath, sitemap, 'utf-8');

        logger.info(`Generated sitemap with ${urls.length} URLs`);
      },
    },
  };
}
