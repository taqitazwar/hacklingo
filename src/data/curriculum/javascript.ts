import { Language } from '../../types';
import { Colors } from '../../constants';

const javascriptSection1 = {
  id: 'js-basics',
  title: 'JS Basics',
  description: 'Variables, types, and first steps in JavaScript.',
  accentColor: Colors.yellow,
  order: 1,
  lessons: [
    {
      id: 'js-variables',
      sectionId: 'js-basics',
      title: 'Variables',
      description: 'let, const, and var — declaring variables in JS.',
      lessonType: 'standard' as const,
      order: 1,
      completionXpBonus: 10,
      challenges: [
        {
          id: 'js-v-1',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'Which keyword declares a block-scoped variable?',
          difficulty: 'easy' as const,
          question: 'Which keyword declares a block-scoped variable in modern JavaScript?',
          options: ['var', 'let', 'variable', 'def'],
          correctAnswer: 'let',
          explanation: 'let declares block-scoped variables. var is function-scoped and can cause bugs.',
          hint: 'Modern JS uses let and const instead of var.',
        },
        {
          id: 'js-v-2',
          type: 'PREDICT_OUTPUT' as const,
          instruction: 'What is logged?',
          difficulty: 'easy' as const,
          code: 'const name = "Bug";\nconsole.log(name);',
          options: ['name', '"Bug"', 'Bug', 'Error'],
          correctAnswer: 'Bug',
          explanation: 'console.log() prints the value. const declares a constant that cannot be reassigned.',
        },
        {
          id: 'js-v-3',
          type: 'FILL_BLANK' as const,
          instruction: 'Declare a constant',
          difficulty: 'easy' as const,
          codeWithBlank: '___ PI = 3.14;',
          options: ['const', 'let', 'var', 'val'],
          correctAnswer: 'const',
          explanation: 'const declares a variable that cannot be reassigned. Use it for values that should not change.',
        },
        {
          id: 'js-v-4',
          type: 'FIX_BUG' as const,
          instruction: 'Fix the const reassignment',
          difficulty: 'medium' as const,
          buggyCode: 'const x = 5;\nx = 10;\nconsole.log(x);',
          bugLineIndex: 0,
          options: [
            'let x = 5;',
            'var x = 5;',
            'constant x = 5;',
            'define x = 5;',
          ],
          correctAnswer: 'let x = 5;',
          explanation: 'const variables cannot be reassigned. Use let if you need to change the value.',
        },
        {
          id: 'js-v-5',
          type: 'PREDICT_OUTPUT' as const,
          instruction: 'What is the output?',
          difficulty: 'medium' as const,
          code: 'let score = 10;\nscope += 5;\nconsole.log(score);',
          options: ['10', '15', 'Error', 'undefined'],
          correctAnswer: 'Error',
          explanation: 'scope is not defined — it is a typo of "score". This throws a ReferenceError.',
          hint: 'Look carefully at the variable names.',
        },
      ],
    },
  ],
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
