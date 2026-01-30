import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Rotation } from "../constants";

/**
 * Pan state and pointer handlers for drag-to-pan when pan is enabled.
 * Resets pan when deviceId, rotation, or zoom change.
 * Cleans up window listeners on unmount if drag was in progress.
 *
 * @param isPanEnabled - Whether pan is active (zoomed in or content overflows).
 * @param deviceId - Current device id (used as dep to reset pan).
 * @param rotation - Current rotation in degrees (used as dep to reset pan).
 * @param zoom - Current zoom (used as dep to reset pan).
 * @returns Object with pan { x, y }, isDragging, and handlePointerDown handler.
 */
export function usePanWhenZoomed(
  isPanEnabled: boolean,
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
  const pointerIdRef = useRef<number | null>(null);
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
      if (!isPanEnabled || e.button !== 0) return;
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      pointerIdRef.current = e.pointerId;
      target.setPointerCapture(e.pointerId);
      lastClientRef.current = { x: e.clientX, y: e.clientY };
      setIsDragging(true);
      const onMove = (ev: PointerEvent) => {
        const dx = ev.clientX - lastClientRef.current.x;
        const dy = ev.clientY - lastClientRef.current.y;
        lastClientRef.current = { x: ev.clientX, y: ev.clientY };
        setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      };
      const doCleanup = (): void => {
        const id = pointerIdRef.current;
        if (id !== null) {
          pointerIdRef.current = null;
          try {
            target.releasePointerCapture(id);
          } catch {
            // Pointer may already be released.
          }
        }
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        cleanupRef.current = null;
        setIsDragging(false);
      };
      const onUp = (): void => doCleanup();
      cleanupRef.current = doCleanup;
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [isPanEnabled],
  );

  return { pan, isDragging, handlePointerDown };
}
