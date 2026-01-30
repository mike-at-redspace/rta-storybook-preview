/**
 * Build CSS transform string for viewport (translate, scale).
 * Rotation is handled by swapping viewport dimensions, not by CSS rotate.
 *
 * @param pan - Pan offset in px { x, y }; applied only when isZoomedIn is true.
 * @param scale - Scale factor.
 * @param isZoomedIn - Whether zoom is applied (pan is only included when true).
 * @returns CSS transform string, or undefined if no transform needed.
 */
export function buildViewportTransform(
  pan: { x: number; y: number },
  scale: number,
  isZoomedIn: boolean,
): string | undefined {
  const parts: string[] = [];
  if (isZoomedIn && (pan.x !== 0 || pan.y !== 0)) {
    parts.push(`translate(${pan.x}px, ${pan.y}px)`);
  }
  if (scale !== 1) parts.push(`scale(${scale})`);
  return parts.length ? parts.join(" ") : undefined;
}
