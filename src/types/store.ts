import { UserProfile, UserStats } from './user';
import { LessonSession, DailyProgress } from './lesson';
import { AchievementProgress } from './achievement';

export interface ProgressState {
  totalXP: number;
  streak: number;
  longestStreak: number;
  lastPracticedDate: string | null;
  completedLessons: Record<string, { score: number; xpEarned: number; completedAt: string }>;
  unlockedLessons: string[];
  currentLesson: string;
  dailyProgress: Record<string, DailyProgress>;
  sessionHistory: LessonSession[];
}

export interface AppState {
  progress: ProgressState;
  userProfile: Partial<UserProfile>;
  achievementProgress: Record<string, AchievementProgress>;
  settings: AppSettings;
}

export interface AppSettings {
  dailyGoalMinutes: number;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  selectedLanguage: string;
  theme: 'dark' | 'light' | 'system';
}
