import { Language } from '../../types';
import { Colors } from '../../constants';

const javascriptSection1 = {
  id: 'js-basics',
  title: 'JS Basics',
  description: 'Variables, types, and first steps in JavaScript.',
  accentColor: Colors.yellow,
  order: 1,
  lessons: [],
};

const javascriptSection2 = {
  id: 'js-functions',
  title: 'JS Functions',
  description: 'Arrow functions, callbacks, and closures.',
  accentColor: Colors.orange,
  order: 2,
  lessons: [],
};

const javascriptSection3 = {
  id: 'js-arrays',
  title: 'Arrays & Objects',
  description: 'Work with arrays, objects, and destructuring.',
  accentColor: Colors.blue,
  order: 3,
  lessons: [],
};

const javascriptSection4 = {
  id: 'js-async',
  title: 'Async JS',
  description: 'Promises, async/await, and fetch.',
  accentColor: Colors.teal,
  order: 4,
  lessons: [],
};

const javascriptLanguage: Language = {
  id: 'javascript',
  name: 'JavaScript',
  description: 'The language of the web. Build interactive websites and apps.',
  icon: '🟨',
  status: 'coming_soon',
  sections: [javascriptSection1, javascriptSection2, javascriptSection3, javascriptSection4],
};

export default javascriptLanguage;
