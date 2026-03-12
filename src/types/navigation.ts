import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Lesson: { lessonId: string };
  Results: {
    lessonId: string;
    score: number;
    xpEarned: number;
    perfect: boolean;
    timeSpent: number;
  };
  Friends: undefined;
  Settings: undefined;
  Activity: undefined;
  Glossary: undefined;
  Achievements: undefined;
  Stats: undefined;
  DailyGoal: undefined;
  Notifications: undefined;
  LanguageDetail: { languageId: string };
  Shop: undefined;
};

export type MainTabParamList = {
  Learn: undefined;
  Practice: undefined;
  Challenges: undefined;
  Rank: undefined;
  Profile: undefined;
};
