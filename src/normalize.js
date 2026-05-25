import { DIGIT_LIKE_CHARS, HANGUL_LIKE_CHARS } from './constants.js';

export function normalizePlate(value = '') {
  return String(value).replace(/[^0-9A-Za-z가-힣]/g, '').toUpperCase();
}

export function correctDigitLikeText(value = '') {
  return normalizePlate(value).replace(/[OQDILZSB]/g, (char) => DIGIT_LIKE_CHARS[char] ?? char);
}

export function normalizePlateSlot(value = '') {
  return normalizePlate(value)
    .split('')
    .map((char) => DIGIT_LIKE_CHARS[char] ?? char)
    .join('');
}

export function normalizePlateMiddleSlot(value = '') {
  return normalizePlate(value)
    .split('')
    .map((char) => HANGUL_LIKE_CHARS[char] ?? char)
    .join('');
}

export function getPlateVariants(text = '') {
  const compact = normalizePlate(text);
  return [...new Set([compact, correctDigitLikeText(compact), normalizePlateMiddleSlot(compact)])];
}
