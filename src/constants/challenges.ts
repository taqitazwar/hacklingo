export const CHALLENGE_TYPE_LABELS: Record<string, string> = {
  PREDICT_OUTPUT: 'Predict Output',
  FILL_BLANK: 'Fill in the Blank',
  MULTIPLE_CHOICE: 'Multiple Choice',
  FIX_BUG: 'Fix the Bug',
  REORDER_BLOCKS: 'Reorder Blocks',
  TRUE_FALSE: 'True or False',
} as const;

export const CHALLENGE_TYPE_ICONS: Record<string, string> = {
  PREDICT_OUTPUT: '🔮',
  FILL_BLANK: '✍️',
  MULTIPLE_CHOICE: '🎯',
  FIX_BUG: '🐛',
  REORDER_BLOCKS: '🔀',
  TRUE_FALSE: '⚖️',
} as const;

export const DIFFICULTY_LABELS = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
} as const;

export const DIFFICULTY_COLORS = {
  easy: '#58CC02',
  medium: '#FF9600',
  hard: '#E03232',
} as const;

export const MAX_HEARTS = 5;
export const HINT_COST_HEARTS = 1;
export const SKIP_COST_HEARTS = 2;
