/**
 * Central phrase → URL map for auto-injecting internal links in blog content (SEO).
 * Built from flooring types, services, and industries. Sorted by phrase length
 * (longest first) so the remark plugin matches "commercial flooring installation"
 * before "flooring".
 */

import { flooringTypes } from './flooring';
import { residentialFlooringTypes } from './residential';
import { services } from './services';
import { navigation } from './site';

export type InternalLinkEntry = { phrases: string[]; url: string };

function byPhraseLengthDesc(a: InternalLinkEntry, b: InternalLinkEntry): number {
  const maxLenA = Math.max(...a.phrases.map((p) => p.length));
  const maxLenB = Math.max(...b.phrases.map((p) => p.length));
  return maxLenB - maxLenA;
}

/**
 * Builds the internal link map from config. Each entry has one or more phrases
 * that, when found in blog body text, will be turned into a link to the given URL.
 * Order: longest phrases first for correct matching.
 */
export function getInternalLinkMap(): InternalLinkEntry[] {
  const entries: InternalLinkEntry[] = [];

  // Flooring types: title + common variants (e.g. LVT, LVP, luxury vinyl for LVT/LVP)
  for (const f of flooringTypes) {
    const url = `/flooring/${f.slug}/`;
    const phrases: string[] = [f.title];
    if (f.slug === 'lvt-lvp') {
      phrases.push('LVT', 'LVP', 'luxury vinyl tile', 'luxury vinyl plank');
    }
    if (f.title === 'Tile') {
      phrases.push('porcelain tile', 'ceramic tile');
    }
    entries.push({ phrases, url });
  }

  // Services: full title and shortTitle
  for (const s of services) {
    const url = `/services/${s.slug}/`;
    const phrases: string[] = [s.title];
    if (s.shortTitle && s.shortTitle !== s.title) {
      phrases.push(s.shortTitle);
    }
    entries.push({ phrases, url });
  }

  // Residential flooring types
  entries.push({ phrases: ['residential flooring', 'residential flooring installation'], url: '/residential/' });
  for (const rf of residentialFlooringTypes) {
    const url = `/residential/${rf.slug}/`;
    const phrases: string[] = [`residential ${rf.title.toLowerCase()}`];
    if (rf.slug === 'lvt-lvp') {
      phrases.push('residential LVT', 'residential LVP', 'residential luxury vinyl');
    }
    if (rf.slug === 'engineered-hardwood') {
      phrases.push('residential hardwood', 'residential engineered hardwood', 'residential solid hardwood');
    }
    if (rf.slug === 'tile') {
      phrases.push('residential tile', 'residential porcelain tile', 'residential ceramic tile');
    }
    entries.push({ phrases, url });
  }

  // Industries (from navigation)
  for (const ind of navigation.industries) {
    entries.push({ phrases: [ind.name], url: ind.href });
  }

  return entries.sort(byPhraseLengthDesc);
}
