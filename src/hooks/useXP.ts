import { useCallback } from 'react';
import { useProgressStore } from '../store/progressStore';
import { getLevelFromXP, getXPForNextLevel } from '../constants/xp';

export function useXP() {
  const { progress } = useProgressStore();
  const totalXP = progress.totalXP;

  const level = getLevelFromXP(totalXP);
  const nextLevelXP = getXPForNextLevel(totalXP);
  const xpToNextLevel = nextLevelXP - totalXP;
  const levelProgress = totalXP / nextLevelXP;

  return {
    totalXP,
    level,
    nextLevelXP,
    xpToNextLevel,
    levelProgress: Math.min(1, levelProgress),
  };
}
