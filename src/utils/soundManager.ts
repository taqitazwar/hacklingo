/**
 * Sound effect management for challenge feedback.
 * Placeholder — integrate expo-av or expo-audio when needed.
 */

export type SoundType = 'correct' | 'wrong' | 'complete' | 'levelUp' | 'heartLost';

const SOUND_ENABLED_DEFAULT = true;

let soundEnabled = SOUND_ENABLED_DEFAULT;

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

/**
 * Play a sound effect by type.
 * Currently a no-op — wire up expo-av here when audio assets are added.
 */
export async function playSound(type: SoundType): Promise<void> {
  if (!soundEnabled) return;
  // TODO: implement with expo-av
  // const sound = await Audio.Sound.createAsync(SOUND_MAP[type]);
  // await sound.sound.playAsync();
}
