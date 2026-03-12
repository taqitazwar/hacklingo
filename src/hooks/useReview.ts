import { useMemo } from 'react';

interface ReviewItem {
  id: string;
  question: string;
  correct: boolean;
  lesson: string;
}

export function useReview(items: ReviewItem[]) {
  const wrongItems = useMemo(() => items.filter(i => !i.correct), [items]);
  const accuracy = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.round((items.filter(i => i.correct).length / items.length) * 100);
  }, [items]);

  const byLesson = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.lesson]) acc[item.lesson] = { total: 0, correct: 0 };
      acc[item.lesson].total++;
      if (item.correct) acc[item.lesson].correct++;
      return acc;
    }, {} as Record<string, { total: number; correct: number }>);
  }, [items]);

  return { wrongItems, accuracy, byLesson, total: items.length, correctCount: items.length - wrongItems.length };
}
