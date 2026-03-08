import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const pythonBasicsSection: CourseSection = {
  id: 'python-basics',
  title: 'Python Basics',
  description: 'Print, variables, numbers, strings, and your first program.',
  accentColor: Colors.section1,
  order: 1,
  lessons: [
    {
      id: 'basics-hello-python',
      sectionId: 'python-basics',
      title: 'Hello Python',
      description: 'Your very first Python program.',
      lessonType: 'standard',
      order: 1,
      completionXpBonus: 10,
      challenges: [
        {
          id: 'hpy-1',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this code print?',
          difficulty: 'easy',
          code: 'print("Hello, World!")',
          options: ['Hello, World!', 'hello, world!', 'Error', '"Hello, World!"'],
          correctAnswer: 'Hello, World!',
          explanation: 'print() outputs text to the screen. The quotes are not included in the output.',
          hint: 'The print() function displays the text inside the quotes.',
        },
        {
          id: 'hpy-2',
          type: 'MULTIPLE_CHOICE',
          instruction: 'Which function is used to display output in Python?',
          difficulty: 'easy',
          question: 'Which function is used to display output in Python?',
          options: ['display()', 'print()', 'show()', 'output()'],
          correctAnswer: 'print()',
          explanation: 'print() is Python\'s built-in function for displaying output.',
          hint: 'Think of what you do with a printer.',
        },
        {
          id: 'hpy-3',
          type: 'FILL_BLANK',
          instruction: 'Complete the code to print "Hello"',
          difficulty: 'easy',
          codeWithBlank: '___("Hello")',
          options: ['print', 'show', 'write', 'display'],
          correctAnswer: 'print',
          explanation: 'print() is the correct function for displaying output in Python.',
        },
        {
          id: 'hpy-4',
          type: 'FIX_BUG',
          instruction: 'Fix the bug in this code',
          difficulty: 'easy',
          buggyCode: 'Print("Hello")',
          bugLineIndex: 0,
          options: ['print("Hello")', 'PRINT("Hello")', 'printing("Hello")', 'prints("Hello")'],
          correctAnswer: 'print("Hello")',
          explanation: 'Python is case-sensitive. The function is print(), not Print().',
          hint: 'Python is case-sensitive — function names must be lowercase.',
        },
        {
          id: 'hpy-5',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this print?',
          difficulty: 'easy',
          code: 'print("Python")\nprint("is fun")',
          options: ['Python is fun', 'Python\nis fun', 'Error', 'is fun'],
          correctAnswer: 'Python\nis fun',
          explanation: 'Each print() call outputs on a new line by default.',
        },
      ],
    },
  ],
};

export default pythonBasicsSection;
