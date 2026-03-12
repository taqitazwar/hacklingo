export type AppEvent =
  | { type: 'LESSON_STARTED'; lessonId: string; timestamp: number }
  | { type: 'LESSON_COMPLETED'; lessonId: string; xpEarned: number; score: number; timestamp: number }
  | { type: 'CHALLENGE_ANSWERED'; challengeId: string; correct: boolean; timestamp: number }
  | { type: 'HEART_LOST'; remaining: number; timestamp: number }
  | { type: 'STREAK_EXTENDED'; streak: number; timestamp: number }
  | { type: 'LEVEL_UP'; newLevel: number; timestamp: number }
  | { type: 'ACHIEVEMENT_UNLOCKED'; achievementId: string; timestamp: number };

export type EventHandler<E extends AppEvent> = (event: E) => void;
export type AnyEventHandler = (event: AppEvent) => void;
