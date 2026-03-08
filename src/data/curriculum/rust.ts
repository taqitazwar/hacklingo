import { Language } from '../../types';
import { Colors } from '../../constants';

const rustSection1 = {
  id: 'rust-basics',
  title: 'Rust Basics',
  description: 'Variables, types, and ownership fundamentals.',
  accentColor: Colors.brandRed,
  order: 1,
  lessons: [],
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
