export type NotificationType = 'streak_reminder' | 'daily_goal' | 'lesson_unlock' | 'achievement';

export interface NotificationConfig {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  scheduledAt?: Date;
  data?: Record<string, unknown>;
}

export function buildStreakReminderNotification(hour: number = 20): NotificationConfig {
  const scheduledAt = new Date();
  scheduledAt.setHours(hour, 0, 0, 0);
  return {
    id: 'streak-reminder',
    type: 'streak_reminder',
    title: "Don't break your streak! 🔥",
    body: "You haven't practiced today. Keep your streak going!",
    scheduledAt,
  };
}

export function buildGoalAchievedNotification(xp: number): NotificationConfig {
  return {
    id: 'daily-goal',
    type: 'daily_goal',
    title: 'Daily goal reached! 🎯',
    body: `You earned ${xp} XP today. Amazing work!`,
  };
}

export function buildAchievementNotification(title: string): NotificationConfig {
  return {
    id: `achievement-${Date.now()}`,
    type: 'achievement',
    title: 'Achievement unlocked! 🏆',
    body: `You earned the "${title}" badge!`,
  };
}
