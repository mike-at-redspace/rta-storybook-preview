import { useGlobals } from "@storybook/preview-api";
import type React from "react";
import { useEffect, useMemo } from "react";
import {
  DEFAULT_DEVICE_ID,
  DEFAULT_ROTATION,
  DEFAULT_ZOOM,
  LAYOUT_CONFIG,
  type Rotation,
  RTA_PREVIEW_CUSTOM_HEIGHT,
  RTA_PREVIEW_CUSTOM_WIDTH,
  RTA_PREVIEW_DEVICE,
  RTA_PREVIEW_ENABLED,
  RTA_PREVIEW_ROTATE,
  RTA_PREVIEW_ZOOM,
} from "../constants";
import { DEVICES, type DeviceId } from "../devices";
import { buildViewportTransform, computeScale, getViewportDimensions } from "../lib";
import { useContainerSize } from "./useContainerSize";
import { useDebouncedResize } from "./useDebouncedResize";
import { usePanWhenZoomed } from "./usePanWhenZoomed";

const STAGE_GRADIENT = "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

/**
 * Viewport state and styles for the RTA Preview stage (globals, scale, pan, memoized styles).
 *
 * @returns Object with enabled, containerRef, stageStyle, viewportStyle, dimensionsLabel,
 *   showFrame, showSize, isConstrained, handlePointerDown.
 */
export function usePreviewViewport() {
  const [globals] = useGlobals();
  const enabled = (globals[RTA_PREVIEW_ENABLED] as boolean | undefined) ?? false;

  const { containerRef, containerSize, updateSize } = useContainerSize();
  useDebouncedResize(updateSize, LAYOUT_CONFIG.resizeDebounceMs, []);

  const deviceId = (globals[RTA_PREVIEW_DEVICE] as string) ?? DEFAULT_DEVICE_ID;
  const rotation = (globals[RTA_PREVIEW_ROTATE] as Rotation) ?? DEFAULT_ROTATION;
  const zoom = (globals[RTA_PREVIEW_ZOOM] as "fit" | number) ?? DEFAULT_ZOOM;
  const customWidth = globals[RTA_PREVIEW_CUSTOM_WIDTH] as number | undefined;
  const customHeight = globals[RTA_PREVIEW_CUSTOM_HEIGHT] as number | undefined;
  const stageBackground = true;
  const showSize = true;
  const showFrame = true;

  const device = DEVICES[deviceId as DeviceId];
  const effectiveRotation = device && !device.rotatable ? 0 : (rotation as Rotation);

  // Re-measure container when device/rotation/zoom(fit) change or when enabled so fit/zoom have valid size
  // biome-ignore lint/correctness/useExhaustiveDependencies: deviceId and effectiveRotation trigger re-fit
  useEffect(() => {
    if (!enabled) return;
    const id = requestAnimationFrame(() => updateSize());
    return () => cancelAnimationFrame(id);
  }, [enabled, deviceId, effectiveRotation, zoom, updateSize]);

  const { width: viewportWidth, height: viewportHeight } = useMemo(
    () => getViewportDimensions(deviceId, customWidth, customHeight, effectiveRotation),
    [deviceId, customWidth, customHeight, effectiveRotation],
  );
  const isConstrained = viewportWidth > 0 && viewportHeight > 0;

  const scale = useMemo(
    () =>
      computeScale(viewportWidth, viewportHeight, zoom, containerSize.width, containerSize.height),
    [viewportWidth, viewportHeight, zoom, containerSize.width, containerSize.height],
  );
  const isZoomedIn = scale > 1;
  const { pan, isDragging, handlePointerDown } = usePanWhenZoomed(
    isZoomedIn,
    deviceId,
    effectiveRotation,
    zoom,
  );
  const transform = useMemo(
    () => buildViewportTransform(pan, scale, isZoomedIn),
    [pan, scale, isZoomedIn],
  );

  const scaledWidth = Math.round(viewportWidth * scale);
  const scaledHeight = Math.round(viewportHeight * scale);

  const stageStyle: React.CSSProperties = useMemo(
    () => ({
      position: "fixed" as const,
      inset: 0,
      width: "100%",
      height: "100%",
      overflow: "hidden" as const,
      isolation: "isolate" as const,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      boxSizing: "border-box",
      padding: "2%",
      transition: "transform 240ms cubic-bezier(0.4, 0, 0.2, 1)",
      transformOrigin: "center center",
      ...(stageBackground && { background: STAGE_GRADIENT }),
      ...(isZoomedIn && {
        cursor: isDragging ? ("grabbing" as const) : ("grab" as const),
        userSelect: "none" as const,
        touchAction: "none" as const,
      }),
      ...(isDragging && { overflow: "hidden" }),
    }),
    [isZoomedIn, isDragging],
  );

  const viewportStyle: React.CSSProperties = useMemo(
    () =>
      isConstrained
        ? {
            overflow: "auto" as const,
            boxSizing: "border-box" as const,
            transition: "width 0.3s ease, height 0.3s ease",
            width: viewportWidth,
            height: viewportHeight,
            flexShrink: 0,
            ...(transform && {
              transform,
              transformOrigin: "0 0" as const,
            }),
          }
        : {
            overflow: "auto" as const,
            boxSizing: "border-box" as const,
            transition: "width 0.3s ease, height 0.3s ease",
            width: "100%",
            minHeight: "100%",
          },
    [isConstrained, viewportWidth, viewportHeight, transform],
  );

  const dimensionsLabel = isConstrained ? `${viewportWidth} × ${viewportHeight}` : "—";

  return {
    enabled,
    containerRef,
    stageStyle: enabled ? stageStyle : {},
    viewportStyle: enabled ? viewportStyle : {},
    scale: enabled ? scale : 1,
    scaledWidth: enabled && isConstrained ? scaledWidth : 0,
    scaledHeight: enabled && isConstrained ? scaledHeight : 0,
    dimensionsLabel: enabled ? dimensionsLabel : "—",
    showFrame: enabled ? showFrame : false,
    showSize: enabled ? showSize : false,
    isConstrained: enabled ? isConstrained : false,
    handlePointerDown: enabled ? handlePointerDown : () => {},
  };
}
