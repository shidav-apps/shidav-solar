export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function choice<T>(arr: readonly T[]) {
  return arr[randInt(0, arr.length - 1)];
}

export function roundTo(n: number, step: number) {
  return Math.round(n / step) * step;
}

export function randomDateInPastYear() {
  const now = Date.now();
  const past = now - 365 * 24 * 60 * 60 * 1000;
  return new Date(randInt(past, now)).toISOString();
}

// Skewed helper (0..1), centered-ish for efficiency, lower-biased for revenue
export function skewMid() {
  return (Math.random() + Math.random()) / 2;
}
export function skewLow() {
  return Math.random() ** 2;
}
