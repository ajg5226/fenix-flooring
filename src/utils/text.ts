/**
 * Truncate text at a word boundary so the ellipsis never cuts a word in half.
 * @param text - String to truncate
 * @param maxLength - Maximum character count (ellipsis will be placed at last space before this)
 * @returns Truncated string with "…" if shortened, otherwise original string
 */
export function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength + 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > 0 ? lastSpace : maxLength;
  return text.slice(0, cut).trim() + '…';
}
