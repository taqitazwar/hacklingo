import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const functionsSection: CourseSection = {
  id: 'functions',
  title: 'Functions',
  description: 'Write reusable code with parameters, return values, and scope.',
  accentColor: Colors.section5,
  order: 5,
  lessons: [
    {
      id: 'func-intro',
      sectionId: 'functions',
      title: 'Defining Functions',
      description: 'Write your first reusable function.',
      lessonType: 'standard',
      order: 1,
      completionXpBonus: 14,
      challenges: [
        {
          id: 'fn-1-1',
          type: 'MULTIPLE_CHOICE',
          instruction: 'Which keyword defines a function in Python?',
          difficulty: 'easy',
          question: 'Which keyword defines a function in Python?',
          options: ['func', 'function', 'def', 'define'],
          correctAnswer: 'def',
          explanation: 'Python uses "def" to define a function. e.g., def greet(): ...',
          hint: 'Think of it as short for "define".',
        },
        {
          id: 'fn-1-2',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this print?',
          difficulty: 'easy',
          code: 'def say_hi():\n    print("Hi!")\n\nsay_hi()',
          options: ['say_hi()', 'nothing', 'Hi!', 'Error'],
          correctAnswer: 'Hi!',
          explanation: 'The function is called with say_hi(). The body runs and prints "Hi!".',
          hint: 'Functions only run when called.',
        },
        {
          id: 'fn-1-3',
          type: 'FIX_BUG',
          instruction: 'Fix the function definition',
          difficulty: 'easy',
          buggyCode: 'def greet()\n    print("Hello")',
          bugLineIndex: 0,
          options: ['def greet():', 'def greet() {', 'function greet():', 'define greet():'],
          correctAnswer: 'def greet():',
          explanation: 'Function definitions need a colon at the end, just like if statements.',
          hint: 'All block headers in Python end with a colon.',
        },
        {
          id: 'fn-1-4',
          type: 'FILL_BLANK',
          instruction: 'Call the function named "start"',
          difficulty: 'easy',
          codeWithBlank: 'def start():\n    print("Go!")\n\n___()',
          options: ['start', 'run', 'call', 'exec'],
          correctAnswer: 'start',
          explanation: 'You call a function by writing its name followed by parentheses.',
        },
        {
          id: 'fn-1-5',
          type: 'PREDICT_OUTPUT',
          instruction: 'How many times is "ping" printed?',
          difficulty: 'easy',
          code: 'def ping():\n    print("ping")\n\nping()\nping()\nping()',
          options: ['0', '1', '3', 'Error'],
          correctAnswer: '3',
          explanation: 'ping() is called 3 times, so "ping" is printed 3 times.',
        },
      ],
    },
  ],
};

export default functionsSection;
