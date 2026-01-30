import type React from "react";
import type { DeviceId } from "./devices";

/** Storybook addon ID; use when registering the addon or adding tools. */
export const ADDON_ID = "rta-preview-addon";

/** Tool ID for the RTA Preview toolbar item. */
export const TOOL_ID = "rta-preview-tool";

/** Global key for the selected device preset id. */
export const RTA_PREVIEW_DEVICE = "rtaPreviewDevice";
/** Global key for viewport rotation in degrees (0, 90, 180, 270). */
export const RTA_PREVIEW_ROTATE = "rtaPreviewRotate";
/** Global key for zoom level: "fit" or a number. */
export const RTA_PREVIEW_ZOOM = "rtaPreviewZoom";
/** Global key for custom viewport width when device is "custom". */
export const RTA_PREVIEW_CUSTOM_WIDTH = "rtaPreviewCustomWidth";
/** Global key for custom viewport height when device is "custom". */
export const RTA_PREVIEW_CUSTOM_HEIGHT = "rtaPreviewCustomHeight";
/** Global key for whether the stage shows a gradient background. */
export const RTA_PREVIEW_STAGE_BACKGROUND = "rtaPreviewStageBackground";
/** Global key for whether the dimensions overlay is visible. */
export const RTA_PREVIEW_SHOW_SIZE = "rtaPreviewShowSize";
/** Global key for whether the device frame is visible. */
export const RTA_PREVIEW_SHOW_FRAME = "rtaPreviewShowFrame";
/** Global key for whether the RTA Preview toolbar is visible. */
export const RTA_PREVIEW_TOOLBAR_VISIBLE = "rtaPreviewToolbarVisible";
/** Global key for whether RTA Preview (device mode) is enabled. When false, preview is pass-through and toolbar shows only the enable control. */
export const RTA_PREVIEW_ENABLED = "rtaPreviewEnabled";

/** Viewport rotation in degrees. Only 0, 90, 180, and 270 are valid. */
export type Rotation = 0 | 90 | 180 | 270;

/** Default device when no global is set. */
export const DEFAULT_DEVICE_ID: DeviceId = "iphoneProMax";
/** Default rotation in degrees when no global is set. */
export const DEFAULT_ROTATION = 0 as const;
/** Default zoom when no global is set. */
export const DEFAULT_ZOOM: "fit" | number = "fit";

/** Zoom limits and step for toolbar zoom in/out. Used by manager and by computeScale. */
export const ZOOM_CONFIG = {
  min: 0.1,
  max: 3,
  step: 0.25,
} as const;

/**
 * Layout config for preview stage.
 * - padding: reserved for future layout calculations (POC parity).
 * - resizeDebounceMs: debounce delay (ms) for resize-triggered updates.
 * - fitMargin: margin (px) reserved on each side when computing fit scale; content fits inside (container - 2*fitMargin).
 */
export const LAYOUT_CONFIG = {
  padding: 128,
  resizeDebounceMs: 150,
  fitMargin: 32,
} as const;

// -----------------------------------------------------------------------------
// Preview UI constants
// -----------------------------------------------------------------------------

/** Inline style for the dimensions overlay (bottom-right of the viewport). */
export const SIZE_OVERLAY_STYLE: React.CSSProperties = {
  position: "absolute",
  bottom: 8,
  right: 8,
  padding: "0 12px",
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, 0.5)",
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: 13,
  fontFamily: "monospace",
  borderRadius: 8,
  pointerEvents: "none",
};

/** Inline style for the device frame wrapper around the viewport. */
export const FRAME_STYLE: React.CSSProperties = {
  padding: 12,
  background: "#111",
  border: "2px solid #555",
  borderRadius: 20,
  boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.6)",
  boxSizing: "border-box",
};
