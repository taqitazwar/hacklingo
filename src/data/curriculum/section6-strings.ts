import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const stringsAdvancedSection: CourseSection = {
  id: 'strings-advanced',
  title: 'Strings & Formatting',
  description: 'f-strings, methods, split, join, and text parsing.',
  accentColor: Colors.section6,
  order: 6,
  lessons: [
    {
      id: 'str-fstrings',
      sectionId: 'strings-advanced',
      title: 'f-Strings',
      description: 'Embed variables directly inside strings.',
      lessonType: 'standard',
      order: 1,
      completionXpBonus: 14,
      challenges: [
        {
          id: 'fs-1-1',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this print?',
          difficulty: 'easy',
          code: 'name = "Bug"\nprint(f"Hello, {name}!")',
          options: ['{name}', 'Hello, Bug!', 'Hello, {name}!', 'Error'],
          correctAnswer: 'Hello, Bug!',
          explanation: 'f-strings evaluate expressions inside {}. {name} is replaced with the value of name.',
          hint: 'Variables inside {} are replaced with their values.',
        },
        {
          id: 'fs-1-2',
          type: 'FILL_BLANK',
          instruction: 'Complete the f-string prefix',
          difficulty: 'easy',
          codeWithBlank: 'msg = ___"Score: {score}"',
          options: ['f', 'b', 'r', 's'],
          correctAnswer: 'f',
          explanation: 'f before the quote creates an f-string that can embed expressions.',
        },
        {
          id: 'fs-1-3',
          type: 'PREDICT_OUTPUT',
          instruction: 'What is printed?',
          difficulty: 'medium',
          code: 'a = 5\nb = 3\nprint(f"{a} + {b} = {a + b}")',
          options: ['a + b = a + b', '5 + 3 = 8', '{a} + {b} = {a + b}', 'Error'],
          correctAnswer: '5 + 3 = 8',
          explanation: 'f-strings can contain any expression in {}, including arithmetic.',
        },
        {
          id: 'fs-1-4',
          type: 'MULTIPLE_CHOICE',
          instruction: 'Which is an f-string?',
          difficulty: 'easy',
          question: 'Which is a valid f-string?',
          options: ['format("Hello {name}")', 'f"Hello {name}"', '"Hello " + name', '"Hello f{name}"'],
          correctAnswer: 'f"Hello {name}"',
          explanation: 'f-strings start with f before the opening quote: f"...".',
        },
        {
          id: 'fs-1-5',
          type: 'FIX_BUG',
          instruction: 'Fix the f-string',
          difficulty: 'easy',
          buggyCode: 'score = 95\nprint("Your score: {score}")',
          bugLineIndex: 1,
          options: [
            'print(f"Your score: {score}")',
            'print(f"Your score: score")',
            'print("Your score: " + score)',
            'print(f"Your score: (score)")',
          ],
          correctAnswer: 'print(f"Your score: {score}")',
          explanation: 'Without the f prefix, {score} is treated as literal text, not a variable.',
        },
      ],
    },
  ],
};

export default stringsAdvancedSection;
