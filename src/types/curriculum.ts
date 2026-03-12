export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';
export type ChallengeType = 'PREDICT_OUTPUT' | 'FILL_BLANK' | 'MULTIPLE_CHOICE' | 'FIX_BUG' | 'REORDER_BLOCKS' | 'TRUE_FALSE';

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  question: string;
  explanation: string;
  xpReward: number;
  difficulty: ChallengeDifficulty;
  hint?: string;
  tags?: string[];
}

export interface PredictOutputChallenge extends BaseChallenge {
  type: 'PREDICT_OUTPUT';
  codeSnippet: string;
  correctAnswer: string;
}

export interface FillBlankChallenge extends BaseChallenge {
  type: 'FILL_BLANK';
  codeSnippet: string;
  correctAnswer: string;
}

export interface MultipleChoiceChallenge extends BaseChallenge {
  type: 'MULTIPLE_CHOICE';
  options: string[];
  correctAnswer: string;
  codeSnippet?: string;
}

export interface FixBugChallenge extends BaseChallenge {
  type: 'FIX_BUG';
  buggyCode: string;
  correctCode: string;
}

export interface ReorderBlocksChallenge extends BaseChallenge {
  type: 'REORDER_BLOCKS';
  blocks: string[];
  correctOrder: string[];
}

export type Challenge =
  | PredictOutputChallenge
  | FillBlankChallenge
  | MultipleChoiceChallenge
  | FixBugChallenge
  | ReorderBlocksChallenge;
