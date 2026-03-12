export type ChallengeResult = {
  challengeId: string;
  correct: boolean;
  attempts: number;
  timeSpent: number;
  xpEarned: number;
};

export type LessonSession = {
  lessonId: string;
  startTime: number;
  endTime?: number;
  results: ChallengeResult[];
  score: number;
  xpEarned: number;
  livesLost: number;
  completed: boolean;
};

export type LessonCompletionPayload = {
  lessonId: string;
  score: number;
  xpEarned: number;
  perfect: boolean;
  timeSpent: number;
  isFirstTime: boolean;
};

export type DailyProgress = {
  date: string;
  minutesPracticed: number;
  xpEarned: number;
  lessonsCompleted: number;
  goalMet: boolean;
};
