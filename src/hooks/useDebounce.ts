import { useRef, useCallback } from 'react';

export const useDebounce = (callback: Function, interval = 0) => {
  const prevTimeoutIdRef = useRef(0);

  return useCallback(
    (...args: any) => {
      clearTimeout(prevTimeoutIdRef.current);
      prevTimeoutIdRef.current = setTimeout(() => {
        clearTimeout(prevTimeoutIdRef.current);
        callback(...args);
      }, interval);
    },
    [callback, interval]
  );
};
