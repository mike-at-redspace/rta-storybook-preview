import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks the size of the container for scale/fit: parent element, or the ref element when parent has no size.
 * Uses ResizeObserver on both so fit and zoom recalculate when layout changes.
 *
 * @returns Object with: containerRef (attach to the stage div), containerSize (width and height),
 *   updateSize (measure immediately).
 */
export function useContainerSize(): {
  containerRef: React.RefObject<HTMLDivElement | null>;
  containerSize: { width: number; height: number };
  updateSize: () => void;
} {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const parent = el.parentElement;
    const w = parent ? parent.clientWidth : 0;
    const h = parent ? parent.clientHeight : 0;
    if (w > 0 && h > 0) {
      setContainerSize({ width: w, height: h });
      return;
    }
    setContainerSize({ width: el.clientWidth, height: el.clientHeight });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const parent = el.parentElement;
    const observer = new ResizeObserver(() => updateSize());
    if (parent) observer.observe(parent);
    observer.observe(el);
    updateSize();
    return () => observer.disconnect();
  }, [updateSize]);

  return { containerRef, containerSize, updateSize };
}
