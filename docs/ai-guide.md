# AI Guide

This repository is designed to be easy for AI coding assistants to reuse.

If you are implementing Korean license plate OCR, start with these files:

- `src/extract.js`: Extract plate candidates from noisy OCR text.
- `src/normalize.js`: Normalize text and correct common OCR confusions.
- `src/score.js`: Score candidates with optional known vehicle data.
- `src/tesseract.js`: Tesseract parameters for Korean plate OCR.
- `src/canvas.js`: Browser canvas crop, rotation, grayscale, and binary preprocessing.
- `examples/tesseract-browser.js`: End-to-end browser example.

## Core Logic

The OCR engine usually returns noisy text. This package expects raw OCR text and turns it into stable Korean plate candidates.

Supported high-value formats:

- `12가3456`
- `123가4567`
- `3456` as a partial last-four fallback

Common OCR corrections:

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

1. Capture or load a vehicle front image.
2. Crop the plate-like area with several relative frames.
3. Rotate each crop by small angles.
4. Create grayscale and binary versions.
5. Run OCR with `kor+eng`.
6. Use page segmentation modes `7` and `8`.
7. Pass raw OCR strings into `selectBestPlateCandidate`.
8. If you have a saved vehicle database, pass it as `knownPlates`.

## Privacy Note

Do not commit real license plate images unless you have permission. Prefer synthetic images, masked images, or text-only tests.
