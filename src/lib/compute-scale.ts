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
 * @param fitMarginPx - Margin (px) on each side when zoom is "fit"; effective container is reduced by 2*margin per axis.
 * @returns Scale factor. For "fit": scale to (container minus margin), never zoom in (max 1). For number: clamped to ZOOM_CONFIG.
 */
export function computeScale(
  viewportWidth: number,
  viewportHeight: number,
  zoom: "fit" | number,
  containerWidth: number,
  containerHeight: number,
  fitMarginPx = 0,
): number {
  if (viewportWidth <= 0 || viewportHeight <= 0) return 1;
  if (containerWidth <= 0 || containerHeight <= 0) return 1;
  if (typeof zoom === "number" && zoom > 0) {
    return Math.max(ZOOM_CONFIG.min, Math.min(ZOOM_CONFIG.max, zoom));
  }
  const margin = Math.max(0, fitMarginPx);
  const effectiveWidth = Math.max(1, containerWidth - 2 * margin);
  const effectiveHeight = Math.max(1, containerHeight - 2 * margin);
  const scaleX = effectiveWidth / viewportWidth;
  const scaleY = effectiveHeight / viewportHeight;
  return Math.min(scaleX, scaleY, 1);
}
