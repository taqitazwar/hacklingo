export interface UserSettings {
  dailyGoalMinutes: number;
  notificationsEnabled: boolean;
  notificationHour: number;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  selectedLanguage: string;
  theme: 'dark' | 'light' | 'system';
  streakReminderEnabled: boolean;
  leaderboardVisible: boolean;
  showTips: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  dailyGoalMinutes: 10,
  notificationsEnabled: true,
  notificationHour: 20,
  soundEnabled: true,
  hapticsEnabled: true,
  selectedLanguage: 'python',
  theme: 'dark',
  streakReminderEnabled: true,
  leaderboardVisible: true,
  showTips: true,
};
