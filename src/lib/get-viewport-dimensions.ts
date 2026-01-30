import type { Rotation } from "../constants";
import type { DeviceId } from "../devices";
import { DEVICES } from "../devices";

/**
 * Resolve effective viewport width and height from device id, optional custom dimensions, and rotation.
 * When rotation is 90 or 270, dimensions are swapped so the viewport is landscape (width > height)
 * and the story reflows without any CSS rotate.
 *
 * @param deviceId - Device preset id or "responsive" / "custom".
 * @param customWidth - Optional custom width (used when device is "custom" or overrides preset).
 * @param customHeight - Optional custom height (used when device is "custom" or overrides preset).
 * @param rotation - 0, 90, 180, 270; 90/270 swap width and height for landscape.
 * @returns Object with width and height in px; { width: 0, height: 0 } for "responsive".
 */
export function getViewportDimensions(
  deviceId: DeviceId | string,
  customWidth: number | undefined,
  customHeight: number | undefined,
  rotation: Rotation = 0,
): { width: number; height: number } {
  let width: number;
  let height: number;
  if (customWidth != null && customHeight != null && customWidth > 0 && customHeight > 0) {
    width = customWidth;
    height = customHeight;
  } else {
    const preset = DEVICES[deviceId as DeviceId];
    if (!preset || deviceId === "responsive") {
      return { width: 0, height: 0 };
    }
    if (deviceId === "custom") {
      width = Math.max(100, customWidth ?? preset.width);
      height = Math.max(100, customHeight ?? preset.height);
    } else {
      width = preset.width;
      height = preset.height;
    }
  }
  if (rotation === 90 || rotation === 270) {
    return { width: height, height: width };
  }
  return { width, height };
}
