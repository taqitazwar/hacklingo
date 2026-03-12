export const NOTIFICATION_IDS = {
  STREAK_REMINDER: 'streak-reminder',
  DAILY_GOAL: 'daily-goal-reminder',
  LESSON_UNLOCK: 'lesson-unlock',
  ACHIEVEMENT: 'achievement-unlock',
  WEEKLY_SUMMARY: 'weekly-summary',
} as const;

export const NOTIFICATION_CHANNELS = {
  REMINDERS: {
    id: 'reminders',
    name: 'Learning Reminders',
    importance: 4,
  },
  ACHIEVEMENTS: {
    id: 'achievements',
    name: 'Achievements',
    importance: 3,
  },
} as const;

export const DEFAULT_REMINDER_MESSAGES = [
  "Time to practice! Your streak is counting on you. 🔥",
  "Don't let your streak end today! 5 minutes is all it takes.",
  "Bug misses you! Come back and keep coding. 🐛",
  "Your coding skills won't improve themselves. Let's go! 💪",
  "A day without coding is a day without progress. 📚",
] as const;
