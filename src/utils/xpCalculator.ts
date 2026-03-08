import { GameConfig } from '../constants';

/**
 * XP calculation utilities.
 */

export function calculateChallengeXp(isCorrect: boolean, streak: number): number {
  if (!isCorrect) return 0;
  const base = GameConfig.xpPerCorrectAnswer;
  const streakBonus = Math.min(streak, 5) * 2;
  return base + streakBonus;
}

export function calculateLevelFromXp(xp: number): number {
  // Level up every 500 XP
  return Math.floor(xp / 500) + 1;
}

export function xpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevelFromXp(currentXp);
  return currentLevel * 500;
}

export function xpProgressToNextLevel(currentXp: number): number {
  const xpNeeded = xpForNextLevel(currentXp);
  const xpAtCurrentLevel = (calculateLevelFromXp(currentXp) - 1) * 500;
  return (currentXp - xpAtCurrentLevel) / (xpNeeded - xpAtCurrentLevel);
}

export function getLevelTitle(level: number): string {
  if (level <= 5) return 'Beginner';
  if (level <= 10) return 'Learner';
  if (level <= 20) return 'Developer';
  if (level <= 40) return 'Engineer';
  return 'Master';
}
