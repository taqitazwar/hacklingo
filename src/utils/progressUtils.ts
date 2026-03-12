import { ProgressState } from '../types/store';
import { isToday, getISODate } from './timeUtils';

export function shouldExtendStreak(lastDate: string | null): boolean {
  if (!lastDate) return true;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return lastDate === getISODate(yesterday) || lastDate === getISODate();
}

export function isStreakBroken(lastDate: string | null): boolean {
  if (!lastDate) return false;
  if (isToday(lastDate)) return false;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return lastDate !== getISODate(yesterday);
}

export function getPracticeCompletionRate(progress: ProgressState, days: number = 7): number {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(getISODate(d));
  }
  const practiced = dates.filter(d => progress.dailyProgress[d]?.minutesPracticed > 0).length;
  return practiced / days;
}
