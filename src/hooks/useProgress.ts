import { useMemo } from 'react';
import { useProgressStore } from '../store/progressStore';

export function useProgress() {
  const { progress } = useProgressStore();

  const stats = useMemo(() => {
    const completedLessons = Object.keys(progress.completedLessons).length;
    const totalXP = progress.totalXP;
    const streak = progress.streak;

    return {
      completedLessons,
      totalXP,
      streak,
      currentLesson: progress.currentLesson,
      unlockedLessons: progress.unlockedLessons,
    };
  }, [progress]);

  return stats;
}
