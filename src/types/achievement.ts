export type AchievementCategory =
  | 'streak'
  | 'xp'
  | 'lessons'
  | 'accuracy'
  | 'language'
  | 'social'
  | 'special';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: {
    type: 'streak' | 'xp' | 'lessons_completed' | 'accuracy' | 'days_active';
    value: number;
  };
  xpReward: number;
  unlockedAt?: string;
}

export interface AchievementProgress {
  achievementId: string;
  current: number;
  required: number;
  unlocked: boolean;
  unlockedAt?: string;
}
