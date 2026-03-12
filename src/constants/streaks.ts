export const STREAK_CONFIG = {
  FREEZE_DURATION_HOURS: 24,
  MAX_FREEZE_COUNT: 2,
  MILESTONE_DAYS: [7, 14, 30, 60, 100, 200, 365] as const,
  REMINDER_HOUR: 20,
} as const;

export function getStreakMilestone(days: number): number | null {
  const milestones = STREAK_CONFIG.MILESTONE_DAYS;
  for (const milestone of milestones) {
    if (days === milestone) return milestone;
  }
  return null;
}

export function getNextStreakMilestone(days: number): number | null {
  const milestones = STREAK_CONFIG.MILESTONE_DAYS;
  for (const milestone of milestones) {
    if (days < milestone) return milestone;
  }
  return null;
}

export function getStreakEmoji(days: number): string {
  if (days >= 365) return '💎';
  if (days >= 100) return '⚡';
  if (days >= 30) return '🔥';
  if (days >= 7) return '🌟';
  return '🔥';
}
