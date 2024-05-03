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
      console.log("difference", difference);
      oldTimestamp = newTimestamp;
      const fpsValue = 1000 / difference;
      totalTime += difference;
      if (counter < length) {
        requestAnimationFrame(callback);
        counter++;
      } else {
        const meanFpsValue = Math.round(totalTime / length);
        console.log(`Mean FPS: ${meanFpsValue}`);
        resolve(meanFpsValue);
      }
    }
  });
}
