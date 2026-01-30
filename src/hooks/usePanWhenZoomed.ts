import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Rotation } from "../constants";

/**
 * Pan state and pointer handlers for drag-to-pan when zoomed in.
 * Resets pan when deviceId, rotation, or zoom change.
 * Cleans up window listeners on unmount if drag was in progress.
 *
 * @param isZoomedIn - Whether the viewport is zoomed in (pan only active when true).
 * @param deviceId - Current device id (used as dep to reset pan).
 * @param rotation - Current rotation in degrees (used as dep to reset pan).
 * @param zoom - Current zoom (used as dep to reset pan).
 * @returns Object with pan { x, y }, isDragging, and handlePointerDown handler.
 */
export function usePanWhenZoomed(
  isZoomedIn: boolean,
  deviceId: string,
  rotation: Rotation,
  zoom: "fit" | number,
): {
  pan: { x: number; y: number };
  isDragging: boolean;
  handlePointerDown: (e: React.PointerEvent) => void;
} {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastClientRef = useRef({ x: 0, y: 0 });
  const cleanupRef = useRef<(() => void) | null>(null);

  // Reset pan when viewport context changes (deviceId, rotation, zoom are intentional deps)
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset pan when device/rotation/zoom change
  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [deviceId, rotation, zoom]);

  // Clean up pointer listeners on unmount (e.g. if component unmounts during drag)
  useEffect(() => {
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isZoomedIn || e.button !== 0) return;
      e.preventDefault();
      lastClientRef.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - lastClientRef.current.x;
        const dy = ev.clientY - lastClientRef.current.y;
        lastClientRef.current = { x: ev.clientX, y: ev.clientY };
        setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      };
      const onUp = (): void => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        cleanupRef.current = null;
        setIsDragging(false);
      };
      cleanupRef.current = onUp;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [isZoomedIn],
  );

  return { pan, isDragging, handlePointerDown };
}
