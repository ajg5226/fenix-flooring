import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

const BLOG_COLLECTION = 'blog' as const;

/** All published blog posts, sorted by pubDate descending */
export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection(
    BLOG_COLLECTION,
    ({ data }) => data.draft !== true
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

/** Single post by slug (URL segment; Astro content entry slug) */
export async function getPostBySlug(
  slug: string
): Promise<CollectionEntry<'blog'> | undefined> {
  return getEntry(BLOG_COLLECTION, slug);
}

/** Unique list of all tags from published posts */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags ?? []) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

/** Published posts that have the given tag, sorted by pubDate descending */
export async function getPostsByTag(
  tag: string
): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => (p.data.tags ?? []).includes(tag));
}

/** Related posts: same tag, excluding current slug, limit N */
export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): Promise<CollectionEntry<'blog'>[]> {
  if (tags.length === 0) return [];
  const posts = await getAllPosts();
  const related: CollectionEntry<'blog'>[] = [];
  for (const post of posts) {
    if (post.slug === currentSlug) continue;
    const hasTag = (post.data.tags ?? []).some((t) => tags.includes(t));
    if (hasTag) related.push(post);
    if (related.length >= limit) break;
  }
  return related;
}
