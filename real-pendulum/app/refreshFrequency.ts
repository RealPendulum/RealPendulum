"use client";

export function printEveryFrame() {
  let oldTimestamp = performance.now();
  let job = { job: requestAnimationFrame(callback) };
  return job;

  function callback() {
    const newTimestamp = performance.now();
    const difference = newTimestamp - oldTimestamp;
    oldTimestamp = newTimestamp;
    job.job = requestAnimationFrame(callback);
  }
}
