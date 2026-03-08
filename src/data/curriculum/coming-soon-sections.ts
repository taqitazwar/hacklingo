/**
 * Stub sections for the course path map.
 * These show as locked "coming soon" nodes on the map.
 */
import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const comingSoonSections: CourseSection[] = [
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
