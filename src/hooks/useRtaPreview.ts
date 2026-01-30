import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { useGlobals, useStorybookApi } from "storybook/manager-api";
import {
  ADDON_ID,
  DEFAULT_DEVICE_ID,
  DEFAULT_ROTATION,
  DEFAULT_ZOOM,
  type Rotation,
  RTA_PREVIEW_CUSTOM_HEIGHT,
  RTA_PREVIEW_CUSTOM_WIDTH,
  RTA_PREVIEW_DEVICE,
  RTA_PREVIEW_ENABLED,
  RTA_PREVIEW_ROTATE,
  RTA_PREVIEW_TOOLBAR_VISIBLE,
  RTA_PREVIEW_ZOOM,
  ZOOM_CONFIG,
} from "../constants";
import type { DeviceId } from "../devices";
import { DEVICES } from "../devices";

/**
 * Toolbar state and actions from Storybook globals; registers zoom shortcuts (Ctrl/Cmd + = / - / 0).
 *
 * @returns Object with state (enabled, deviceId, rotation, zoom, customWidth, customHeight,
 *   toolbarVisible, device, rotatable, isCustom), handlers (setEnabled, setDevice, cycleRotation,
 *   zoomIn, zoomOut, zoomFit, setCustomWidth, setCustomHeight, toggleToolbar), and
 *   UI values (zoomNum, canZoomIn, canZoomOut).
 */
/**
 * Wraps Storybook's updateGlobals so that if the consumer did not declare our globals
 * (initialGlobals / getRtaPreviewPreviewConfig), we no-op instead of throwing.
 */
function safeUpdateGlobals(
  updateGlobals: (patch: Record<string, unknown>) => void,
  patch: Record<string, unknown>,
): void {
  try {
    updateGlobals(patch);
  } catch {
    // Globals not declared in preview; add ...getRtaPreviewPreviewConfig() to fix.
  }
}

const GLOBALS_HINT =
  "RTA Preview: Add ...getRtaPreviewPreviewConfig() to your .storybook/preview.ts so addon globals are declared. See rta-preview-addon README.";

