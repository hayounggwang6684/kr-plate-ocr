import assert from 'node:assert/strict';
import test from 'node:test';
import {
  extractPlateCandidate,
  extractPlateCandidates,
  getTesseractPlateParameters,
  isFullKoreanPlate,
  isMissingLeadingPlateDigit,
  normalizePlate,
  scoreKnownPlateCandidate,
  selectBestPlateCandidate,
} from '../src/index.js';

test('normalizes spacing and punctuation', () => {
  assert.equal(normalizePlate(' 12 가-3456 '), '12가3456');
});

test('extracts modern Korean plate candidates', () => {
  assert.deepEqual(extractPlateCandidates('OCR: 123가4567'), ['123가4567', '23가4567', '4567']);
  assert.equal(extractPlateCandidate('noise 12가3456 end'), '12가3456');
});

test('corrects common OCR confusions in digit slots', () => {
  assert.ok(extractPlateCandidates('I23가4S6B').includes('123가4568'));
});

test('corrects common OCR confusions in the middle hangul slot', () => {
  assert.ok(extractPlateCandidates('123F4567').includes('123가4567'));
});

test('validates full and partial plates', () => {
  assert.equal(isFullKoreanPlate('12가3456'), true);
  assert.equal(isFullKoreanPlate('123가4567'), true);
  assert.equal(isFullKoreanPlate('3456'), false);
});

test('scores known plate matches and missing leading digit cases', () => {
  assert.equal(isMissingLeadingPlateDigit('123가4567', '23가4567'), true);
  assert.equal(scoreKnownPlateCandidate('23가4567', ['123가4567']), 7);
});

test('selects the best candidate from multiple OCR texts', () => {
  const best = selectBestPlateCandidate(['bad text', '12가3456'], {
    knownPlates: ['12가3456'],
  });

  assert.equal(best.candidate, '12가3456');
  assert.equal(best.score, 13);
});

test('returns AI-friendly Tesseract parameters', () => {
  assert.equal(getTesseractPlateParameters('8').tessedit_pageseg_mode, '8');
});
