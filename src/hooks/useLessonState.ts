import { useState, useCallback } from 'react';

type LessonPhase = 'intro' | 'challenge' | 'feedback' | 'complete';

interface LessonStateOptions {
  totalChallenges: number;
  onComplete: (result: { score: number; correct: number }) => void;
}

export function useLessonState({ totalChallenges, onComplete }: LessonStateOptions) {
  const [phase, setPhase] = useState<LessonPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [correct, setCorrect] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    setLastCorrect(isCorrect);
    if (isCorrect) setCorrect(c => c + 1);
    else setHearts(h => Math.max(0, h - 1));
    setPhase('feedback');
  }, []);

  const advance = useCallback(() => {
    if (currentIndex + 1 >= totalChallenges) {
      setPhase('complete');
      onComplete({ score: Math.round((correct / totalChallenges) * 100), correct });
    } else {
      setCurrentIndex(i => i + 1);
      setPhase('challenge');
      setLastCorrect(null);
    }
  }, [currentIndex, totalChallenges, correct, onComplete]);

  const start = useCallback(() => setPhase('challenge'), []);

  return { phase, currentIndex, hearts, correct, lastCorrect, handleAnswer, advance, start };
}
