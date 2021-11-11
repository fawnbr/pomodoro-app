export function secondsToTime(seconds: number): string {
  const leftZero = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = leftZero((seconds / 60) % 60);
  const sec = leftZero((seconds % 60) % 60);
  return `${min}:${sec}`;
}
