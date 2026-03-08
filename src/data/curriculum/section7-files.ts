import { CourseSection } from '../../types';
import { Colors } from '../../constants';

const filesSection: CourseSection = {
  id: 'files-automation',
  title: 'Files & Automation',
  description: 'Read, write files. Automate tasks with Python.',
  accentColor: Colors.section7,
  order: 7,
  lessons: [
    {
      id: 'file-reading',
      sectionId: 'files-automation',
      title: 'Reading Files',
      description: 'Open and read text files in Python.',
      lessonType: 'standard',
      order: 1,
      completionXpBonus: 16,
      challenges: [
        {
          id: 'fl-1-1',
          type: 'MULTIPLE_CHOICE',
          instruction: 'Which function opens a file in Python?',
          difficulty: 'easy',
          question: 'Which function opens a file in Python?',
          options: ['read()', 'open()', 'file()', 'load()'],
          correctAnswer: 'open()',
          explanation: 'open() opens a file and returns a file object. You can then read or write it.',
          hint: 'Think of what you do before you read.',
        },
        {
          id: 'fl-1-2',
          type: 'PREDICT_OUTPUT',
          instruction: 'What does this code do?',
          difficulty: 'easy',
          code: 'with open("data.txt", "r") as f:\n    content = f.read()\nprint(type(content))',
          options: ["<class 'file'>", "<class 'str'>", "<class 'bytes'>", 'Error'],
          correctAnswer: "<class 'str'>",
          explanation: 'f.read() returns the entire file content as a string.',
          hint: 'read() returns text.',
        },
      ],
    },
  ],
};

export default filesSection;
