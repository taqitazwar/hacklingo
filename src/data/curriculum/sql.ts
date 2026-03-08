import { Language } from '../../types';
import { Colors } from '../../constants';

const sqlSection1 = {
  id: 'sql-select',
  title: 'SELECT Basics',
  description: 'Query data with SELECT, WHERE, and ORDER BY.',
  accentColor: Colors.blue,
  order: 1,
  lessons: [],
};

const sqlSection2 = {
  id: 'sql-joins',
  title: 'Joins',
  description: 'Combine data from multiple tables with JOINs.',
  accentColor: Colors.teal,
  order: 2,
  lessons: [],
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
