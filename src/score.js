import { getLastFourDigits, isMissingLeadingPlateDigit } from './validate.js';
import { normalizePlate } from './normalize.js';

export function getDigitDistance(first = '', second = '') {
  if (!first || !second || first.length !== second.length) return Number.POSITIVE_INFINITY;

  return first.split('').reduce((distance, digit, index) => (
    digit === second[index] ? distance : distance + 1
  ), 0);
}

export function scorePlateCandidate(candidate = '') {
  if (/^\d{3}[가-힣]\d{4}$/.test(normalizePlate(candidate))) return 6;
  if (/^\d{2}[가-힣]\d{4}$/.test(normalizePlate(candidate))) return 5;
  if (/^\d{4}$/.test(normalizePlate(candidate))) return 2;
  return candidate ? 1 : 0;
}

export function scoreKnownPlateCandidate(candidate = '', knownPlates = []) {
  const normalizedCandidate = normalizePlate(candidate);
  const lastFourDigits = getLastFourDigits(normalizedCandidate);

  if (!normalizedCandidate) return 0;

  return knownPlates.reduce((score, knownPlate) => {
    const savedPlate = normalizePlate(
      typeof knownPlate === 'string' ? knownPlate : knownPlate?.plate_number,
    );

    if (savedPlate === normalizedCandidate) return Math.max(score, 8);
    if (isMissingLeadingPlateDigit(savedPlate, normalizedCandidate)) return Math.max(score, 7);
    if (lastFourDigits && savedPlate === lastFourDigits) return Math.max(score, 6);
    if (lastFourDigits && savedPlate.endsWith(lastFourDigits)) return Math.max(score, 4);
    if (lastFourDigits && getDigitDistance(getLastFourDigits(savedPlate), lastFourDigits) === 1) {
      return Math.max(score, 3);
    }

    return score;
  }, 0);
}

export function scoreOcrCandidate(candidate = '', knownPlates = []) {
  if (!candidate) return 0;
  return scorePlateCandidate(candidate) + scoreKnownPlateCandidate(candidate, knownPlates);
}
