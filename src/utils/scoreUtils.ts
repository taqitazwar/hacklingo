export function getLetterGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

export function getScoreMessage(score: number): string {
  if (score === 100) return 'Perfect! Flawless victory!';
  if (score >= 90) return 'Excellent work!';
  if (score >= 75) return 'Great job!';
  if (score >= 60) return 'Good effort!';
  if (score >= 40) return 'Keep practicing!';
  return 'Don't give up, try again!';
}

export function getStarRating(score: number): 1 | 2 | 3 {
  if (score >= 90) return 3;
  if (score >= 70) return 2;
  return 1;
}
