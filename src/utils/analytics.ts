/**
 * Analytics event tracking stub.
 * Wire up to your analytics provider (Mixpanel, Amplitude, etc.)
 */

export type AnalyticsEvent =
  | 'lesson_started'
  | 'lesson_completed'
  | 'lesson_failed'
  | 'challenge_answered'
  | 'heart_lost'
  | 'xp_earned'
  | 'streak_extended'
  | 'streak_broken'
  | 'language_selected'
  | 'onboarding_completed';

export interface EventProperties {
  [key: string]: string | number | boolean;
}

/**
 * Track an analytics event.
 * Replace the console.log with your analytics provider call.
 */
export function trackEvent(event: AnalyticsEvent, props?: EventProperties): void {
  if (__DEV__) {
    console.log('[Analytics]', event, props);
  }
  // TODO: analytics_provider.track(event, props);
}

export function setUserProperty(key: string, value: string | number | boolean): void {
  if (__DEV__) {
    console.log('[Analytics] setUserProperty', key, value);
  }
}
