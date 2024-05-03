"use client";

export function getFrameDuration() {
  return new Promise<number>((resolve) => {
    let oldTimestamp = performance.now();
    const length = 10;
    let totalTime = 0;
    let counter = 0;
    requestAnimationFrame(callback);

    function callback() {
      const newTimestamp = performance.now();
      const difference = newTimestamp - oldTimestamp;
      oldTimestamp = newTimestamp;
      totalTime += difference;
      if (counter < length) {
        requestAnimationFrame(callback);
        counter++;
      } else {
        const meanFrameDuration = Math.round(totalTime / length);
        resolve(meanFrameDuration);
      }
    }
  });
}
