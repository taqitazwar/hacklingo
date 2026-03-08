import { Challenge } from './challenge';

export type LessonStatus = 'locked' | 'available' | 'completed';
export type LessonType = 'standard' | 'boss' | 'review' | 'final_exam';

export interface Lesson {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  lessonType: LessonType;
  /** One-indexed position within the section */
  order: number;
  challenges: Challenge[];
  /** XP bonus awarded on first completion */
  completionXpBonus: number;
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  /** Hex color accent used for this section's nodes on the course map */
  accentColor: string;
  /** One-indexed position in the overall course */
  order: number;
  lessons: Lesson[];
}

export type LanguageStatus = 'available' | 'coming_soon';

export interface Language {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: LanguageStatus;
  sections: CourseSection[];
}
