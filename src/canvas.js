import { DEFAULT_CROP_FRAMES, DEFAULT_ROTATION_ANGLES } from './constants.js';

export function createOcrImageCandidates(sourceCanvas, options = {}) {
  const cropFrames = options.cropFrames ?? DEFAULT_CROP_FRAMES;
  const rotationAngles = options.rotationAngles ?? DEFAULT_ROTATION_ANGLES;
  const targetWidth = options.targetWidth ?? 1800;

  return cropFrames.flatMap((frame) => {
    const outputCanvas = document.createElement('canvas');
    const cropWidth = sourceCanvas.width * frame.width;
    const cropHeight = sourceCanvas.height * frame.height;
    outputCanvas.width = targetWidth;
    outputCanvas.height = Math.round(targetWidth * (cropHeight / cropWidth));

    const context = outputCanvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(
      sourceCanvas,
      sourceCanvas.width * frame.x,
      sourceCanvas.height * frame.y,
      cropWidth,
      cropHeight,
      0,
      0,
      outputCanvas.width,
      outputCanvas.height,
    );

    return rotationAngles.flatMap((angle) =>
      createPreprocessedOcrImages(rotateCanvas(outputCanvas, angle), options),
    );
  });
}

export function rotateCanvas(sourceCanvas, angle) {
  if (angle === 0) return sourceCanvas;

  const radians = (angle * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = Math.ceil(sourceCanvas.width * cos + sourceCanvas.height * sin);
  outputCanvas.height = Math.ceil(sourceCanvas.width * sin + sourceCanvas.height * cos);

  const context = outputCanvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
  context.translate(outputCanvas.width / 2, outputCanvas.height / 2);
  context.rotate(radians);
  context.drawImage(sourceCanvas, -sourceCanvas.width / 2, -sourceCanvas.height / 2);

  return outputCanvas;
}

export function createPreprocessedOcrImages(sourceCanvas, options = {}) {
  const modes = options.modes ?? ['gray', 'binary'];
  const threshold = options.threshold ?? 142;
  const contrastOffset = options.contrastOffset ?? 118;
  const contrastScale = options.contrastScale ?? 1.75;

  return modes.map((mode) => {
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = sourceCanvas.width;
    outputCanvas.height = sourceCanvas.height;

    const context = outputCanvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(sourceCanvas, 0, 0);

    const image = context.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
    const { data } = image;
    for (let index = 0; index < data.length; index += 4) {
      const gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
      const enhanced = Math.max(0, Math.min(255, (gray - contrastOffset) * contrastScale + 128));
      const value = mode === 'gray' ? enhanced : enhanced > threshold ? 255 : 0;

      data[index] = value;
      data[index + 1] = value;
      data[index + 2] = value;
    }

    context.putImageData(image, 0, 0);
    return outputCanvas.toDataURL('image/png');
  });
}
