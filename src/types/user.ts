export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  level: number;
  totalXP: number;
  streak: number;
  longestStreak: number;
  lessonsCompleted: number;
  dailyGoalMinutes: number;
  selectedLanguage: string;
  badges: string[];
  friends: string[];
}

export interface UserStats {
  totalTimeSpent: number;
  averageSessionLength: number;
  challengesAttempted: number;
  challengesCorrect: number;
  accuracy: number;
  bestDay: string;
  currentWeekXP: number;
}

export type LeaderboardEntry = Pick<UserProfile, 'id' | 'username' | 'displayName' | 'level' | 'totalXP' | 'streak' | 'avatarUrl'> & {
  rank: number;
};
