import { LessonSession } from '../types/lesson';
import { getISODate } from './timeUtils';

export function createSession(lessonId: string): LessonSession {
  return {
    lessonId,
    startTime: Date.now(),
    results: [],
    score: 0,
    xpEarned: 0,
    livesLost: 0,
    completed: false,
  };
}

export function completeSession(session: LessonSession, xpEarned: number): LessonSession {
  const correct = session.results.filter(r => r.correct).length;
  const total = session.results.length;
  return {
    ...session,
    endTime: Date.now(),
    score: total > 0 ? Math.round((correct / total) * 100) : 0,
    xpEarned,
    completed: true,
  };
}

export function getSessionDuration(session: LessonSession): number {
  const end = session.endTime ?? Date.now();
  return Math.round((end - session.startTime) / 1000);
}
