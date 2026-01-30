import { ZOOM_CONFIG } from "../constants";

/**
 * Compute scale factor for viewport to fit container or use explicit zoom.
 * Viewport dimensions are already swapped by rotation in getViewportDimensions.
 *
 * @param viewportWidth - Viewport width in px (already swapped when landscape).
 * @param viewportHeight - Viewport height in px (already swapped when landscape).
 * @param zoom - "fit" to scale to container, or a number for explicit scale (clamped to ZOOM_CONFIG).
 * @param containerWidth - Container width in px.
 * @param containerHeight - Container height in px.
 * @returns Scale factor (1 = no scale; less than 1 = shrink; greater than 1 = zoom in).
 */
export function computeScale(
  viewportWidth: number,
  viewportHeight: number,
  zoom: "fit" | number,
  containerWidth: number,
  containerHeight: number,
): number {
  if (viewportWidth <= 0 || viewportHeight <= 0) return 1;
  if (containerWidth <= 0 || containerHeight <= 0) return 1;
  if (typeof zoom === "number" && zoom > 0) {
    return Math.max(ZOOM_CONFIG.min, Math.min(ZOOM_CONFIG.max, zoom));
  }
  const scaleX = containerWidth / viewportWidth;
  const scaleY = containerHeight / viewportHeight;
  return Math.min(scaleX, scaleY, 1);
}
