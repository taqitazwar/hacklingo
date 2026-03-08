import { Language } from '../../types';
import { Colors } from '../../constants';

const goSection1 = {
  id: 'go-basics',
  title: 'Go Basics',
  description: 'Variables, types, and the main function.',
  accentColor: Colors.blue,
  order: 1,
  lessons: [
    {
      id: 'go-variables',
      sectionId: 'go-basics',
      title: 'Variables & Types',
      description: 'Declare variables with := and var.',
      lessonType: 'standard' as const,
      order: 1,
      completionXpBonus: 12,
      challenges: [
        {
          id: 'go-v-1',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'Which operator declares and assigns a variable in Go?',
          difficulty: 'easy' as const,
          question: 'Which operator declares and assigns a variable in Go without an explicit type?',
          options: ['=', ':=', '==', '->'],
          correctAnswer: ':=',
          explanation: 'The short variable declaration := infers the type from the value. var x int = 5 is the explicit form.',
        },
      ],
    },
  ],
};

const goSection2 = {
  id: 'go-functions',
  title: 'Functions & Errors',
  description: 'Multiple return values and error handling.',
  accentColor: Colors.teal,
  order: 2,
  lessons: [],
};

const goSection3 = {
  id: 'go-structs',
  title: 'Structs & Interfaces',
  description: 'Go\'s approach to object-oriented programming.',
  accentColor: Colors.orange,
  order: 3,
  lessons: [],
};

const goSection4 = {
  id: 'go-concurrency',
  title: 'Goroutines',
  description: 'Concurrency with goroutines and channels.',
  accentColor: Colors.brandRed,
  order: 4,
  lessons: [],
};

const goLanguage: Language = {
  id: 'go',
  name: 'Go',
  description: 'Fast, simple systems language built by Google.',
  icon: '🔵',
  status: 'coming_soon',
  sections: [goSection1, goSection2, goSection3, goSection4],
};

export default goLanguage;
