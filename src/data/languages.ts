/**
 * Registry of all supported and coming-soon languages.
 * Add a new language object here when it's ready.
 */
import { Language } from '../types';
import pythonLanguage from './curriculum/python';
import javascriptLanguage from './curriculum/javascript';
import sqlLanguage from './curriculum/sql';
import goLanguage from './curriculum/go';
import rustLanguage from './curriculum/rust';

const comingSoonLanguages: Language[] = [
  javascriptLanguage,
  sqlLanguage,
  goLanguage,
  rustLanguage,
];

const allLanguages: Language[] = [pythonLanguage, ...comingSoonLanguages];

export { pythonLanguage, comingSoonLanguages };
export default allLanguages;
