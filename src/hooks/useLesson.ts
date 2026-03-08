import { useState, useCallback } from 'react';
import { Challenge } from '../types';

type AnswerResult = 'correct' | 'incorrect' | 'unanswered';

interface UseLessonReturn {
  currentChallengeIndex: number;
  currentChallenge: Challenge;
  selectedAnswer: string | string[] | null;
  answerResult: AnswerResult;
  mistakeCount: number;
  correctCount: number;
  isLessonComplete: boolean;
  selectAnswer: (answer: string | string[]) => void;
  submitAnswer: () => boolean;
  nextChallenge: () => void;
  getAccuracyPercent: () => number;
}

const useLesson = (challenges: Challenge[]): UseLessonReturn => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResult>('unanswered');
  const [mistakeCount, setMistakeCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);

  const currentChallenge = challenges[currentChallengeIndex];

  const selectAnswer = useCallback((answer: string | string[]) => {
    // Allow updating a reorder answer even after first placement
    if (answerResult !== 'unanswered') return;
    setSelectedAnswer(answer);
  }, [answerResult]);

  const checkAnswer = (challenge: Challenge, answer: string | string[]): boolean => {
    if (challenge.type === 'REORDER_BLOCKS') {
      const correctOrder = challenge.correctOrder;
      const userOrder = answer as string[];
      return (
        userOrder.length === correctOrder.length &&
        userOrder.every((block, i) => block === correctOrder[i])
      );
    }
    return answer === (challenge as any).correctAnswer;
  };

  const submitAnswer = useCallback((): boolean => {
    if (!selectedAnswer) return false;

    const isCorrect = checkAnswer(currentChallenge, selectedAnswer);

    if (isCorrect) {
      setAnswerResult('correct');
      setCorrectCount(prev => prev + 1);
    } else {
      setAnswerResult('incorrect');
      setMistakeCount(prev => prev + 1);
    }

    return isCorrect;
  }, [selectedAnswer, currentChallenge]);

  const nextChallenge = useCallback(() => {
    const nextIndex = currentChallengeIndex + 1;

    if (nextIndex >= challenges.length) {
      setIsLessonComplete(true);
    } else {
      setCurrentChallengeIndex(nextIndex);
      setSelectedAnswer(null);
      setAnswerResult('unanswered');
    }
  }, [currentChallengeIndex, challenges.length]);

  const getAccuracyPercent = useCallback((): number => {
    const total = correctCount + mistakeCount;
    if (total === 0) return 100;
    return Math.round((correctCount / total) * 100);
  }, [correctCount, mistakeCount]);

  return {
    currentChallengeIndex,
    currentChallenge,
    selectedAnswer,
    answerResult,
    mistakeCount,
    correctCount,
    isLessonComplete,
    selectAnswer,
    submitAnswer,
    nextChallenge,
    getAccuracyPercent,
  };
};

export default useLesson;
