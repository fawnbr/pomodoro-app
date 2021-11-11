import { leftZero } from './leftZero';

export function secondsToMinutes(seconds: number): string {
  const min = leftZero((seconds / 60) % 60);
  const sec = leftZero((seconds % 60) % 60);
  return `${min}:${sec}`;
}
