import { Clipboard, Share } from 'react-native';

export async function copyToClipboard(text: string): Promise<void> {
  Clipboard.setString(text);
}

export async function shareText(title: string, message: string): Promise<void> {
  try {
    await Share.share({ title, message });
  } catch (error) {
    console.error('Share failed:', error);
  }
}

export function formatForShare(username: string, xp: number, streak: number): string {
  return `I'm learning to code with HackLingo!
🏆 ${xp} XP | 🔥 ${streak} day streak
Follow @${username}`;
}
