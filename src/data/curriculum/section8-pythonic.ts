import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const pythonicSection: CourseSection = {
  id: 'pythonic-thinking',
  title: 'Pythonic Thinking',
  description: 'Comprehensions, generators, lambda, and idiomatic Python.',
  accentColor: Colors.section8,
  order: 8,
  lessons: [
    {
      id: 'py-comprehensions',
      sectionId: 'pythonic-thinking',
      title: 'List Comprehensions',
      description: 'Write concise list transformations.',
      lessonType: 'standard',
      order: 1,
      completionXpBonus: 18,
      challenges: [
        {
          id: 'py-1-1',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this list comprehension produce?',
          difficulty: 'medium',
          code: 'squares = [x**2 for x in range(1, 5)]\nprint(squares)',
          options: ['[1, 4, 9, 16]', '[1, 2, 3, 4]', '[2, 4, 6, 8]', 'Error'],
          correctAnswer: '[1, 4, 9, 16]',
          explanation: 'The comprehension squares each x in range(1, 5) = [1, 2, 3, 4].',
          hint: 'Each element is x squared.',
        },
        {
          id: 'py-1-2',
          type: 'FILL_BLANK',
          instruction: 'Complete the list comprehension to double each number',
          difficulty: 'medium',
          codeWithBlank: 'nums = [1, 2, 3]\ndoubled = [___ for x in nums]',
          options: ['x * 2', 'x + x', 'x ** 2', 'x'],
          correctAnswer: 'x * 2',
          explanation: 'x * 2 doubles each element. The comprehension applies this to every item in nums.',
        },
      ],
    },
  ],
};

export default pythonicSection;
