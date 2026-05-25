import { PLATE_HANGUL_CHARS } from './constants.js';
import {
  getPlateVariants,
  normalizePlate,
  normalizePlateMiddleSlot,
  normalizePlateSlot,
} from './normalize.js';
import { scorePlateCandidate } from './score.js';

export function extractPlateCandidates(text = '') {
  const candidates = new Set();

  getPlateVariants(text).forEach((compact) => {
    for (let index = 0; index <= compact.length - 7; index += 1) {
      for (const prefixLength of [3, 2]) {
        const plateLength = prefixLength + 1 + 4;
        const fragment = compact.slice(index, index + plateLength);
        if (fragment.length !== plateLength) continue;

        const prefix = normalizePlateSlot(fragment.slice(0, prefixLength));
        const middle = normalizePlateMiddleSlot(fragment[prefixLength]);
        const suffix = normalizePlateSlot(fragment.slice(prefixLength + 1));

        if (/^\d+$/.test(prefix) && PLATE_HANGUL_CHARS.includes(middle) && /^\d{4}$/.test(suffix)) {
          candidates.add(`${prefix}${middle}${suffix}`);
        }
      }
    }

    normalizePlate(compact).match(/\d{2,3}[가-힣]\d{4}/g)?.forEach((candidate) => candidates.add(candidate));
    normalizePlate(compact).match(/\d{4}/g)?.forEach((candidate) => candidates.add(candidate));
  });

  return [...candidates];
}

export function extractPlateCandidate(text = '') {
  return extractPlateCandidates(text).sort((a, b) => scorePlateCandidate(b) - scorePlateCandidate(a))[0] ?? '';
}
