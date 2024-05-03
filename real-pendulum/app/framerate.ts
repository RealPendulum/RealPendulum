"use client";

export function getFrameDuration() {
  return new Promise<number>((resolve) => {
    let oldTimestamp = performance.now();
    const length = 16;
    let values = new Array(length).fill(0);
    let counter = 0;
    requestAnimationFrame(callback);

    function callback() {
      const newTimestamp = performance.now();
      const difference = newTimestamp - oldTimestamp;
      oldTimestamp = newTimestamp;
      values[counter] = difference;

      if (++counter < length) {
        requestAnimationFrame(callback);
      } else {
        const meanFrameDuration = calculateFrameDuration(values);
        if (meanFrameDuration > 0) {
          resolve(meanFrameDuration);
        } else {
          values = new Array(length).fill(0);
          counter = 0;
          requestAnimationFrame(callback);
        }
      }
    }
  });
}

function calculateFrameDuration(values: number[]) {
  let extremesPresent = true;
  let meanFrameDuration = 0;

  while (extremesPresent) {
    extremesPresent = false;
    meanFrameDuration = values.reduce((a, b) => a + b, 0) / values.length;

    const stdDev = Math.sqrt(
      values.reduce((a, b) => a + Math.pow(b - meanFrameDuration, 2), 0) /
        values.length
    );

    const furthestValue = values.reduce((a, b) =>
      Math.abs(b - meanFrameDuration) > Math.abs(a - meanFrameDuration) ? b : a
    );

    const twoSigma = stdDev * 2;
    const deviation = Math.abs(furthestValue - meanFrameDuration);

    if (deviation > twoSigma) {
      const index = values.indexOf(furthestValue);
      if (index !== -1) {
        values.splice(index, 1);
        extremesPresent = true;
      }
    }

    if (values.length === 1) {
      return 0;
    }
  }

  return meanFrameDuration;
}
