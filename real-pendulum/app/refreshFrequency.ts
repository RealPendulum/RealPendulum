"use client";

export function printEveryFrame(setFpsValue: (fps: number) => void) {
  let oldTimestamp = performance.now();
  let fpsValue = 0;
  let job = { id: requestAnimationFrame(callback) };
  const length = 10;
  const buffer = new Array(length).fill(0);
  let counter = 0;
  return job;

  function callback() {
    const newTimestamp = performance.now();
    const difference = newTimestamp - oldTimestamp;
    oldTimestamp = newTimestamp;
    fpsValue = 1000 / difference;
    buffer[counter++] = fpsValue;
    if (counter === 10) {
      fpsValue = buffer.reduce((acc, val) => acc + val, 0) / length;
      setFpsValue(fpsValue);
    }
    counter = counter % length;
    job.id = requestAnimationFrame(callback);
  }
}