export function useRtaPreview() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();
  const hintLoggedRef = useRef(false);
  const attemptedEnableRef = useRef(false);

  const safeUpdate = useCallback(
    (patch: Record<string, unknown>) => safeUpdateGlobals(updateGlobals, patch),
    [updateGlobals],
  );

  const enabled = (globals[RTA_PREVIEW_ENABLED] as boolean | undefined) ?? false;
  const deviceId = (globals[RTA_PREVIEW_DEVICE] as string) ?? DEFAULT_DEVICE_ID;
  const rotation = (globals[RTA_PREVIEW_ROTATE] as Rotation) ?? DEFAULT_ROTATION;
  const zoom = (globals[RTA_PREVIEW_ZOOM] as "fit" | number) ?? DEFAULT_ZOOM;
  const customWidth = globals[RTA_PREVIEW_CUSTOM_WIDTH] as number | undefined;
  const customHeight = globals[RTA_PREVIEW_CUSTOM_HEIGHT] as number | undefined;
  const toolbarVisible = (globals[RTA_PREVIEW_TOOLBAR_VISIBLE] as boolean | undefined) ?? !!enabled;

  const device = DEVICES[deviceId as DeviceId];
  const rotatable = device?.rotatable ?? true;
  const isCustom = deviceId === "custom";

  const setDevice = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const key = e.target.value as DeviceId;
      safeUpdate({
        [RTA_PREVIEW_DEVICE]: key,
        [RTA_PREVIEW_ZOOM]: "fit" as const,
        ...(DEVICES[key] && !DEVICES[key].rotatable ? { [RTA_PREVIEW_ROTATE]: 0 as Rotation } : {}),
      });
    },
    [safeUpdate],
  );

  const cycleRotation = useCallback(() => {
    if (!rotatable) return;
    const next: Rotation = rotation === 270 ? 0 : ((rotation + 90) as Rotation);
    safeUpdate({ [RTA_PREVIEW_ROTATE]: next, [RTA_PREVIEW_ZOOM]: "fit" as const });
  }, [rotation, rotatable, safeUpdate]);

  const zoomIn = useCallback(() => {
    const current = typeof zoom === "number" ? zoom : 1;
    const next = Math.min(ZOOM_CONFIG.max, current + ZOOM_CONFIG.step);
    safeUpdate({ [RTA_PREVIEW_ZOOM]: next });
  }, [zoom, safeUpdate]);

  const zoomOut = useCallback(() => {
    const current = typeof zoom === "number" ? zoom : 1;
    const next = Math.max(ZOOM_CONFIG.min, current - ZOOM_CONFIG.step);
    safeUpdate({ [RTA_PREVIEW_ZOOM]: next });
  }, [zoom, safeUpdate]);

  const zoomFit = useCallback(() => {
    safeUpdate({ [RTA_PREVIEW_ZOOM]: "fit" });
  }, [safeUpdate]);

  const setCustomWidth = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = Number.parseInt(e.target.value, 10);
      safeUpdate({ [RTA_PREVIEW_CUSTOM_WIDTH]: Number.isNaN(n) ? undefined : n });
    },
    [safeUpdate],
  );

  const setCustomHeight = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const n = Number.parseInt(e.target.value, 10);
      safeUpdate({ [RTA_PREVIEW_CUSTOM_HEIGHT]: Number.isNaN(n) ? undefined : n });
    },
    [safeUpdate],
  );

  const setEnabled = useCallback(
    (value: boolean) => {
      if (value) attemptedEnableRef.current = true;
      safeUpdate({ [RTA_PREVIEW_ENABLED]: value });
    },
    [safeUpdate],
  );

  useEffect(() => {
    if (enabled) {
      attemptedEnableRef.current = false;
      return;
    }
    if (!attemptedEnableRef.current) return;
    const id = setTimeout(() => {
      if (!hintLoggedRef.current) {
        console.info(GLOBALS_HINT);
        hintLoggedRef.current = true;
      }
      attemptedEnableRef.current = false;
    }, 200);
    return () => clearTimeout(id);
  }, [enabled]);

  const toggleToolbar = useCallback(() => {
    safeUpdate({ [RTA_PREVIEW_TOOLBAR_VISIBLE]: !toolbarVisible });
  }, [toolbarVisible, safeUpdate]);

  useEffect(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Zoom in",
      defaultShortcut: ["ctrl", "="],
      actionName: "rta-zoom-in",
      showInMenu: false,
      action: zoomIn,
    });
    api.setAddonShortcut(ADDON_ID, {
      label: "Zoom out",
      defaultShortcut: ["ctrl", "-"],
      actionName: "rta-zoom-out",
      showInMenu: false,
      action: zoomOut,
    });
    api.setAddonShortcut(ADDON_ID, {
      label: "Fit viewport",
      defaultShortcut: ["ctrl", "0"],
      actionName: "rta-zoom-fit",
      showInMenu: false,
      action: zoomFit,
    });
  }, [api, zoomIn, zoomOut, zoomFit]);

  const zoomNum = typeof zoom === "number" ? zoom : 1;
  const canZoomIn = zoomNum < ZOOM_CONFIG.max;
  const canZoomOut = zoomNum > ZOOM_CONFIG.min;

  return {
    enabled,
    deviceId,
    rotation,
    zoom,
    customWidth,
    customHeight,
    toolbarVisible,
    toggleToolbar,
    setEnabled,
    device,
    rotatable,
    isCustom,
    setDevice,
    cycleRotation,
    zoomIn,
    zoomOut,
    zoomFit,
    setCustomWidth,
    setCustomHeight,
    zoomNum,
    canZoomIn,
    canZoomOut,
  };
}
