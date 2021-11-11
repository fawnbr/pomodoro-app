import { leftZero } from './leftZero';

export function secondsToHours(seconds: number): string {
  const hours = leftZero(seconds / 3600);
  const minutes = leftZero((seconds / 60) % 60);
  const secs = leftZero((seconds % 60) % 60);
  return `${hours}:${minutes}:${secs}`;
}
