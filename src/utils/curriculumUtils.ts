export function formatLessonId(id: string): string {
  return id.replace(/-/g, ' ').replace(/\w/g, c => c.toUpperCase());
}

export function isBossLesson(lessonId: string): boolean {
  return lessonId.includes('boss');
}

export function getLessonType(lessonId: string): 'boss' | 'regular' {
  return isBossLesson(lessonId) ? 'boss' : 'regular';
}

export function parseLessonId(lessonId: string): { section: string; name: string } {
  const parts = lessonId.split('-');
  return {
    section: parts[0],
    name: parts.slice(1).join('-'),
  };
}
