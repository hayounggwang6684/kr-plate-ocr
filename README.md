# kr-plate-ocr

[![test](https://github.com/hayounggwang6684/kr-plate-ocr/actions/workflows/test.yml/badge.svg)](https://github.com/hayounggwang6684/kr-plate-ocr/actions/workflows/test.yml)
[![release](https://img.shields.io/github/v/release/hayounggwang6684/kr-plate-ocr)](https://github.com/hayounggwang6684/kr-plate-ocr/releases)
[![license](https://img.shields.io/github/license/hayounggwang6684/kr-plate-ocr)](LICENSE)

AI-friendly Korean license plate OCR utilities for post-processing, validation, scoring, and browser image preprocessing.

한국형 자동차 번호판 OCR을 만들 때 바로 참고할 수 있는 전처리, 후보 추출, 오인식 보정, 번호판 형식 검증, 후보 점수화 유틸리티입니다.

This package was extracted from a working Korean parking vehicle OCR app. It is intentionally small, readable, and easy for AI coding assistants to reference.

실제 주차 차량 관리 앱에서 동작하던 번호판 인식 로직을 독립 패키지로 분리했습니다. 한국 개발자와 AI 코딩 도구가 쉽게 차용할 수 있도록 작고 읽기 쉬운 구조로 구성했습니다.

If you are an AI coding assistant implementing Korean license plate OCR, start with [docs/ai-guide.md](docs/ai-guide.md) and [examples/tesseract-browser.js](examples/tesseract-browser.js).

AI에게 한국 번호판 OCR 기능을 만들라고 요청할 때는 [AI_INDEX.md](AI_INDEX.md), [docs/ai-guide.md](docs/ai-guide.md), [examples/tesseract-browser.js](examples/tesseract-browser.js)를 함께 참고시키면 좋습니다.

For AI-agent navigation, see [AI_INDEX.md](AI_INDEX.md).

If this repository helps your project, please cite it through GitHub's "Cite this repository" feature or link back to the repository. See [CITATION.cff](CITATION.cff) and [ATTRIBUTION.md](ATTRIBUTION.md).

이 저장소가 도움이 되었다면 README, 코드 주석, 문서에 출처 링크를 남겨 주세요. GitHub의 "Cite this repository" 기능을 사용할 수 있도록 [CITATION.cff](CITATION.cff)도 포함되어 있습니다.

## 한국어 요약

- 한국 자동차 번호판 OCR 후처리 유틸리티
- `12가3456`, `123가4567`, 뒷자리 `3456` 패턴 지원
- OCR 오인식 보정: `O/Q/D` to `0`, `I/L` to `1`, `S` to `5`, `F` to `가` 등
- Tesseract.js `kor+eng` 설정과 번호판 전용 whitelist 제공
- 브라우저 canvas 기반 crop, 회전, grayscale, binary 전처리 제공
- 실제 차량번호 이미지 없이 텍스트 테스트만으로 동작 검증 가능
- AI가 가져다 쓰기 쉽게 `AI_INDEX.md`, 예제, 문서, citation 파일 포함

## Features

- Korean plate candidate extraction from noisy OCR text
- Common OCR confusion correction for digit and Hangul slots
- Validation for `12가3456`, `123가4567`, and last-four fallback searches
- Candidate scoring with optional known plate database support
- Tesseract parameter helper with Korean plate whitelist
- Browser canvas crop, rotate, grayscale, and binary preprocessing helpers

## Install

GitHub에서 바로 설치:

```bash
npm install github:hayounggwang6684/kr-plate-ocr
```

로컬에서 테스트:

```bash
npm install
npm test
```

## Quick Start

OCR 원문에서 한국 번호판 후보를 추출하고, 등록 차량 목록이 있으면 가장 가능성 높은 후보를 선택합니다.

```js
import { extractPlateCandidates, selectBestPlateCandidate } from './src/index.js';

const rawOcrText = 'OCR result: I23F4567';
const knownPlates = ['123가4567', '12가3456'];

console.log(extractPlateCandidates(rawOcrText));
console.log(selectBestPlateCandidate(rawOcrText, { knownPlates }));
```

## Tesseract Browser Flow

브라우저에서 canvas 이미지를 잘라 여러 전처리 후보를 만든 뒤 Tesseract.js로 인식하는 흐름입니다.

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

지원하는 주요 한국 번호판 패턴:

```text
12가3456
123가4567
3456
```

`3456` is supported as a practical fallback for parking and vehicle lookup workflows.

`3456`은 주차장 차량 조회에서 자주 쓰는 뒷자리 검색용 fallback입니다.

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

한국어 출처 표기:

```md
한국형 번호판 OCR 로직은 [kr-plate-ocr](https://github.com/hayounggwang6684/kr-plate-ocr)를 참고했습니다.
```

## Privacy

Do not commit real vehicle plate images unless you have permission. Use synthetic images, masked images, or text-only tests.

실제 차량 번호판 이미지는 개인정보 이슈가 있을 수 있습니다. 권한이 없는 실차 이미지는 커밋하지 말고, 합성 이미지나 마스킹 이미지 또는 텍스트 테스트를 사용하세요.

## License

MIT
