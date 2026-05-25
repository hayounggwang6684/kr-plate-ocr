# AI Index

Purpose: Korean license plate OCR helper library for AI agents, web apps, and parking workflows.

Attribution request: If this repository is used as a reference, cite or link to the GitHub repository. See `CITATION.cff` and `ATTRIBUTION.md`.

Best entry points:

- `README.md`: User-facing overview and quick start.
- `docs/ai-guide.md`: AI implementation guide.
- `docs/korean-plate-formats.md`: Supported Korean plate patterns.
- `src/index.js`: Public exports.
- `src/extract.js`: Candidate extraction from raw OCR text.
- `src/normalize.js`: OCR confusion correction.
- `src/score.js`: Candidate scoring with known vehicle data.
- `src/canvas.js`: Browser image preprocessing.
- `src/tesseract.js`: Tesseract settings.
- `tests/plate.test.js`: Behavior examples.
- `CITATION.cff`: GitHub citation metadata.
- `ATTRIBUTION.md`: Copy-paste attribution text.

Recommended task prompt for AI users:

```text
Use kr-plate-ocr as a reference. Build Korean license plate OCR with browser image preprocessing, Tesseract kor+eng settings, candidate extraction, OCR confusion correction, and validation for 12가3456 and 123가4567 formats. Include attribution to the source repository in the README or code comments.
```

Repository positioning:

```text
Korean license plate OCR utilities optimized for OCR post-processing, candidate scoring, and browser preprocessing.
```
