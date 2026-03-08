import { Language } from '../../types';
import { Colors } from '../../constants';

const rustSection1 = {
  id: 'rust-basics',
  title: 'Rust Basics',
  description: 'Variables, types, and ownership fundamentals.',
  accentColor: Colors.brandRed,
  order: 1,
  lessons: [
    {
      id: 'rust-variables',
      sectionId: 'rust-basics',
      title: 'Variables & Mutability',
      description: 'let, mut, and const in Rust.',
      lessonType: 'standard' as const,
      order: 1,
      completionXpBonus: 14,
      challenges: [
        {
          id: 'rs-v-1',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'Are Rust variables mutable by default?',
          difficulty: 'easy' as const,
          question: 'What happens when you try to reassign a variable declared with let in Rust?',
          options: [
            'It works fine — let is mutable',
            'You get a compile error — variables are immutable by default',
            'The old value is silently ignored',
            'You get a runtime panic',
          ],
          correctAnswer: 'You get a compile error — variables are immutable by default',
          explanation: 'Rust variables are immutable by default. Use let mut to allow reassignment.',
        },
        {
          id: 'rs-v-2',
          type: 'FILL_BLANK' as const,
          instruction: 'Declare a mutable variable',
          difficulty: 'easy' as const,
          codeWithBlank: 'let ___ count = 0;\ncount += 1;',
          options: ['mut', 'var', 'mutable', 'ref'],
          correctAnswer: 'mut',
          explanation: 'let mut makes a variable mutable. Without mut, Rust prevents reassignment at compile time.',
        },
        {
          id: 'rs-v-3',
          type: 'PREDICT_OUTPUT' as const,
          instruction: 'What does println! print?',
          difficulty: 'easy' as const,
          code: 'let x = 5;\nlet x = x + 1;\nprintln!("{}", x);',
          options: ['5', '6', 'Error', 'x'],
          correctAnswer: '6',
          explanation: 'This is shadowing — the second let creates a new variable that shadows the first. x becomes 6.',
        },
      ],
    },
  ],
};

const rustSection2 = {
  id: 'rust-ownership',
  title: 'Ownership',
  description: 'Rust\'s unique memory management model.',
  accentColor: Colors.orange,
  order: 2,
  lessons: [],
};

const rustSection3 = {
  id: 'rust-structs',
  title: 'Structs & Enums',
  description: 'Custom data types and pattern matching.',
  accentColor: Colors.blue,
  order: 3,
  lessons: [],
};

const rustSection4 = {
  id: 'rust-traits',
  title: 'Traits & Generics',
  description: 'Shared behavior and generic code.',
  accentColor: Colors.teal,
  order: 4,
  lessons: [],
};

const rustLanguage: Language = {
  id: 'rust',
  name: 'Rust',
  description: 'Systems programming with memory safety and blazing speed.',
  icon: '🦀',
  status: 'coming_soon',
  sections: [rustSection1, rustSection2, rustSection3, rustSection4],
};

export default rustLanguage;
