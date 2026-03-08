/**
 * Achievement definitions for the progress system.
 */

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: number;
  type: 'lessons' | 'streak' | 'xp' | 'hearts';
}

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    xpReward: 50,
    requirement: 1,
    type: 'lessons',
  },
  {
    id: 'lessons_5',
    title: 'Getting Started',
    description: 'Complete 5 lessons',
    icon: '📖',
    xpReward: 100,
    requirement: 5,
    type: 'lessons',
  },
  {
    id: 'lessons_10',
    title: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '📚',
    xpReward: 200,
    requirement: 10,
    type: 'lessons',
  },
  {
    id: 'lessons_25',
    title: 'Bookworm',
    description: 'Complete 25 lessons',
    icon: '🎓',
    xpReward: 500,
    requirement: 25,
    type: 'lessons',
  },
  {
    id: 'streak_3',
    title: 'On a Roll',
    description: '3-day streak',
    icon: '🔥',
    xpReward: 30,
    requirement: 3,
    type: 'streak',
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: '7-day streak',
    icon: '⚡',
    xpReward: 100,
    requirement: 7,
    type: 'streak',
  },
  {
    id: 'streak_30',
    title: 'Monthly Master',
    description: '30-day streak',
    icon: '💎',
    xpReward: 500,
    requirement: 30,
    type: 'streak',
  },
  {
    id: 'xp_100',
    title: 'XP Starter',
    description: 'Earn 100 XP',
    icon: '⭐',
    xpReward: 20,
    requirement: 100,
    type: 'xp',
  },
  {
    id: 'xp_1000',
    title: 'XP Hunter',
    description: 'Earn 1,000 XP',
    icon: '🌟',
    xpReward: 100,
    requirement: 1000,
    type: 'xp',
  },
  {
    id: 'xp_10000',
    title: 'XP Legend',
    description: 'Earn 10,000 XP',
    icon: '👑',
    xpReward: 1000,
    requirement: 10000,
    type: 'xp',
  },
];
