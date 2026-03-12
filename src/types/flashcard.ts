export interface Flashcard {
  id: string;
  lessonId: string;
  front: string;
  back: string;
  codeExample?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  lastReviewed?: string;
  nextReview?: string;
  repetitions: number;
  easeFactor: number;
  interval: number;
}

export type FlashcardReviewResult = 'again' | 'hard' | 'good' | 'easy';

export interface FlashcardSession {
  id: string;
  startTime: number;
  cards: Flashcard[];
  results: Record<string, FlashcardReviewResult>;
  completed: boolean;
}
