export const ROUTES = {
  SPLASH: 'Splash',
  WELCOME: 'Welcome',
  ONBOARDING: 'Onboarding',
  MAIN_TABS: 'MainTabs',
  LESSON: 'Lesson',
  RESULTS: 'Results',
  FRIENDS: 'Friends',
  SETTINGS: 'Settings',
  ACTIVITY: 'Activity',
  GLOSSARY: 'Glossary',
  ACHIEVEMENTS: 'Achievements',
  STATS: 'Stats',
  DAILY_GOAL: 'DailyGoal',
  NOTIFICATIONS: 'Notifications',
  LANGUAGE_DETAIL: 'LanguageDetail',
  SHOP: 'Shop',
  REVIEW: 'Review',
  PAYWALL: 'Paywall',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];

export const TAB_ROUTES = {
  LEARN: 'Learn',
  PRACTICE: 'Practice',
  CHALLENGES: 'Challenges',
  RANK: 'Rank',
  PROFILE: 'Profile',
} as const;
