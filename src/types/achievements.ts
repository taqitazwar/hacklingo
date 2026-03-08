export type AchievementCategory = 'streak' | 'xp' | 'lessons' | 'accuracy' | 'speed';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: number;
  xpReward: number;
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
}
