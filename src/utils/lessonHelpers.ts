import { Lesson, CourseSection } from '../types';

/**
 * Lesson-related utility functions.
 */

export function getLessonById(sections: CourseSection[], lessonId: string): Lesson | null {
  for (const section of sections) {
    const lesson = section.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

export function getSectionForLesson(
  sections: CourseSection[],
  lessonId: string
): CourseSection | null {
  return sections.find((s) => s.lessons.some((l) => l.id === lessonId)) ?? null;
}

export function getNextLesson(sections: CourseSection[], currentLessonId: string): Lesson | null {
  const allLessons = sections.flatMap((s) =>
    s.lessons.sort((a, b) => a.order - b.order)
  );
  const idx = allLessons.findIndex((l) => l.id === currentLessonId);
  return idx >= 0 && idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
}

export function getTotalLessons(sections: CourseSection[]): number {
  return sections.reduce((sum, s) => sum + s.lessons.length, 0);
}

export function getTotalChallenges(sections: CourseSection[]): number {
  return sections.reduce(
    (sum, s) => sum + s.lessons.reduce((ls, l) => ls + l.challenges.length, 0),
    0
  );
}

export function isBossLesson(lesson: Lesson): boolean {
  return lesson.lessonType === 'boss';
}
