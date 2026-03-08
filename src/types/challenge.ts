/**
 * All challenge-related types.
 * Each challenge type maps to a distinct UI component.
 */

export type ChallengeType =
  | 'PREDICT_OUTPUT'
  | 'FILL_BLANK'
  | 'FIX_BUG'
  | 'REORDER_BLOCKS'
  | 'MULTIPLE_CHOICE';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface BaseChallenge {
  id: string;
  type: ChallengeType;
  instruction: string;
  difficulty: DifficultyLevel;
  explanation: string;
  hint?: string;
}

export interface PredictOutputChallenge extends BaseChallenge {
  type: 'PREDICT_OUTPUT';
  code: string;
  options: string[];
  correctAnswer: string;
}

export interface FillBlankChallenge extends BaseChallenge {
  type: 'FILL_BLANK';
  /** Use ___ to denote the blank in the code string */
  codeWithBlank: string;
  options: string[];
  correctAnswer: string;
}

export interface FixBugChallenge extends BaseChallenge {
  type: 'FIX_BUG';
  buggyCode: string;
  options: string[];
  /** The corrected full code string */
  correctAnswer: string;
  /** Zero-indexed line number containing the bug */
  bugLineIndex: number;
}

export interface ReorderBlocksChallenge extends BaseChallenge {
  type: 'REORDER_BLOCKS';
  /** Shuffled blocks the user must arrange */
  shuffledBlocks: string[];
  /** Correct order of the same blocks */
  correctOrder: string[];
}

export interface MultipleChoiceChallenge extends BaseChallenge {
  type: 'MULTIPLE_CHOICE';
  question: string;
  code?: string;
  options: string[];
  correctAnswer: string;
}

export type Challenge =
  | PredictOutputChallenge
  | FillBlankChallenge
  | FixBugChallenge
  | ReorderBlocksChallenge
  | MultipleChoiceChallenge;
