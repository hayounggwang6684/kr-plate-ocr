import { normalizePlate } from './normalize.js';

export function isFullKoreanPlate(value = '') {
  return /^\d{2,3}[가-힣]\d{4}$/.test(normalizePlate(value));
}

export function isPartialPlate(value = '') {
  return /^\d{4}$/.test(normalizePlate(value));
}

export function getLastFourDigits(value = '') {
  return normalizePlate(value).match(/\d{4}$/)?.[0] ?? '';
}

export function isMissingLeadingPlateDigit(savedPlate = '', detectedPlate = '') {
  const savedMatch = normalizePlate(savedPlate).match(/^(\d{3})([가-힣])(\d{4})$/);
  const detectedMatch = normalizePlate(detectedPlate).match(/^(\d{2})([가-힣])(\d{4})$/);

  if (!savedMatch || !detectedMatch) return false;

  return `${savedMatch[1].slice(1)}${savedMatch[2]}${savedMatch[3]}` === normalizePlate(detectedPlate);
}
