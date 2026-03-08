import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const dictionariesSection: CourseSection = {
  id: 'dictionaries',
  title: 'Dictionaries',
  description: 'Key-value pairs, accessing data, and common patterns.',
  accentColor: Colors.section4,
  order: 4,
  lessons: [
    {
      id: 'dict-intro',
      sectionId: 'dictionaries',
      title: 'What is a Dict?',
      description: 'Create your first key-value store.',
      lessonType: 'standard',
      order: 1,
      completionXpBonus: 12,
      challenges: [
        {
          id: 'dict-1-1',
          type: 'MULTIPLE_CHOICE',
          instruction: 'What symbol separates keys from values in a Python dict?',
          difficulty: 'easy',
          question: 'What symbol separates keys from values in a Python dict?',
          options: ['=', '->', ':', '=>'],
          correctAnswer: ':',
          explanation: 'Dictionaries use a colon (:) between the key and value. e.g., {"name": "Bug"}',
          hint: 'Think of it like a label: value relationship.',
        },
        {
          id: 'dict-1-2',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this code print?',
          difficulty: 'easy',
          code: 'bug = {"name": "Bug", "legs": 6}\nprint(bug["name"])',
          options: ['"Bug"', 'Bug', 'name', '6'],
          correctAnswer: 'Bug',
          explanation: 'You access a dictionary value by its key in square brackets. The quotes are not printed.',
          hint: 'Access values with dict[key].',
        },
        {
          id: 'dict-1-3',
          type: 'FILL_BLANK',
          instruction: 'Complete the dict to map "color" to "red"',
          difficulty: 'easy',
          codeWithBlank: 'bug = {"color": ___}',
          options: ['"red"', 'red', '"color"', 'color'],
          correctAnswer: '"red"',
          explanation: 'String values in dicts must be in quotes. {"color": "red"}',
        },
        {
          id: 'dict-1-4',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this print?',
          difficulty: 'easy',
          code: 'scores = {"alice": 95, "bob": 82}\nprint(scores["bob"])',
          options: ['95', '82', 'bob', 'alice'],
          correctAnswer: '82',
          explanation: 'scores["bob"] looks up the value for the key "bob", which is 82.',
          hint: 'Look up the value stored under the key "bob".',
        },
        {
          id: 'dict-1-5',
          type: 'FIX_BUG',
          instruction: 'Fix the bug — the dict syntax is wrong',
          difficulty: 'easy',
          buggyCode: 'person = {"name" = "Bug"}',
          bugLineIndex: 0,
          options: [
            'person = {"name": "Bug"}',
            'person = {"name" == "Bug"}',
            'person = {name: "Bug"}',
            'person = ({"name": "Bug"})',
          ],
          correctAnswer: 'person = {"name": "Bug"}',
          explanation: 'Dict keys and values are separated by : (colon), not = (equals).',
        },
      ],
    },
  ],
};

export default dictionariesSection;
