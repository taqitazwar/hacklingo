export const ONBOARDING_STEPS = [
  'greeting',
  'intro',
  'language',
  'reason',
  'experience',
  'goal',
] as const;

export type OnboardingStep = typeof ONBOARDING_STEPS[number];

export const LEARNING_REASONS = [
  { id: 'career', label: 'Career growth', emoji: '💼' },
  { id: 'hobby', label: 'Fun hobby', emoji: '🎮' },
  { id: 'school', label: 'School/university', emoji: '🎓' },
  { id: 'interview', label: 'Job interviews', emoji: '💡' },
  { id: 'freelance', label: 'Freelancing', emoji: '💻' },
  { id: 'other', label: 'Something else', emoji: '🌟' },
] as const;

export const EXPERIENCE_LEVELS = [
  { id: 'none', label: 'Complete beginner', description: "I've never coded before" },
  { id: 'some', label: 'Some experience', description: "I know a little" },
  { id: 'intermediate', label: 'Intermediate', description: "I can write basic programs" },
  { id: 'advanced', label: 'Advanced', description: "I code regularly" },
] as const;
