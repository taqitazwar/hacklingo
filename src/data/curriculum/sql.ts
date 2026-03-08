import { Language } from '../../types';
import { Colors } from '../../constants';

const sqlSection1 = {
  id: 'sql-select',
  title: 'SELECT Basics',
  description: 'Query data with SELECT, WHERE, and ORDER BY.',
  accentColor: Colors.blue,
  order: 1,
  lessons: [
    {
      id: 'sql-select-intro',
      sectionId: 'sql-select',
      title: 'SELECT & FROM',
      description: 'Retrieve data from a table.',
      lessonType: 'standard' as const,
      order: 1,
      completionXpBonus: 12,
      challenges: [
        {
          id: 'sql-s-1',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'Which clause retrieves all columns?',
          difficulty: 'easy' as const,
          question: 'Which SQL query selects all columns from a table named users?',
          options: [
            'GET * FROM users',
            'SELECT * FROM users',
            'FETCH ALL FROM users',
            'READ * users',
          ],
          correctAnswer: 'SELECT * FROM users',
          explanation: 'SELECT * FROM table_name retrieves all columns. The * wildcard means "all columns".',
        },
        {
          id: 'sql-s-2',
          type: 'FILL_BLANK' as const,
          instruction: 'Select only the name column',
          difficulty: 'easy' as const,
          codeWithBlank: 'SELECT ___ FROM employees;',
          options: ['name', '*', 'ALL', 'column'],
          correctAnswer: 'name',
          explanation: 'List specific column names after SELECT to retrieve only those columns.',
        },
        {
          id: 'sql-s-3',
          type: 'FILL_BLANK' as const,
          instruction: 'Filter rows with a condition',
          difficulty: 'easy' as const,
          codeWithBlank: 'SELECT * FROM products ___ price > 100;',
          options: ['WHERE', 'WHEN', 'IF', 'HAVING'],
          correctAnswer: 'WHERE',
          explanation: 'WHERE filters rows based on a condition. Only rows where the condition is true are returned.',
        },
        {
          id: 'sql-s-4',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'Which clause sorts results?',
          difficulty: 'easy' as const,
          question: 'Which clause sorts query results in SQL?',
          options: ['SORT BY', 'ORDER BY', 'ARRANGE BY', 'RANK BY'],
          correctAnswer: 'ORDER BY',
          explanation: 'ORDER BY sorts results. Add ASC for ascending (default) or DESC for descending.',
        },
        {
          id: 'sql-s-5',
          type: 'FIX_BUG' as const,
          instruction: 'Fix the SQL query',
          difficulty: 'medium' as const,
          buggyCode: 'SELECT name, age\nFROM users\nWHERE age > 18\nORDER age DESC;',
          bugLineIndex: 3,
          options: [
            'ORDER BY age DESC;',
            'ORDER BY age;',
            'SORT BY age DESC;',
            'ORDER age ASC;',
          ],
          correctAnswer: 'ORDER BY age DESC;',
          explanation: 'The correct keyword is ORDER BY, not just ORDER. The BY is required.',
        },
      ],
    },
  ],
};

const sqlSection2 = {
  id: 'sql-joins',
  title: 'Joins',
  description: 'Combine data from multiple tables with JOINs.',
  accentColor: Colors.teal,
  order: 2,
  lessons: [
    {
      id: 'sql-joins-intro',
      sectionId: 'sql-joins',
      title: 'INNER JOIN',
      description: 'Combine rows from two tables on a matching key.',
      lessonType: 'standard' as const,
      order: 1,
      completionXpBonus: 14,
      challenges: [
        {
          id: 'sql-j-1',
          type: 'MULTIPLE_CHOICE' as const,
          instruction: 'What does INNER JOIN return?',
          difficulty: 'easy' as const,
          question: 'What rows does an INNER JOIN return?',
          options: [
            'All rows from the left table',
            'All rows from both tables',
            'Only rows with matching values in both tables',
            'Rows with no match in either table',
          ],
          correctAnswer: 'Only rows with matching values in both tables',
          explanation: 'INNER JOIN returns rows where the join condition is true in both tables.',
        },
        {
          id: 'sql-j-2',
          type: 'FILL_BLANK' as const,
          instruction: 'Complete the JOIN query',
          difficulty: 'medium' as const,
          codeWithBlank: 'SELECT o.id, u.name\nFROM orders o\n___ JOIN users u ON o.user_id = u.id;',
          options: ['INNER', 'OUTER', 'LEFT', 'CROSS'],
          correctAnswer: 'INNER',
          explanation: 'INNER JOIN is the most common join type. It returns only matching rows from both tables.',
        },
      ],
    },
  ],
};

const sqlSection3 = {
  id: 'sql-aggregates',
  title: 'Aggregates',
  description: 'COUNT, SUM, AVG, GROUP BY, and HAVING.',
  accentColor: Colors.orange,
  order: 3,
  lessons: [],
};

const sqlLanguage: Language = {
  id: 'sql',
  name: 'SQL',
  description: 'Query and manage databases. Essential for every developer.',
  icon: '🗄️',
  status: 'coming_soon',
  sections: [sqlSection1, sqlSection2, sqlSection3],
};

export default sqlLanguage;
