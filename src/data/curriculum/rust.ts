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
        {
          id: 'rs-v-4',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'What is the difference between const and let?',
          difficulty: 'medium' as const,
          question: 'What is a key difference between const and let in Rust?',
          options: [
            'const can be mutable, let cannot',
            'const requires a type annotation and is always immutable',
            'let can only store integers',
            'const is only for global scope',
          ],
          correctAnswer: 'const requires a type annotation and is always immutable',
          explanation: 'const NUM: i32 = 42; requires the type. const cannot use mut. It can be defined in any scope.',
        },
        {
          id: 'rs-v-5',
          type: 'FIX_BUG' as const,
          instruction: 'Fix the mutable variable error',
          difficulty: 'medium' as const,
          buggyCode: 'fn main() {\n    let score = 0;\n    score = 10;\n    println!("{}", score);\n}',
          bugLineIndex: 1,
          options: [
            '    let mut score = 0;',
            '    var score = 0;',
            '    mutable score = 0;',
            '    let score = mut 0;',
          ],
          correctAnswer: '    let mut score = 0;',
          explanation: 'Add mut after let to make the variable mutable. Without it, Rust will not allow reassignment.',
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
  lessons: [
    {
      id: 'rust-ownership-basics',
      sectionId: 'rust-ownership',
      title: 'Ownership Rules',
      description: 'Every value has one owner at a time.',
      lessonType: 'standard' as const,
      order: 1,
      completionXpBonus: 16,
      challenges: [
        {
          id: 'rs-own-1',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'How many owners can a value have in Rust?',
          difficulty: 'easy' as const,
          question: 'How many owners can a Rust value have at any given time?',
          options: ['Unlimited', 'Two', 'One', 'Zero'],
          correctAnswer: 'One',
          explanation: 'Each value in Rust has exactly one owner. When the owner goes out of scope, the value is dropped.',
        },
        {
          id: 'rs-own-2',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'What is "move semantics"?',
          difficulty: 'medium' as const,
          question: 'What happens when you assign a heap-allocated value to another variable in Rust?',
          options: [
            'Both variables can use the value',
            'The value is copied for each variable',
            'Ownership moves to the new variable; the old one is invalid',
            'The value is garbage collected',
          ],
          correctAnswer: 'Ownership moves to the new variable; the old one is invalid',
          explanation: 'When ownership moves, the old binding is invalidated. Using it would cause a compile error.',
        },
        {
          id: 'rs-own-3',
          type: 'FILL_BLANK' as const,
          instruction: 'Borrow a reference instead of moving',
          difficulty: 'medium' as const,
          codeWithBlank: 'fn print_len(s: ___String) {\n    println!("{}", s.len());\n}',
          options: ['&', '*', 'ref ', 'borrow '],
          correctAnswer: '&',
          explanation: '& creates a reference. fn print_len(s: &String) borrows the String without taking ownership.',
        },
        {
          id: 'rs-own-4',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'How many mutable references can exist at once?',
          difficulty: 'hard' as const,
          question: 'How many mutable references to the same data can exist at the same time in Rust?',
          options: ['Unlimited', 'Two', 'One', 'Zero'],
          correctAnswer: 'One',
          explanation: 'Rust prevents data races at compile time: you can have one mutable reference OR any number of immutable ones, but not both.',
        },
        {
          id: 'rs-own-5',
          type: 'FIX_BUG' as const,
          instruction: 'Fix the use-after-move error',
          difficulty: 'hard' as const,
          buggyCode: 'let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);',
          bugLineIndex: 2,
          options: [
            'println!("{}", s2);',
            'println!("{}", &s1);',
            'let s2 = s1.clone(); println!("{}", s1);',
            'println!("{}", *s1);',
          ],
          correctAnswer: 'println!("{}", s2);',
          explanation: 'After let s2 = s1, ownership moves to s2. Use s2 instead, or clone s1 first to keep both.',
        },
      ],
    },
  ],
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
