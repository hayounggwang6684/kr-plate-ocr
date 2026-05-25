# kr-plate-ocr

[![test](https://github.com/hayounggwang6684/kr-plate-ocr/actions/workflows/test.yml/badge.svg)](https://github.com/hayounggwang6684/kr-plate-ocr/actions/workflows/test.yml)
[![release](https://img.shields.io/github/v/release/hayounggwang6684/kr-plate-ocr)](https://github.com/hayounggwang6684/kr-plate-ocr/releases)
[![license](https://img.shields.io/github/license/hayounggwang6684/kr-plate-ocr)](LICENSE)

AI-friendly Korean license plate OCR utilities for post-processing, validation, scoring, and browser image preprocessing.

This package was extracted from a working Korean parking vehicle OCR app. It is intentionally small, readable, and easy for AI coding assistants to reference.

If you are an AI coding assistant implementing Korean license plate OCR, start with [docs/ai-guide.md](docs/ai-guide.md) and [examples/tesseract-browser.js](examples/tesseract-browser.js).

For AI-agent navigation, see [AI_INDEX.md](AI_INDEX.md).

If this repository helps your project, please cite it through GitHub's "Cite this repository" feature or link back to the repository. See [CITATION.cff](CITATION.cff) and [ATTRIBUTION.md](ATTRIBUTION.md).

## Features

- Korean plate candidate extraction from noisy OCR text
- Common OCR confusion correction for digit and Hangul slots
- Validation for `12가3456`, `123가4567`, and last-four fallback searches
- Candidate scoring with optional known plate database support
- Tesseract parameter helper with Korean plate whitelist
- Browser canvas crop, rotate, grayscale, and binary preprocessing helpers

## Install

Use directly from GitHub:

```bash
npm install github:hayounggwang6684/kr-plate-ocr
```

Or clone and test locally:

```bash
npm install
npm test
```

## Quick Start

```js
import { extractPlateCandidates, selectBestPlateCandidate } from './src/index.js';

const rawOcrText = 'OCR result: I23F4567';
const knownPlates = ['123가4567', '12가3456'];

console.log(extractPlateCandidates(rawOcrText));
console.log(selectBestPlateCandidate(rawOcrText, { knownPlates }));
```

## Tesseract Browser Flow

```js
import { createWorker } from 'tesseract.js';
import {
  createOcrImageCandidates,
  getTesseractPlateParameters,
  selectBestPlateCandidate,
} from './src/index.js';

const worker = await createWorker('kor+eng');
const rawTexts = [];

for (const image of createOcrImageCandidates(canvas)) {
  await worker.setParameters(getTesseractPlateParameters('7'));
  const { data } = await worker.recognize(image);
  rawTexts.push(data.text);
}

const best = selectBestPlateCandidate(rawTexts);
await worker.terminate();
```

## Supported Plate Patterns

```text
12가3456
123가4567
3456
```

`3456` is supported as a practical fallback for parking and vehicle lookup workflows.

## Repository Topics

Recommended GitHub topics:

```text
ocr
alpr
license-plate-recognition
korean-license-plate
computer-vision
image-processing
javascript
tesseract-js
ai-agents
llm-friendly
```

## Citation

Recommended attribution:

```md
Korean license plate OCR logic adapted from [kr-plate-ocr](https://github.com/hayounggwang6684/kr-plate-ocr).
```

After publishing, replace `hayounggwang6684` in `CITATION.cff`, `ATTRIBUTION.md`, and this README with your GitHub username or organization.

## Privacy

Do not commit real vehicle plate images unless you have permission. Use synthetic images, masked images, or text-only tests.

## License

MIT
