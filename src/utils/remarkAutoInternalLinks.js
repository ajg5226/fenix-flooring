/**
 * Remark plugin: auto-inject internal links for SEO.
 * Replaces the first occurrence of each configured phrase (per URL per document)
 * with a link. Skips text inside existing links and inside code. Derives
 * current slug from vfile to avoid self-links to /resources/{slug}/.
 *
 * Options: { linkMap: Array<{ phrases: string[], url: string }> }
 * currentSlug is derived from file.path / file.history when available.
 */

/**
 * Derive blog post slug from vfile path (e.g. ".../blog/my-post.md" -> "my-post").
 */
function getCurrentSlugFromFile(file) {
  if (!file) return null;
  const path = file.path || (file.history && file.history[0]);
  if (!path || typeof path !== 'string') return null;
  const base = path.split(/[/\\]/).pop() || '';
  const withoutExt = base.replace(/\.(md|mdx)$/i, '');
  return withoutExt || null;
}

/**
 * Flatten link map to { phrase, url }[] sorted by phrase length descending.
 */
function flattenLinkMap(linkMap) {
  if (!Array.isArray(linkMap)) return [];
  const flat = [];
  for (const entry of linkMap) {
    const phrases = entry.phrases || [];
    const url = entry.url || '';
    if (!url) continue;
    for (const phrase of phrases) {
      if (phrase && typeof phrase === 'string') flat.push({ phrase, url });
    }
  }
  flat.sort((a, b) => b.phrase.length - a.phrase.length);
  return flat;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find a phrase match bounded by non-alphanumeric chars to avoid splitting words.
 * Returns { start, end, matched } or null when no safe match is found.
 */
function findBoundedMatch(value, phrase) {
  if (!value || !phrase) return null;
  const pattern = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegex(phrase)})(?=[^A-Za-z0-9]|$)`, 'i');
  const match = pattern.exec(value);
  if (!match) return null;
  const start = match.index + match[1].length;
  const matched = match[2];
  return {
    start,
    end: start + matched.length,
    matched,
  };
}

/**
 * Walk tree and replace first matching phrase in text nodes (not inside link/code).
 * Mutates the tree in place. Tracks linkedUrls per document.
 */
function walkAndInject(node, index, parent, state) {
  const { flatList, linkedUrls, currentSlug, inLink } = state;

  if (node.type === 'link') {
    // Do not descend into link nodes (don't link text that's already a link)
    return;
  }

  if (node.type === 'code' || node.type === 'inlineCode') {
    // Don't link inside code
    return;
  }

  if (node.type === 'text' && !inLink && parent) {
    let value = node.value || '';
    for (const { phrase, url } of flatList) {
      if (currentSlug && url === `/resources/${currentSlug}/`) continue;

      const match = findBoundedMatch(value, phrase);
      if (!match) continue;

      if (linkedUrls.has(url)) {
        // Phrase matches but URL already linked. Split around it so shorter
        // phrases can't partially match inside this compound term.
        const before = value.slice(0, match.start);
        const after = value.slice(match.end);

        const newNodes = [];
        if (before) newNodes.push({ type: 'text', value: before });
        newNodes.push({ type: 'text', value: match.matched });
        if (after) newNodes.push({ type: 'text', value: after });

        const siblings = parent.children;
        siblings.splice(index, 1, ...newNodes);

        const protectedIdx = before ? 1 : 0;
        for (let i = 0; i < newNodes.length; i++) {
          if (i === protectedIdx) continue;
          walkAndInject(newNodes[i], index + i, parent, state);
        }
        return;
      }

      const before = value.slice(0, match.start);
      const matched = value.slice(match.start, match.end);
      const after = value.slice(match.end);

      const newNodes = [];
      if (before) newNodes.push({ type: 'text', value: before });
      newNodes.push({
        type: 'link',
        url,
        children: [{ type: 'text', value: matched }],
      });
      if (after) newNodes.push({ type: 'text', value: after });

      const siblings = parent.children;
      siblings.splice(index, 1, ...newNodes);
      linkedUrls.add(url);

      // Walk the new nodes (e.g. "after" might contain another phrase for a different URL)
      for (let i = 0; i < newNodes.length; i++) {
        walkAndInject(newNodes[i], index + i, parent, state);
      }
      return;
    }
    return;
  }

  if (node.children && Array.isArray(node.children)) {
    const isLink = node.type === 'link';
    for (let i = 0; i < node.children.length; i++) {
      walkAndInject(node.children[i], i, node, {
        ...state,
        inLink: inLink || isLink,
      });
    }
  }
}

export default function remarkAutoInternalLinks(options = {}) {
  const linkMap = options.linkMap || [];
  const flatList = flattenLinkMap(linkMap);

  return function (tree, file) {
    if (!tree || !tree.children || flatList.length === 0) return;

    const frontmatter = file?.data?.astro?.frontmatter;
    if (frontmatter && frontmatter.autoInternalLinks === false) return;

    const currentSlug = getCurrentSlugFromFile(file);
    const linkedUrls = new Set();

    const state = {
      flatList,
      linkedUrls,
      currentSlug,
      inLink: false,
    };

    for (let i = 0; i < tree.children.length; i++) {
      walkAndInject(tree.children[i], i, tree, state);
    }
  };
}
