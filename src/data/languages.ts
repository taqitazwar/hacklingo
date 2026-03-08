/**
 * Registry of all supported and coming-soon languages.
 * Add a new language object here when it's ready.
 */
import { Language } from '../types';
import pythonLanguage from './curriculum/python';

const comingSoonLanguages: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'The language of the web. Build interactive websites and apps.',
    icon: '🟨',
    status: 'coming_soon',
    sections: [],
  },
  {
    id: 'sql',
    name: 'SQL',
    description: 'Query and manage databases. Essential for every developer.',
    icon: '🗄️',
    status: 'coming_soon',
    sections: [],
  },
  {
    id: 'go',
    name: 'Go',
    description: 'Fast, simple systems language built by Google.',
    icon: '🔵',
    status: 'coming_soon',
    sections: [],
  },
  {
    id: 'rust',
    name: 'Rust',
    description: 'Systems programming with memory safety and blazing speed.',
    icon: '🦀',
    status: 'coming_soon',
    sections: [],
  },
];

const allLanguages: Language[] = [pythonLanguage, ...comingSoonLanguages];

export { pythonLanguage, comingSoonLanguages };
export default allLanguages;
