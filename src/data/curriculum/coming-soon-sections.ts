/**
 * Stub sections for the course path map.
 * These show as locked "coming soon" nodes on the map.
 */
import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const comingSoonSections: CourseSection[] = [
  {
    id: 'functions',
    title: 'Functions',
    description: 'Write reusable code with parameters, return values, and scope.',
    accentColor: Colors.section5,
    order: 5,
    lessons: [],
  },
  {
    id: 'strings-advanced',
    title: 'Strings & Formatting',
    description: 'f-strings, methods, split, join, and text parsing.',
    accentColor: Colors.section6,
    order: 6,
    lessons: [],
  },
  {
    id: 'files-automation',
    title: 'Files & Automation',
    description: 'Read, write files. Automate tasks with Python.',
    accentColor: Colors.section7,
    order: 7,
    lessons: [],
  },
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
