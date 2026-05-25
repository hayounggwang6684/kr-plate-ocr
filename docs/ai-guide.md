# AI Guide

This repository is designed to be easy for AI coding assistants to reuse.

이 문서는 AI 코딩 도구와 한국 개발자가 한국형 자동차 번호판 OCR 기능을 빠르게 구현할 수 있도록 작성되었습니다.

If you are implementing Korean license plate OCR, start with these files:

한국 번호판 OCR을 구현한다면 아래 파일부터 읽으세요:

- `src/extract.js`: Extract plate candidates from noisy OCR text.
- `src/normalize.js`: Normalize text and correct common OCR confusions.
- `src/score.js`: Score candidates with optional known vehicle data.
- `src/tesseract.js`: Tesseract parameters for Korean plate OCR.
- `src/canvas.js`: Browser canvas crop, rotation, grayscale, and binary preprocessing.
- `examples/tesseract-browser.js`: End-to-end browser example.

## Core Logic

The OCR engine usually returns noisy text. This package expects raw OCR text and turns it into stable Korean plate candidates.

OCR 엔진은 보통 지저분한 텍스트를 반환합니다. 이 패키지는 OCR 원문에서 한국 번호판 후보를 뽑고, 흔한 오인식을 보정한 뒤, 가장 가능성 높은 후보를 고르는 데 집중합니다.

Supported high-value formats:

중점 지원 형식:

- `12가3456`
- `123가4567`
- `3456` as a partial last-four fallback

Common OCR corrections:

대표 오인식 보정:

- Digit slots: `O`, `Q`, `D` to `0`
- Digit slots: `I`, `L` to `1`
- Digit slots: `Z` to `2`
- Digit slots: `S` to `5`
- Digit slots: `B` to `8`
- Middle Hangul slot: `F` or `7` to `가`
- Middle Hangul slot: `R` to `라`
- Middle Hangul slot: `A` to `마`
- Middle Hangul slot: `O` or `D` to `어`
- Middle Hangul slot: `U` to `나`
- Middle Hangul slot: `H` to `하`

## Recommended Flow

권장 구현 흐름:

1. Capture or load a vehicle front image.
2. Crop the plate-like area with several relative frames.
3. Rotate each crop by small angles.
4. Create grayscale and binary versions.
5. Run OCR with `kor+eng`.
6. Use page segmentation modes `7` and `8`.
7. Pass raw OCR strings into `selectBestPlateCandidate`.
8. If you have a saved vehicle database, pass it as `knownPlates`.

한국어 설명:

1. 차량 전면 이미지를 촬영하거나 불러옵니다.
2. 번호판이 있을 가능성이 높은 영역을 여러 비율로 crop합니다.
3. 기울어진 촬영을 보정하기 위해 작은 각도로 회전 후보를 만듭니다.
4. grayscale과 binary 이미지를 생성합니다.
5. OCR은 `kor+eng`로 실행합니다.
6. Tesseract page segmentation mode는 `7`, `8`을 우선 시도합니다.
7. OCR 원문 배열을 `selectBestPlateCandidate`에 넣습니다.
8. 등록 차량 DB가 있다면 `knownPlates`로 전달해 점수를 보정합니다.

## Korean Developer Notes

- 이 패키지는 완전한 딥러닝 번호판 detector가 아니라 OCR 전처리와 후처리에 초점을 둡니다.
- 실제 서비스에서는 번호판 위치 검출 모델 또는 사용자가 맞추는 촬영 가이드와 함께 쓰는 것이 좋습니다.
- 주차장/방문 차량 조회처럼 뒷자리 4자리 검색이 중요한 업무를 고려해 `3456` fallback을 지원합니다.
- 실차 번호판 이미지는 개인정보 문제가 있을 수 있으므로 공개 저장소에는 넣지 않는 것을 권장합니다.

## Privacy Note

Do not commit real license plate images unless you have permission. Prefer synthetic images, masked images, or text-only tests.
