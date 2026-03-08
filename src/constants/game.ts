/**
 * All game mechanic values in one place.
 * Change these to tune difficulty and engagement.
 */
const GameConfig = {
  // Hearts
  maxHearts: 5,
  heartRefillIntervalHours: 4,
  heartCostPerMistake: 1,

  // XP rewards
  xpPerEasyChallenge: 10,
  xpPerMediumChallenge: 15,
  xpPerHardChallenge: 25,
  xpPerBossLevel: 100,
  xpPerPrAccepted: 50,
  xpPerReviewFixed: 20,
  xpPerLessonCompletion: 10,

  // Streak
  dailyXpGoal: 50,
  streakFreezeCount: 1,

  // AI helps
  freeAiHelpsPerDay: 3,

  // Hints
  mistakesBeforeHintAppears: 2,

  // Levels
  totalLevels: 136,
  skillLevels: 110,
  bossLevels: 10,
  reviewLevels: 15,
  finalExamPassPercent: 80,

  // Challenges per lesson
  minChallengesPerLesson: 5,
  maxChallengesPerLesson: 10,

  // Code display
  maxCodeLinesOnMobile: 8,
  maxTypingLinesOnMobile: 2,
  targetSolveTimeSeconds: { min: 15, max: 45 },
} as const;

export default GameConfig;
