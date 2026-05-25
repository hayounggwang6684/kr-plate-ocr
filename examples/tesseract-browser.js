import { createWorker } from 'tesseract.js';
import {
  createOcrImageCandidates,
  DEFAULT_TESSERACT_LANG,
  DEFAULT_TESSERACT_PAGE_SEG_MODES,
  getTesseractPlateParameters,
  selectBestPlateCandidate,
} from '../src/index.js';

export async function recognizeKoreanPlateFromCanvas(sourceCanvas, options = {}) {
  const imageCandidates = createOcrImageCandidates(sourceCanvas);
  const worker = await createWorker(DEFAULT_TESSERACT_LANG);
  const rawTexts = [];

  try {
    for (const pageSegMode of DEFAULT_TESSERACT_PAGE_SEG_MODES) {
      await worker.setParameters(getTesseractPlateParameters(pageSegMode));

      for (const imageCandidate of imageCandidates) {
        const {
          data: { text },
        } = await worker.recognize(imageCandidate);
        rawTexts.push(text);
      }
    }

    return {
      best: selectBestPlateCandidate(rawTexts, options),
      rawTexts,
    };
  } finally {
    await worker.terminate();
  }
}
