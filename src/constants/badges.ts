export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
}

export const BADGES: Badge[] = [
  { id: 'first-lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '🐣', rarity: 'common', xpReward: 10 },
  { id: 'week-streak', title: 'Week Warrior', description: '7-day streak', icon: '🔥', rarity: 'common', xpReward: 50 },
  { id: 'month-streak', title: 'Month Master', description: '30-day streak', icon: '⚡', rarity: 'rare', xpReward: 200 },
  { id: 'perfect-lesson', title: 'Perfectionist', description: 'Complete a lesson with no mistakes', icon: '⭐', rarity: 'rare', xpReward: 100 },
  { id: 'speed-run', title: 'Speed Demon', description: 'Complete 5 challenges in under 1 minute each', icon: '🏃', rarity: 'epic', xpReward: 300 },
  { id: 'century', title: 'Century Club', description: 'Earn 100-day streak', icon: '💯', rarity: 'epic', xpReward: 500 },
  { id: 'year', title: 'Legend', description: 'Earn 365-day streak', icon: '💎', rarity: 'legendary', xpReward: 2000 },
  { id: 'all-python', title: 'Pythonista', description: 'Complete all Python lessons', icon: '🐍', rarity: 'epic', xpReward: 500 },
] as const;

export const BADGE_RARITY_COLORS = {
  common: '#9E9E9E',
  rare: '#2196F3',
  epic: '#9C27B0',
  legendary: '#FFD700',
} as const;
