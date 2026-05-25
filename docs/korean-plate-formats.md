# Korean Plate Formats

This package focuses on common private vehicle plate text patterns.

## Supported Patterns

```text
12가3456
123가4567
3456
```

`3456` is treated as a partial fallback because many parking workflows search by the last four digits.

## Hangul Characters

The current whitelist uses common Korean plate middle characters:

```text
가 나 다 라 마 거 너 더 러 머 버 서 어 저 고 노 도 로 모 보 소 오 조 구 누 두 루 무 부 수 우 주 하 허 호
```

## Scoring

Candidate priority:

- Three-digit prefix full plate: highest base score
- Two-digit prefix full plate: high base score
- Last-four partial plate: fallback score

Known vehicle data can raise the score when:

- The full plate is an exact match.
- A detected two-digit prefix matches a saved three-digit prefix missing the leading digit.
- The last four digits match a saved full or partial plate.
