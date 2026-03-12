import { Achievement, AchievementProgress } from '../types/achievement';

export function checkAchievementUnlock(
  achievement: Achievement,
  stats: Record<string, number>
): boolean {
  const { type, value } = achievement.requirement;
  return (stats[type] ?? 0) >= value;
}

export function getAchievementProgress(
  achievement: Achievement,
  stats: Record<string, number>
): AchievementProgress {
  const { type, value } = achievement.requirement;
  const current = Math.min(stats[type] ?? 0, value);
  return {
    achievementId: achievement.id,
    current,
    required: value,
    unlocked: current >= value,
  };
}

export function sortAchievements(achievements: Achievement[]): Achievement[] {
  return [...achievements].sort((a, b) => {
    const aUnlocked = !!a.unlockedAt;
    const bUnlocked = !!b.unlockedAt;
    if (aUnlocked && !bUnlocked) return -1;
    if (!aUnlocked && bUnlocked) return 1;
    return a.requirement.value - b.requirement.value;
  });
}
