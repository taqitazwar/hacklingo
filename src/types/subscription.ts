export type SubscriptionTier = 'free' | 'premium' | 'premium_annual';
export type SubscriptionStatus = 'active' | 'expired' | 'trial' | 'canceled';

export interface Subscription {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string | null;
  autoRenew: boolean;
  trialEndDate: string | null;
}

export const SUBSCRIPTION_FEATURES: Record<SubscriptionTier, string[]> = {
  free: ['5 hearts per day', 'Basic lessons', 'Leaderboard'],
  premium: ['Unlimited hearts', 'All lessons', 'Offline mode', 'Analytics', 'No ads'],
  premium_annual: ['All premium features', 'Priority support', 'Early access'],
};
