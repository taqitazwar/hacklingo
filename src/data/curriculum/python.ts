/**
 * Assembles the full Python language course from all sections.
 */
import { Language } from '../../types';
import section1 from './section1-basics';
import section2 from './section2-control-flow';
import section3 from './section3-lists';
import section4 from './section4-dictionaries';
import comingSoonSections from './coming-soon-sections';

const pythonLanguage: Language = {
  id: 'python',
  name: 'Python',
  description: 'The most beginner-friendly language. Used in data science, automation, and web backends.',
  icon: '🐍',
  status: 'available',
  sections: [section1, section2, section3, section4, ...comingSoonSections],
};

export default pythonLanguage;
