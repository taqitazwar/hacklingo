import { useCallback, useRef } from 'react';

type SoundEffect = 'correct' | 'incorrect' | 'complete' | 'levelup' | 'click';

const SOUND_FILES: Record<SoundEffect, string> = {
  correct: 'correct.mp3',
  incorrect: 'incorrect.mp3',
  complete: 'complete.mp3',
  levelup: 'levelup.mp3',
  click: 'click.mp3',
};

export function useSound() {
  const enabled = useRef(true);

  const play = useCallback(async (effect: SoundEffect) => {
    if (!enabled.current) return;
    // Sound playback would be implemented with expo-av
    // Placeholder for future implementation
    console.log(`[Sound] Playing: ${SOUND_FILES[effect]}`);
  }, []);

  const toggleSound = useCallback(() => {
    enabled.current = !enabled.current;
  }, []);

  return { play, toggleSound, enabled: enabled.current };
}
