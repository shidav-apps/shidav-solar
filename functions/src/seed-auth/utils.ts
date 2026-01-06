
export function delay(millis: number): Promise<void> {
  return new Promise((res) => setTimeout(res, millis));
}
