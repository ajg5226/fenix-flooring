/**
 * Preprocesses raw blog markdown: strips author-only sections, renames Source notes,
 * and extracts FAQPage JSON-LD for injection as structured data.
 */

export function processBlogBody(body: string): { markdown: string; faqSchema: object | null } {
  let markdown = body;
  let faqSchema: object | null = null;

  // 1. Extract and remove FAQPage JSON-LD section (support both ASCII and Unicode hyphen)
  // Match heading then optional blank lines then ```json block; capture JSON (with or without closing ```)
  const faqHeadingRegex = /^## FAQPage JSON.\s*LD Schema\s*[\r\n]+/m;
  const faqHeadingMatch = markdown.match(faqHeadingRegex);
  if (faqHeadingMatch) {
    const headingEnd = markdown.indexOf(faqHeadingMatch[0]) + faqHeadingMatch[0].length;
    const afterHeading = markdown.slice(headingEnd);
    const codeFence = afterHeading.match(/^```(?:json)?\s*[\r\n]+/);
    if (codeFence) {
      const jsonStart = headingEnd + codeFence[0].length;
      const afterJson = markdown.slice(jsonStart);
      const closeIdx = afterJson.indexOf('\n```');
      const jsonEnd = closeIdx >= 0 ? jsonStart + closeIdx : markdown.length;
      const jsonStr = markdown.slice(jsonStart, jsonEnd).trim();
      try {
        const parsed = JSON.parse(jsonStr) as { '@type'?: string; mainEntity?: unknown };
        if (parsed['@type'] === 'FAQPage' && Array.isArray(parsed.mainEntity)) {
          faqSchema = parsed as object;
        }
      } catch {
        // Invalid JSON: don't inject
      }
      const sectionEnd = closeIdx >= 0 ? jsonStart + closeIdx + 4 : markdown.length; // 4 = \n```
      const toRemove = markdown.slice(markdown.indexOf(faqHeadingMatch[0]), sectionEnd);
      markdown = markdown.replace(toRemove, '');
      markdown = markdown.replace(/\n{3,}/g, '\n\n').trimEnd();
    }
  }

  // 2. Strip "Internal links to include" and its list (until next ## or EOF)
  const internalLinksRegex = /^Internal links to include\s*\n[\s\S]*?(?=\n## |\Z)/m;
  markdown = markdown.replace(internalLinksRegex, '');
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trimEnd();

  // 3. Rename Source notes to References for display
  markdown = markdown.replace(/^## Source notes\s*$/m, '## References');

  return { markdown, faqSchema };
}
