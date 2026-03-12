export const LANGUAGE_EMOJIS: Record<string, string> = {
  python: '🐍',
  javascript: '⚡',
  sql: '🗄️',
  go: '🐹',
  rust: '⚙️',
};

export const MOOD_EMOJIS = {
  happy: '😊',
  excited: '🎉',
  thinking: '🤔',
  sad: '😔',
  proud: '💪',
  fire: '🔥',
};

export function getDifficultyEmoji(difficulty: 'easy' | 'medium' | 'hard'): string {
  return { easy: '⭐', medium: '⭐⭐', hard: '⭐⭐⭐' }[difficulty];
}

export function getXPEmoji(xp: number): string {
  if (xp >= 100) return '💎';
  if (xp >= 50) return '🏆';
  if (xp >= 25) return '⭐';
  return '✨';
}
