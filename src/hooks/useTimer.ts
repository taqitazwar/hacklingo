import { useState, useEffect, useRef } from 'react';

/**
 * A countdown / stopwatch timer hook.
 */
export function useTimer(initialSeconds: number, onExpire?: () => void) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            onExpire?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = (newSeconds?: number) => {
    setIsRunning(false);
    setSeconds(newSeconds ?? initialSeconds);
  };

  const percentage = initialSeconds > 0 ? seconds / initialSeconds : 0;

  return { seconds, isRunning, percentage, start, pause, reset };
}
