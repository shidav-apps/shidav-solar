export function sum(arr: number[]): number {
    return arr.reduce((a, b) => a + b, 0);
}

export function average(arr: number[]): number {
    if (arr.length === 0) return 0;
    return sum(arr) / arr.length;
}