import type React from "react";
import { useEffect, useRef } from "react";

/**
 * Schedule a callback after a delay; runs once when deps change (debounced resize).
 *
 * @param callback - Function to run after delayMs when deps or delayMs change.
 * @param delayMs - Delay in milliseconds before running callback.
 * @param deps - Dependency list; when it or delayMs change, the timer is rescheduled.
 * @returns void.
 */
export function useDebouncedResize(
  callback: () => void,
  delayMs: number,
  deps: React.DependencyList,
): void {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const run = () => {
      timeoutRef.current = null;
      cbRef.current();
    };
    const schedule = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(run, delayMs);
    };
    schedule();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [...deps, delayMs]);
}
