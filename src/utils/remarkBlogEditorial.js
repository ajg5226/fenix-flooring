/**
 * Remark plugin: strip author-only sections and rename Source notes for blog content.
 * - Removes "Internal links to include" paragraph and its list until next ##
 * - Renames "## Source notes" to "## References"
 * - Removes "## FAQPage JSON-LD Schema" and the following ```json block
 */

function getNodeText(node) {
  if (!node || !node.children) return '';
  return node.children
    .filter((c) => c.type === 'text')
    .map((c) => c.value || '')
    .join('')
    .trim();
}

function remarkBlogEditorial() {
  return function (tree) {
    if (!tree || !Array.isArray(tree.children)) return;
    const out = [];
    let i = 0;
    while (i < tree.children.length) {
      const node = tree.children[i];
      const text = getNodeText(node);

      // Strip "Internal links to include" and following list(s) until next heading
      if (node.type === 'paragraph' && text === 'Internal links to include') {
        i += 1;
        while (i < tree.children.length && tree.children[i].type === 'list') {
          i += 1;
        }
        continue;
      }

      // Rename "Source notes" heading to "References"
      if (node.type === 'heading' && text === 'Source notes') {
        const clone = { ...node, children: [{ type: 'text', value: 'References' }] };
        out.push(clone);
        i += 1;
        continue;
      }

      // Remove "FAQPage JSON-LD Schema" heading and the next code block
      if (
        node.type === 'heading' &&
        /^FAQPage JSON[-‑]LD Schema$/i.test(text)
      ) {
        i += 1;
        if (i < tree.children.length && tree.children[i].type === 'code') {
          i += 1;
        }
        continue;
      }

      out.push(node);
      i += 1;
    }
    tree.children = out;
  };
}

export default remarkBlogEditorial;
