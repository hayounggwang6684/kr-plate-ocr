import { extractPlateCandidates } from './extract.js';
import { scoreOcrCandidate } from './score.js';

export function selectBestPlateCandidate(texts = [], options = {}) {
  const knownPlates = options.knownPlates ?? [];
  const sourceTexts = Array.isArray(texts) ? texts : [texts];
  const results = [];

  sourceTexts.forEach((text) => {
    extractPlateCandidates(text).forEach((candidate) => {
      results.push({
        text,
        candidate,
        score: scoreOcrCandidate(candidate, knownPlates),
      });
    });
  });

  return results.sort((a, b) => b.score - a.score)[0] ?? null;
}
