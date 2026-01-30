import { memo } from "react";
import { Button, Row } from "./Styles";

export interface RotationProps {
  rotation: number;
  rotatable: boolean;
  onCycleRotation: () => void;
}

/** Rotation button for rotating the viewport device.
 *
 * @param rotation - The current rotation in degrees.
 * @param rotatable - Whether the viewport is rotatable.
 * @param onCycleRotation - The function to call when the rotation is cycled.
 * @returns The rotation button.
 */
export const Rotation = memo(function Rotation({
  rotation,
  rotatable,
  onCycleRotation,
}: RotationProps) {
  if (!rotatable) return null;

  return (
    <Row>
      <Button
        type="button"
        onClick={onCycleRotation}
        aria-label={`Rotate (${rotation}°)`}
        title={rotation === 0 ? "Portrait → Landscape" : "Landscape → Portrait"}
      >
        {rotation === 0 ? "↺ Portrait" : "↻ Landscape"}
      </Button>
    </Row>
  );
});
