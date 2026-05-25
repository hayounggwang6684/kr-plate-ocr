import { extractPlateCandidates, selectBestPlateCandidate } from '../src/index.js';

const rawOcrText = 'OCR result: I23F4567';
const knownPlates = ['123가4567', '12가3456'];

console.log(extractPlateCandidates(rawOcrText));
console.log(selectBestPlateCandidate(rawOcrText, { knownPlates }));
