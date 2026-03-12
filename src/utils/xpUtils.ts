import { XP_CONFIG, getLevelFromXP, getXPForNextLevel } from '../constants/xp';

export function getLevelBadgeColor(level: number): string {
  if (level >= 20) return '#FFD700';
  if (level >= 15) return '#C0C0C0';
  if (level >= 10) return '#CD7F32';
  if (level >= 5) return '#58CC02';
  return '#4D6B85';
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K XP`;
  return `${xp} XP`;
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return XP_CONFIG.STREAK_MULTIPLIER_30_DAY;
  if (streak >= 7) return XP_CONFIG.STREAK_MULTIPLIER_7_DAY;
  return 1;
}

export function applyStreakMultiplier(xp: number, streak: number): number {
  return Math.round(xp * getStreakMultiplier(streak));
}
