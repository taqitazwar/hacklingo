import { LessonCompletionPayload } from '../types/lesson';
import { XP_CONFIG } from '../constants/xp';

export function calculateLessonXP(
  challenges: { correct: boolean; difficulty: 'easy' | 'medium' | 'hard' }[],
  isPerfect: boolean,
  isBoss: boolean
): number {
  const baseXP = challenges.reduce((sum, c) => {
    if (!c.correct) return sum;
    switch (c.difficulty) {
      case 'hard': return sum + XP_CONFIG.HARD_CHALLENGE;
      case 'medium': return sum + XP_CONFIG.MEDIUM_CHALLENGE;
      default: return sum + XP_CONFIG.EASY_CHALLENGE;
    }
  }, 0);

  const lessonBonus = isBoss ? XP_CONFIG.BOSS_LESSON_BONUS : XP_CONFIG.LESSON_BONUS;
  const perfectBonus = isPerfect ? XP_CONFIG.PERFECT_LESSON_BONUS : 0;

  return baseXP + lessonBonus + perfectBonus;
}

export function calculateScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function isPerfectScore(correct: number, total: number): boolean {
  return correct === total && total > 0;
}
