export const FEATURE_FLAGS = {
  ENABLE_FRIENDS: false,
  ENABLE_PAYWALL: false,
  ENABLE_DAILY_CHALLENGES: true,
  ENABLE_REVIEW_MODE: true,
  ENABLE_GLOSSARY: true,
  ENABLE_LEADERBOARD: true,
  ENABLE_STREAK_FREEZE: false,
  ENABLE_SOUND: false,
  ENABLE_OFFLINE_MODE: false,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;

export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag];
}
