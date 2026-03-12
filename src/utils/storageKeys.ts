export const STORAGE_KEYS = {
  PROGRESS: '@hacklingo_progress',
  SETTINGS: '@hacklingo_settings',
  USER_PROFILE: '@hacklingo_profile',
  ONBOARDING_COMPLETE: '@hacklingo_onboarding',
  LAST_SESSION: '@hacklingo_last_session',
  ACHIEVEMENT_PROGRESS: '@hacklingo_achievements',
  DAILY_PROGRESS: '@hacklingo_daily',
  STREAK_FREEZE: '@hacklingo_streak_freeze',
  TUTORIAL_SEEN: '@hacklingo_tutorial',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];
