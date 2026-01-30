import type React from "react";
import { memo } from "react";
import { Input, Label, Row } from "./Styles";

export interface CustomDimensionsProps {
  customWidth: number | undefined;
  customHeight: number | undefined;
  onCustomWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Custom dimensions input for the RTA Preview addon.
 *
 * @param customWidth - The current custom width.
 * @param customHeight - The current custom height.
 * @param onCustomWidthChange - The function to call when the custom width is changed.
 * @param onCustomHeightChange - The function to call when the custom height is changed.
 * @returns The custom dimensions input.
 */
export const CustomDimensions = memo(function CustomDimensions({
  customWidth,
  customHeight,
  onCustomWidthChange,
  onCustomHeightChange,
}: CustomDimensionsProps) {
  return (
    <Row>
      <Label htmlFor="rta-preview-width">W</Label>
      <Input
        id="rta-preview-width"
        type="number"
        min={100}
        placeholder="—"
        value={customWidth ?? ""}
        onChange={onCustomWidthChange}
        aria-label="Custom width"
      />
      <Label htmlFor="rta-preview-height">H</Label>
      <Input
        id="rta-preview-height"
        type="number"
        min={100}
        placeholder="—"
        value={customHeight ?? ""}
        onChange={onCustomHeightChange}
        aria-label="Custom height"
      />
    </Row>
  );
});
