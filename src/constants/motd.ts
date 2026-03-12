export const MOTIVATIONAL_MESSAGES = [
  "Every expert was once a beginner. Keep going!",
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "The best way to learn to code is to code.",
  "Programming is the art of telling another human what one wants the computer to do.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Talk is cheap. Show me the code.",
  "It's not a bug – it's an undocumented feature.",
  "Simplicity is the soul of efficiency.",
  "The most important property of a program is whether it accomplishes the intention of its user.",
] as const;

export function getRandomMOTD(): string {
  return MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
}
