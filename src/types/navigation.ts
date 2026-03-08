import { Lesson } from './curriculum';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  Lesson: { lesson: Lesson; sectionTitle: string; accentColor: string };
  Results: {
    xpEarned: number;
    accuracy: number;
    streakDay: number;
    lessonTitle: string;
    isStreakMilestone: boolean;
  };
};

export type MainTabParamList = {
  Home:        undefined;
  Practice:    undefined;
  Challenges:  undefined;
  Profile:     undefined;
  Leaderboard: undefined;
};
