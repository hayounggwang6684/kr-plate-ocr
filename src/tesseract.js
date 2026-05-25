import { PLATE_OCR_WHITELIST } from './constants.js';

export function getTesseractPlateParameters(pageSegMode = '7') {
  return {
    tessedit_pageseg_mode: String(pageSegMode),
    tessedit_char_whitelist: PLATE_OCR_WHITELIST,
    preserve_interword_spaces: '1',
  };
}

export const DEFAULT_TESSERACT_LANG = 'kor+eng';
export const DEFAULT_TESSERACT_PAGE_SEG_MODES = ['7', '8'];
