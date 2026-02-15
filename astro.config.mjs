import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { sitemapIntegration } from './src/utils/sitemap.ts';
import remarkBlogEditorial from './src/utils/remarkBlogEditorial.js';
import remarkAutoInternalLinks from './src/utils/remarkAutoInternalLinks.js';
import { getInternalLinkMap } from './src/config/internalLinks.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.fenixflooring.com',
  integrations: [
    tailwind(),
    sitemapIntegration(),
  ],
  output: 'static',
  markdown: {
    remarkPlugins: [
      remarkBlogEditorial,
      [remarkAutoInternalLinks, { linkMap: getInternalLinkMap() }],
    ],
  },
});
