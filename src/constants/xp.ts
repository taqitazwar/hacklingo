export const XP_CONFIG = {
  EASY_CHALLENGE: 10,
  MEDIUM_CHALLENGE: 15,
  HARD_CHALLENGE: 20,
  LESSON_BONUS: 50,
  BOSS_LESSON_BONUS: 100,
  PERFECT_LESSON_BONUS: 25,
  STREAK_MULTIPLIER_7_DAY: 1.5,
  STREAK_MULTIPLIER_30_DAY: 2.0,
  FIRST_LESSON_OF_DAY: 20,
} as const;

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
  4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500, 17300,
] as const;

export function getLevelFromXP(xp: number): number {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
    else break;
  }
  return level;
}

export function getXPForNextLevel(xp: number): number {
  const level = getLevelFromXP(xp);
  return LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
}
