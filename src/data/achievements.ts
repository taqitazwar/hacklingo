import { Achievement } from '../types/achievements';

const ACHIEVEMENTS: Achievement[] = [
  // Streak achievements
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: 3,
    xpReward: 50,
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    category: 'streak',
    requirement: 7,
    xpReward: 100,
  },
  {
    id: 'streak-30',
    title: 'Monthly Champion',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    category: 'streak',
    requirement: 30,
    xpReward: 500,
  },
  {
    id: 'streak-100',
    title: 'Centurion',
    description: 'Maintain a 100-day streak',
    icon: '💎',
    category: 'streak',
    requirement: 100,
    xpReward: 2000,
  },

  // XP achievements
  {
    id: 'xp-100',
    title: 'First Steps',
    description: 'Earn 100 XP',
    icon: '⭐',
    category: 'xp',
    requirement: 100,
    xpReward: 0,
  },
  {
    id: 'xp-500',
    title: 'XP Collector',
    description: 'Earn 500 XP',
    icon: '🌟',
    category: 'xp',
    requirement: 500,
    xpReward: 50,
  },
  {
    id: 'xp-1000',
    title: 'XP Hunter',
    description: 'Earn 1000 XP',
    icon: '💫',
    category: 'xp',
    requirement: 1000,
    xpReward: 100,
  },
  {
    id: 'xp-5000',
    title: 'XP Legend',
    description: 'Earn 5000 XP',
    icon: '🏆',
    category: 'xp',
    requirement: 5000,
    xpReward: 500,
  },

  // Lesson achievements
  {
    id: 'lessons-1',
    title: 'First Lesson',
    description: 'Complete your first lesson',
    icon: '🎯',
    category: 'lessons',
    requirement: 1,
    xpReward: 10,
  },
  {
    id: 'lessons-5',
    title: 'Getting Started',
    description: 'Complete 5 lessons',
    icon: '📚',
    category: 'lessons',
    requirement: 5,
    xpReward: 50,
  },
  {
    id: 'lessons-10',
    title: 'Dedicated Learner',
    description: 'Complete 10 lessons',
    icon: '🎓',
    category: 'lessons',
    requirement: 10,
    xpReward: 100,
  },
  {
    id: 'lessons-25',
    title: 'Bug Chaser',
    description: 'Complete 25 lessons',
    icon: '🐛',
    category: 'lessons',
    requirement: 25,
    xpReward: 250,
  },

  // Accuracy achievements
  {
    id: 'accuracy-100',
    title: 'Perfect Run',
    description: 'Complete a lesson with 100% accuracy',
    icon: '💯',
    category: 'accuracy',
    requirement: 100,
    xpReward: 50,
  },
  {
    id: 'accuracy-90-5',
    title: 'Sharp Mind',
    description: 'Get 90%+ accuracy on 5 lessons',
    icon: '🧠',
    category: 'accuracy',
    requirement: 5,
    xpReward: 100,
  },
];

export default ACHIEVEMENTS;

export const getAchievementsForCategory = (category: Achievement['category']) =>
  ACHIEVEMENTS.filter((a) => a.category === category);

export const getAchievementById = (id: string) =>
  ACHIEVEMENTS.find((a) => a.id === id);
