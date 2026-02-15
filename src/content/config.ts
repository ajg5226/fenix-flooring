import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Fenix Flooring Team'),
    /** When false, skip auto-injecting internal links in this post. Default true. */
    autoInternalLinks: z.boolean().default(true),
  }),
});

export const collections = {
  blog,
};
