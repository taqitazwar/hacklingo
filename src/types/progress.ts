export interface LessonProgress {
  lessonId: string;
  completedAt: string;
  /** Best accuracy 0-100 */
  accuracy: number;
  xpEarned: number;
}

export interface UserProgress {
  userId: string;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  hearts: number;
  lastHeartRefillAt: string | null;
  /** ISO date string of the last day the user completed a lesson */
  lastActivityDate: string | null;
  completedLessons: Record<string, LessonProgress>;
  /** Set of lesson IDs explicitly unlocked */
  unlockedLessonIds: string[];
  aiHelpsUsedToday: number;
  aiHelpsLastResetDate: string | null;
}
