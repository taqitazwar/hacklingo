import { useState, useCallback } from 'react';

interface UseModalReturn {
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialVisible = false): UseModalReturn {
  const [visible, setVisible] = useState(initialVisible);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible(v => !v), []);
  return { visible, open, close, toggle };
}
