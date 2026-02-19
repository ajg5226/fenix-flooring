#!/usr/bin/env node
/**
 * Content QA scanner for Fenix Flooring resource/blog markdown files.
 * Checks for:
 *  - Repeated adjacent phrases ("tile.tile", duplicated fragments)
 *  - Missing space after sentence-ending punctuation (word.Word, word.word)
 *  - Malformed markdown tables (column-like text without pipes / missing header separator)
 *  - Accidental word concatenation ("both.carpet", "tile.carpet")
 *  - Unclosed code fences
 *  - Broken list items (lines starting with "- " that have concatenated words)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const BLOG_DIR = join(import.meta.dirname, '..', 'src', 'content', 'blog');

function getMarkdownFiles(dir) {
  return readdirSync(dir)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => join(dir, f));
}

function stripFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (match) return content.slice(match[0].length);
  return content;
}

function stripCodeBlocks(content) {
  return content.replace(/```[\s\S]*?```/g, '[CODE_BLOCK]');
}

function findIssues(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const body = stripFrontmatter(raw);
  const bodyNoCode = stripCodeBlocks(body);
  const lines = bodyNoCode.split('\n');
  const issues = [];

  // 1. Missing space after sentence-ending period: lowercase.Uppercase or lowercase.lowercase
  //    but exclude known patterns like URLs, file extensions, abbreviations, version numbers
  const missingSpaceRegex = /[a-z]\.[A-Z]/g;
  const missingSpaceLowerRegex = /[a-z]\.[a-z]/g;
  const falsePositivePrefixes = [
    'e.g', 'i.e', 'vs.', 'etc.', 'Mr.', 'Dr.', 'St.', 'Jr.', 'Sr.',
    'Inc.', 'Ltd.', 'Corp.', 'No.', 'approx.', 'dept.', 'govt.',
  ];
  const urlLike = /https?:\/\/|www\.|\.com|\.org|\.net|\.io|\.js|\.ts|\.md|\.mdx|\.json|\.css|\.html|\.webp|\.jpg|\.jpeg|\.png|\.avif|\.gif|\.svg|\.pdf|\.mjs|\.cjs/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('[CODE_BLOCK]')) continue;
    if (urlLike.test(line) && line.match(/https?:\/\//)) continue;

    let m;
    // Check lowercase.Uppercase (strong signal for missing space)
    while ((m = missingSpaceRegex.exec(line)) !== null) {
      const context = line.slice(Math.max(0, m.index - 15), m.index + 20);
      const prefix = line.slice(Math.max(0, m.index - 5), m.index + 2);
      if (falsePositivePrefixes.some(fp => prefix.includes(fp.slice(0, -1)))) continue;
      if (/\d\.[A-Z]/.test(line.slice(m.index - 1, m.index + 3))) continue; // numbered list like "1.A"
      if (line.slice(Math.max(0, m.index - 10), m.index + 10).match(/https?:|\.com|\.org|\.net|\.webp|\.jpg|\.png|\.avif/i)) continue;

      issues.push({
        line: i + 1,
        type: 'missing-space-after-period',
        detail: `"…${context}…"`,
      });
    }

    // Check lowercase.lowercase (weaker signal, more false positives)
    while ((m = missingSpaceLowerRegex.exec(line)) !== null) {
      const context = line.slice(Math.max(0, m.index - 10), m.index + 15);
      const prefix = line.slice(Math.max(0, m.index - 5), m.index + 5);
      if (falsePositivePrefixes.some(fp => prefix.includes(fp.slice(0, -1)))) continue;
      if (/\d\.[a-z]/.test(line.slice(m.index - 1, m.index + 3))) continue;
      if (line.slice(Math.max(0, m.index - 10), m.index + 10).match(/https?:|\.com|\.org|\.net|\.webp|\.jpg|\.png|\.avif|\.jpeg|\.gif|\.svg|\.pdf|\.mjs|\.cjs|\.js|\.ts|\.md|\.css/i)) continue;
      // Skip markdown image/link patterns
      if (/\]\(|!\[/.test(line.slice(Math.max(0, m.index - 5), m.index + 5))) continue;
      // Skip file paths
      if (/\/[a-z]/.test(line.slice(m.index - 1, m.index + 3))) continue;

      issues.push({
        line: i + 1,
        type: 'possible-missing-space',
        detail: `"…${context}…"`,
      });
    }
  }

  // 2. Repeated adjacent phrases (3+ words repeated back-to-back)
  const words = bodyNoCode.replace(/\n/g, ' ').split(/\s+/).filter(Boolean);
  for (let windowSize = 3; windowSize <= 8; windowSize++) {
    for (let j = 0; j <= words.length - windowSize * 2; j++) {
      const chunk1 = words.slice(j, j + windowSize).join(' ').toLowerCase();
      const chunk2 = words.slice(j + windowSize, j + windowSize * 2).join(' ').toLowerCase();
      if (chunk1 === chunk2 && chunk1.length > 10) {
        issues.push({
          line: 0,
          type: 'repeated-phrase',
          detail: `Duplicated "${chunk1}"`,
        });
        break;
      }
    }
  }

  // 3. Malformed markdown tables
  //    A valid table: header row → separator row (|---|---|) → data rows
  //    Flag a group of |..| lines that never have a separator row
  const tableRowRegex = /^\|.*\|/;
  const tableSepRegex = /^\|[\s-:|]+\|$/;
  let inTable = false;
  let tableStart = -1;
  let hasSeparator = false;

  for (let i = 0; i <= lines.length; i++) {
    const line = (lines[i] || '').trim();
    const isCodeBlock = line.startsWith('[CODE_BLOCK]');
    const isTableRow = !isCodeBlock && tableRowRegex.test(line);

    if (isTableRow) {
      if (!inTable) {
        inTable = true;
        tableStart = i;
        hasSeparator = false;
      }
      if (tableSepRegex.test(line) && /---/.test(line)) {
        hasSeparator = true;
      }
    } else if (inTable) {
      if (!hasSeparator && tableStart >= 0) {
        issues.push({
          line: tableStart + 1,
          type: 'table-missing-separator',
          detail: `Table block starting at line ${tableStart + 1} has no separator row (|---|---|)`,
        });
      }
      inTable = false;
      tableStart = -1;
    }

    // Detect lines that look like table data but lack pipes
    // e.g. "LVT (SPC, 20–28 mil)Porcelain tile" - concatenated table cells
    const concatPattern = /\)[A-Z][a-z]/;
    if (concatPattern.test(line) && !line.startsWith('#') && !line.startsWith('```')) {
      const match = line.match(concatPattern);
      if (match) {
        const ctx = line.slice(Math.max(0, match.index - 20), match.index + 25);
        issues.push({
          line: i + 1,
          type: 'possible-concatenation',
          detail: `"…${ctx}…"`,
        });
      }
    }
  }

  // 4. Unclosed code fences
  const fenceMatches = body.match(/```/g) || [];
  if (fenceMatches.length % 2 !== 0) {
    issues.push({
      line: 0,
      type: 'unclosed-code-fence',
      detail: `Found ${fenceMatches.length} backtick fences (odd number = likely unclosed)`,
    });
  }

  return issues;
}

// --- Main ---
const files = getMarkdownFiles(BLOG_DIR);
let totalIssues = 0;
let hasError = false;

console.log(`\n🔍 Content QA: scanning ${files.length} files in src/content/blog/\n`);

for (const filePath of files) {
  const name = basename(filePath);
  const issues = findIssues(filePath);

  if (issues.length > 0) {
    console.log(`\n❌ ${name} — ${issues.length} issue(s):`);
    for (const issue of issues) {
      const loc = issue.line > 0 ? `L${issue.line}` : 'file';
      console.log(`   [${issue.type}] ${loc}: ${issue.detail}`);
    }
    totalIssues += issues.length;
    hasError = true;
  } else {
    console.log(`✅ ${name}`);
  }
}

console.log(`\n${hasError ? '⚠️' : '✅'} ${totalIssues} issue(s) found across ${files.length} files.\n`);

if (hasError) {
  process.exit(1);
}
