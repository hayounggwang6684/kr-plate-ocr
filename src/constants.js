export const PLATE_HANGUL_CHARS =
  '가나다라마거너더러머버서어저고노도로모보소오조구누두루무부수우주하허호';

export const PLATE_OCR_WHITELIST =
  `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ${PLATE_HANGUL_CHARS}`;

export const DIGIT_LIKE_CHARS = {
  O: '0',
  Q: '0',
  D: '0',
  I: '1',
  L: '1',
  Z: '2',
  S: '5',
  B: '8',
};

export const HANGUL_LIKE_CHARS = {
  7: '가',
  F: '가',
  R: '라',
  A: '마',
  O: '어',
  D: '어',
  U: '나',
  H: '하',
};

export const DEFAULT_CROP_FRAMES = [
  { x: 0.06, y: 0.34, width: 0.88, height: 0.4 },
  { x: 0.1, y: 0.38, width: 0.8, height: 0.32 },
  { x: 0.14, y: 0.42, width: 0.72, height: 0.26 },
  { x: 0.02, y: 0.26, width: 0.96, height: 0.58 },
];

export const DEFAULT_ROTATION_ANGLES = [-9, 0, 9];
