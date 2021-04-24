import { useCallback, useEffect, useRef } from 'react';

export function useCheckIfMounted() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback((cb: () => void) => {
    if (isMountedRef.current) {
      cb();
    }
  }, []);
}
