import { useProgressStore } from '../store';

/**
 * Returns streak-related state and helpers.
 */
export function useStreak() {
  const { currentStreak, longestStreak, lastActivityDate } = useProgressStore();

  const isStreakActive = (() => {
    if (!lastActivityDate) return false;
    const last = new Date(lastActivityDate);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const sameDay =
      last.getFullYear() === today.getFullYear() &&
      last.getMonth() === today.getMonth() &&
      last.getDate() === today.getDate();

    const wasYesterday =
      last.getFullYear() === yesterday.getFullYear() &&
      last.getMonth() === yesterday.getMonth() &&
      last.getDate() === yesterday.getDate();

    return sameDay || wasYesterday;
  })();

  const streakAtRisk = (() => {
    if (!lastActivityDate) return false;
    const last = new Date(lastActivityDate);
    const today = new Date();
    return (
      last.getDate() !== today.getDate() &&
      isStreakActive
    );
  })();

  return {
    currentStreak,
    longestStreak,
    isStreakActive,
    streakAtRisk,
    lastActivityDate,
  };
}
