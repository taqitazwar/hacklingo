import { Lesson, CourseSection } from '../types';
import pythonLanguage from '../data/curriculum/python';

/**
 * Given a completed lesson, returns the ID of the next lesson to unlock.
 * Traverses sections in order.
 */
const getNextLessonId = (completedLessonId: string): string | null => {
  const sections = pythonLanguage.sections;

  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex];
    const lessonIndex = section.lessons.findIndex(l => l.id === completedLessonId);

    if (lessonIndex === -1) continue;

    // There is a next lesson in the same section
    if (lessonIndex < section.lessons.length - 1) {
      return section.lessons[lessonIndex + 1].id;
    }

    // Move to the first lesson of the next section
    if (sectionIndex < sections.length - 1) {
      const nextSection = sections[sectionIndex + 1];
      if (nextSection.lessons.length > 0) {
        return nextSection.lessons[0].id;
      }
    }

    return null;
  }

  return null;
};

/** Find the section that contains a given lesson ID */
const getSectionForLesson = (lessonId: string): CourseSection | null => {
  for (const section of pythonLanguage.sections) {
    if (section.lessons.some(l => l.id === lessonId)) return section;
  }
  return null;
};

/** Find a lesson by ID across all sections */
const findLesson = (lessonId: string): Lesson | null => {
  for (const section of pythonLanguage.sections) {
    const lesson = section.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
};

/** Calculate XP earned for completing a lesson based on challenge difficulties */
const calculateLessonXp = (lesson: Lesson, accuracy: number): number => {
  const GameConfig = require('../constants/game').default;
  const baseXp = lesson.lessonType === 'boss'
    ? GameConfig.xpPerBossLevel
    : lesson.completionXpBonus;
  const accuracyMultiplier = accuracy / 100;
  return Math.round(baseXp * accuracyMultiplier + GameConfig.xpPerLessonCompletion);
};

export { getNextLessonId, getSectionForLesson, findLesson, calculateLessonXp };
