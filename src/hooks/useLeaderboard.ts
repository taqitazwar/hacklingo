import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  level: number;
  isCurrentUser?: boolean;
}

const MOCK_DATA: LeaderboardEntry[] = [
  { rank: 1, name: 'ProCoder42', xp: 15200, streak: 45, level: 22 },
  { rank: 2, name: 'pythonista', xp: 12800, streak: 30, level: 19 },
  { rank: 3, name: 'coder_dev', xp: 9400, streak: 7, level: 15, isCurrentUser: true },
  { rank: 4, name: 'devguru', xp: 8100, streak: 21, level: 13 },
  { rank: 5, name: 'hackmaster', xp: 7500, streak: 14, level: 12 },
];

export function useLeaderboard(timeframe: 'daily' | 'weekly' | 'alltime' = 'weekly') {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [timeframe]);

  return { data, loading };
}
