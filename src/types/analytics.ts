export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

export type EventName =
  | 'app_open'
  | 'lesson_started'
  | 'lesson_completed'
  | 'lesson_abandoned'
  | 'challenge_answered'
  | 'onboarding_step_completed'
  | 'streak_achieved'
  | 'achievement_unlocked'
  | 'settings_changed'
  | 'paywall_viewed'
  | 'subscription_started';

export interface UserProperties {
  level: number;
  totalXP: number;
  streak: number;
  selectedLanguage: string;
  daysActive: number;
  isPremium: boolean;
}
