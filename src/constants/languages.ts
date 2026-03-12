export const SUPPORTED_LANGUAGES = ['python', 'javascript', 'sql', 'go', 'rust'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

export const LANGUAGE_META: Record<SupportedLanguage, {
  displayName: string;
  color: string;
  icon: string;
  tagline: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}> = {
  python: {
    displayName: 'Python',
    color: '#3776AB',
    icon: '🐍',
    tagline: 'Simple and powerful',
    difficulty: 'beginner',
  },
  javascript: {
    displayName: 'JavaScript',
    color: '#F7DF1E',
    icon: '⚡',
    tagline: 'The language of the web',
    difficulty: 'beginner',
  },
  sql: {
    displayName: 'SQL',
    color: '#336791',
    icon: '🗄️',
    tagline: 'Query databases like a pro',
    difficulty: 'beginner',
  },
  go: {
    displayName: 'Go',
    color: '#00ACD7',
    icon: '🐹',
    tagline: 'Fast, simple, reliable',
    difficulty: 'intermediate',
  },
  rust: {
    displayName: 'Rust',
    color: '#CE422B',
    icon: '⚙️',
    tagline: 'Blazingly fast and safe',
    difficulty: 'advanced',
  },
};
