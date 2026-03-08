/**
 * Stub sections for the course path map.
 * These show as locked "coming soon" nodes on the map.
 */
import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const comingSoonSections: CourseSection[] = [
  {
    id: 'pythonic-thinking',
    title: 'Pythonic Thinking',
    description: 'Comprehensions, generators, lambda, and idiomatic Python.',
    accentColor: Colors.section8,
    order: 8,
    lessons: [],
  },
  {
    id: 'intermediate',
    title: 'Intermediate Python',
    description: 'Modules, error handling, testing, and optimization.',
    accentColor: Colors.section9,
    order: 9,
    lessons: [],
  },
  {
    id: 'mastery',
    title: 'Mastery',
    description: 'Advanced mixed challenges and developer simulation.',
    accentColor: Colors.section10,
    order: 10,
    lessons: [],
  },
];

export default comingSoonSections;
