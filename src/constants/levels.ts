export interface LevelConfig {
  level: number;
  title: string;
  minXP: number;
  color: string;
  icon: string;
}

export const LEVEL_CONFIGS: LevelConfig[] = [
  { level: 1, title: 'Newbie', minXP: 0, color: '#9E9E9E', icon: '🥚' },
  { level: 2, title: 'Beginner', minXP: 100, color: '#8BC34A', icon: '🐣' },
  { level: 3, title: 'Learner', minXP: 250, color: '#4CAF50', icon: '🌱' },
  { level: 5, title: 'Coder', minXP: 800, color: '#2196F3', icon: '💻' },
  { level: 8, title: 'Developer', minXP: 2300, color: '#9C27B0', icon: '⚙️' },
  { level: 10, title: 'Expert', minXP: 3800, color: '#FF9800', icon: '🔧' },
  { level: 15, title: 'Architect', minXP: 9300, color: '#F44336', icon: '🏗️' },
  { level: 20, title: 'Legend', minXP: 17300, color: '#FFD700', icon: '👑' },
] as const;

export function getLevelConfig(level: number): LevelConfig {
  return [...LEVEL_CONFIGS].reverse().find(c => level >= c.level) ?? LEVEL_CONFIGS[0];
}
