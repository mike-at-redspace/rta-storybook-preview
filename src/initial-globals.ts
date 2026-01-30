import { DEFAULT_DEVICE_ID, DEFAULT_ROTATION, DEFAULT_ZOOM } from "./constants";
import type { DeviceId } from "./devices";

/**
 * Default Storybook globals for the RTA Preview addon. Spread this into your preview
 * **initialGlobals** (Storybook 8.2+) or **globals** (older) so the addon can update them
 * (avoids "global is not defined" errors).
 *
 * @example
 * ```ts
 * import { withRtaPreview, initialGlobals } from 'rta-preview-addon/preview';
 *
 * const preview: Preview = {
 *   decorators: [withRtaPreview],
 *   initialGlobals: { ...initialGlobals },  // or globals: { ...initialGlobals } on older Storybook
 * };
 * ```
 */
export const initialGlobals: Record<string, unknown> = {
  rtaPreviewEnabled: false,
  rtaPreviewToolbarVisible: false,
  rtaPreviewDevice: DEFAULT_DEVICE_ID as DeviceId,
  rtaPreviewRotate: DEFAULT_ROTATION,
  rtaPreviewZoom: DEFAULT_ZOOM,
  rtaPreviewCustomWidth: undefined,
  rtaPreviewCustomHeight: undefined,
};

/**
 * Returns a preview config slice with initialGlobals (and globals for older Storybook) set.
 * Spread this into your preview so the addon can update globals without "global is not defined" errors.
 *
 * @example
 * ```ts
 * import type { Preview } from '@storybook/react';
 * import { withRtaPreview, getRtaPreviewPreviewConfig } from 'rta-preview-addon/preview';
 *
 * const preview: Preview = {
 *   decorators: [withRtaPreview],
 *   ...getRtaPreviewPreviewConfig(),
 * };
 * export default preview;
 * ```
 */
export function getRtaPreviewPreviewConfig(): {
  initialGlobals: Record<string, unknown>;
  globals?: Record<string, unknown>;
} {
  return {
    initialGlobals: { ...initialGlobals },
    globals: { ...initialGlobals },
  };
}
