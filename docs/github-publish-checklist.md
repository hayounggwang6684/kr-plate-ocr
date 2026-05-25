# GitHub Publish Checklist

Use this checklist before publishing this package as a standalone repository.

## Repository

- Name: `kr-plate-ocr` or `korean-license-plate-ocr`
- Description: `AI-friendly Korean license plate OCR post-processing and browser preprocessing utilities.`
- License: MIT
- Visibility: Public

## Topics

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

## First Release

- Keep version at `0.1.0`.
- Tag as `v0.1.0`.
- Mention privacy: no real plate images are included.
- Mention supported formats: `12가3456`, `123가4567`, and `3456`.
- Replace `hayounggwang6684` in `README.md`, `AI_INDEX.md`, `CITATION.cff`, and `ATTRIBUTION.md`.

## AI Discoverability

- Keep `AI_INDEX.md` in the repository root.
- Keep examples small and runnable.
- Keep tests text-only so AI users can understand behavior without image fixtures.
- Put implementation notes in `docs/ai-guide.md`.
- Keep `CITATION.cff` in the repository root so GitHub shows "Cite this repository".
- Keep `ATTRIBUTION.md` in the repository root so AI-generated projects have copy-paste source text.
