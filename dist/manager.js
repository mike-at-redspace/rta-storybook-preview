// src/ui/Manager.tsx
import { addons as addons2, types } from "@storybook/manager-api";

// src/constants.ts
var ADDON_ID = "rta-preview-addon";
var TOOL_ID = "rta-preview-tool";
var RTA_PREVIEW_DOWNLOAD_VIEW = "rta-preview/download-view";
var RTA_PREVIEW_DEVICE = "rtaPreviewDevice";
var RTA_PREVIEW_ROTATE = "rtaPreviewRotate";
var RTA_PREVIEW_ZOOM = "rtaPreviewZoom";
var RTA_PREVIEW_CUSTOM_WIDTH = "rtaPreviewCustomWidth";
var RTA_PREVIEW_CUSTOM_HEIGHT = "rtaPreviewCustomHeight";
var RTA_PREVIEW_TOOLBAR_VISIBLE = "rtaPreviewToolbarVisible";
var RTA_PREVIEW_ENABLED = "rtaPreviewEnabled";
var DEFAULT_DEVICE_ID = "iphoneProMax";
var DEFAULT_ROTATION = 0;
var DEFAULT_ZOOM = "fit";
var ZOOM_CONFIG = {
  min: 0.1,
  max: 3,
  step: 0.25
};

// src/ui/Tool.tsx
import { memo as memo7, useCallback as useCallback4, useEffect as useEffect6, useState as useState3 } from "react";

// src/hooks/useContainerSize.ts
import { useCallback, useEffect, useRef, useState } from "react";

// src/hooks/useDebouncedResize.ts
import { useEffect as useEffect2, useRef as useRef2 } from "react";

// src/hooks/usePanWhenZoomed.ts
import { useCallback as useCallback2, useEffect as useEffect3, useRef as useRef3, useState as useState2 } from "react";

// src/hooks/usePreviewViewport.ts
import { useGlobals } from "@storybook/preview-api";
import { useEffect as useEffect4, useMemo } from "react";

// src/devices.ts
var DEVICES = {
  responsive: { width: 0, height: 0, label: "Responsive", rotatable: false },
  iphoneSE: { width: 375, height: 667, label: "iPhone SE", rotatable: true },
  iphone14: { width: 390, height: 844, label: "iPhone 14 / 15", rotatable: true },
  iphonePro: { width: 393, height: 852, label: "iPhone Pro", rotatable: true },
  iphoneProMax: { width: 430, height: 932, label: "iPhone Pro Max", rotatable: true },
  androidSmall: { width: 360, height: 740, label: "Android Small", rotatable: true },
  androidMedium: { width: 412, height: 915, label: "Android Medium", rotatable: true },
  androidLarge: { width: 480, height: 1040, label: "Android Large", rotatable: true },
  foldClosed: { width: 390, height: 850, label: "Foldable (Closed)", rotatable: true },
  foldOpen: { width: 768, height: 1024, label: "Foldable (Open)", rotatable: true },
  ipadMini: { width: 768, height: 1024, label: "iPad Mini", rotatable: true },
  ipad: { width: 810, height: 1080, label: "iPad", rotatable: true },
  ipadAir: { width: 820, height: 1180, label: "iPad Air", rotatable: true },
  ipadPro11: { width: 834, height: 1194, label: "iPad Pro 11\u2033", rotatable: true },
  ipadPro13: { width: 1024, height: 1366, label: "iPad Pro 13\u2033", rotatable: true },
  macbookAir: { width: 1440, height: 900, label: "MacBook Air", rotatable: false },
  macbookPro14: { width: 1512, height: 982, label: "MacBook Pro 14\u2033", rotatable: false },
  macbookPro16: { width: 1728, height: 1117, label: "MacBook Pro 16\u2033", rotatable: false },
  windowsLaptop: { width: 1366, height: 768, label: "Windows Laptop", rotatable: false },
  desktopHD: { width: 1920, height: 1080, label: "Full HD Desktop", rotatable: false },
  desktopQHD: { width: 2560, height: 1440, label: "2K / QHD Display", rotatable: false },
  desktop4K: { width: 3840, height: 2160, label: "4K Display", rotatable: false },
  desktop5K: { width: 5120, height: 2880, label: "5K Display", rotatable: false },
  desktop8K: { width: 7680, height: 4320, label: "8K Display", rotatable: false },
  ultrawide34: { width: 3440, height: 1440, label: "34\u2033 Ultrawide", rotatable: false },
  ultrawide49: { width: 5120, height: 1440, label: "49\u2033 Super Ultrawide", rotatable: false },
  custom: { width: 390, height: 844, label: "Custom", rotatable: true }
};
var DEVICE_CATEGORIES = [
  { label: "View", pattern: /^(responsive|custom)$/ },
  { label: "Phones (iOS)", pattern: /^iphone/ },
  { label: "Phones (Android)", pattern: /^android/ },
  { label: "Foldables", pattern: /^fold/ },
  { label: "Tablets", pattern: /^ipad/ },
  { label: "Laptops", pattern: /^(macbook|windows)/ },
  { label: "Desktops", pattern: /^desktop/ },
  { label: "Ultrawide", pattern: /^ultrawide/ }
];

// src/lib/download-filename.ts
function sanitizeFilenameForDownload(label) {
  return label.replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "") || "preview";
}

// src/hooks/useRtaPreview.ts
import { useGlobals as useGlobals2, useStorybookApi } from "@storybook/manager-api";
import { useCallback as useCallback3, useEffect as useEffect5, useRef as useRef4 } from "react";
function safeUpdateGlobals(updateGlobals, patch) {
  try {
    updateGlobals(patch);
  } catch {
  }
}
var GLOBALS_HINT = "RTA Preview: Add ...getRtaPreviewPreviewConfig() to your .storybook/preview.ts so addon globals are declared. See rta-preview-addon README.";
function useRtaPreview() {
  const [globals, updateGlobals] = useGlobals2();
  const api = useStorybookApi();
  const hintLoggedRef = useRef4(false);
  const attemptedEnableRef = useRef4(false);
  const safeUpdate = useCallback3(
    (patch) => safeUpdateGlobals(updateGlobals, patch),
    [updateGlobals]
  );
  const enabled = globals[RTA_PREVIEW_ENABLED] ?? false;
  const deviceId = globals[RTA_PREVIEW_DEVICE] ?? DEFAULT_DEVICE_ID;
  const rotation = globals[RTA_PREVIEW_ROTATE] ?? DEFAULT_ROTATION;
  const zoom = globals[RTA_PREVIEW_ZOOM] ?? DEFAULT_ZOOM;
  const customWidth = globals[RTA_PREVIEW_CUSTOM_WIDTH];
  const customHeight = globals[RTA_PREVIEW_CUSTOM_HEIGHT];
  const toolbarVisible = globals[RTA_PREVIEW_TOOLBAR_VISIBLE] ?? !!enabled;
  const device = DEVICES[deviceId];
  const rotatable = device?.rotatable ?? true;
  const isCustom = deviceId === "custom";
  const setDevice = useCallback3(
    (e) => {
      const key = e.target.value;
      safeUpdate({
        [RTA_PREVIEW_DEVICE]: key,
        [RTA_PREVIEW_ZOOM]: "fit",
        ...DEVICES[key] && !DEVICES[key].rotatable ? { [RTA_PREVIEW_ROTATE]: 0 } : {}
      });
    },
    [safeUpdate]
  );
  const cycleRotation = useCallback3(() => {
    if (!rotatable) return;
    const next = rotation === 270 ? 0 : rotation + 90;
    safeUpdate({ [RTA_PREVIEW_ROTATE]: next, [RTA_PREVIEW_ZOOM]: "fit" });
  }, [rotation, rotatable, safeUpdate]);
  const zoomIn = useCallback3(() => {
    const current = typeof zoom === "number" ? zoom : 1;
    const next = Math.min(ZOOM_CONFIG.max, current + ZOOM_CONFIG.step);
    safeUpdate({ [RTA_PREVIEW_ZOOM]: next });
  }, [zoom, safeUpdate]);
  const zoomOut = useCallback3(() => {
    const current = typeof zoom === "number" ? zoom : 1;
    const next = Math.max(ZOOM_CONFIG.min, current - ZOOM_CONFIG.step);
    safeUpdate({ [RTA_PREVIEW_ZOOM]: next });
  }, [zoom, safeUpdate]);
  const zoomFit = useCallback3(() => {
    safeUpdate({ [RTA_PREVIEW_ZOOM]: "fit" });
  }, [safeUpdate]);
  const setCustomWidth = useCallback3(
    (e) => {
      const n = Number.parseInt(e.target.value, 10);
      safeUpdate({ [RTA_PREVIEW_CUSTOM_WIDTH]: Number.isNaN(n) ? void 0 : n });
    },
    [safeUpdate]
  );
  const setCustomHeight = useCallback3(
    (e) => {
      const n = Number.parseInt(e.target.value, 10);
      safeUpdate({ [RTA_PREVIEW_CUSTOM_HEIGHT]: Number.isNaN(n) ? void 0 : n });
    },
    [safeUpdate]
  );
  const setEnabled = useCallback3(
    (value) => {
      if (value) attemptedEnableRef.current = true;
      safeUpdate({ [RTA_PREVIEW_ENABLED]: value });
    },
    [safeUpdate]
  );
  useEffect5(() => {
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
  const toggleToolbar = useCallback3(() => {
    safeUpdate({ [RTA_PREVIEW_TOOLBAR_VISIBLE]: !toolbarVisible });
  }, [toolbarVisible, safeUpdate]);
  useEffect5(() => {
    api.setAddonShortcut(ADDON_ID, {
      label: "Zoom in",
      defaultShortcut: ["ctrl", "="],
      actionName: "rta-zoom-in",
      showInMenu: false,
      action: zoomIn
    });
    api.setAddonShortcut(ADDON_ID, {
      label: "Zoom out",
      defaultShortcut: ["ctrl", "-"],
      actionName: "rta-zoom-out",
      showInMenu: false,
      action: zoomOut
    });
    api.setAddonShortcut(ADDON_ID, {
      label: "Fit viewport",
      defaultShortcut: ["ctrl", "0"],
      actionName: "rta-zoom-fit",
      showInMenu: false,
      action: zoomFit
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
    canZoomOut
  };
}

// src/ui/CustomDimensions.tsx
import { memo } from "react";

// src/ui/Styles.tsx
import { styled } from "@storybook/theming";
import { jsx } from "react/jsx-runtime";
var TOOLBAR_BUTTON_COLOR = "rgb(115, 130, 140)";
var TOOLBAR_BUTTON_HOVER_COLOR = "rgb(2, 156, 253)";
var TOOLBAR_BUTTON_HOVER_BG = "rgba(2, 156, 253, 0.14)";
var FIT_BUTTON_FLASH_STYLE = /* @__PURE__ */ jsx(
  "style",
  {
    dangerouslySetInnerHTML: {
      __html: `
@keyframes rta-fit-flash {
  0% { box-shadow: 0 0 0 2px rgba(2, 156, 253, 0.7); }
  100% { box-shadow: none; }
}
.rta-preview-toolbar button[data-flashing="true"] {
  animation: rta-fit-flash 500ms ease-out forwards;
}
`
    }
  }
);
function getToolbarColors(theme) {
  return {
    border: theme.appBorderColor ?? (theme.base === "dark" ? "#333" : "#ccc"),
    /** Default toolbar button text (muted); match Storybook's toolbar icon color. */
    buttonColor: theme.barTextColor ?? TOOLBAR_BUTTON_COLOR,
    /** Hover: use theme secondary/highlight or Storybook blue. */
    buttonHoverColor: theme.barHoverColor ?? theme.barSelectedColor ?? TOOLBAR_BUTTON_HOVER_COLOR,
    buttonHoverBg: TOOLBAR_BUTTON_HOVER_BG,
    selectedBg: theme.barSelectedColor ?? (theme.base === "dark" ? "#3d3d3d" : "#e0e0e0"),
    selectedText: theme.base === "dark" ? "#fff" : "#1a1a1a"
  };
}
function getInputColors(theme) {
  const dark = theme.base === "dark";
  return {
    bg: theme.inputBg ?? (dark ? "#2d2d2d" : "#fff"),
    text: theme.inputTextColor ?? (dark ? "#eee" : "#333"),
    border: theme.appBorderColor ?? (dark ? "#444" : "#ccc"),
    muted: theme.textMutedColor ?? (dark ? "#999" : "#666")
  };
}
var fontSize = (theme) => theme.typography?.size?.s2 ?? 12;
var radius = (theme) => theme.appBorderRadius ?? 4;
var Toolbar = styled.div(({ theme }) => {
  const { border } = getToolbarColors(theme);
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: theme.layoutMargin ?? 8,
    padding: "0 4px",
    borderLeft: `1px solid ${border}`,
    marginLeft: 4
  };
});
var Label = styled.label(({ theme }) => {
  const { muted } = getInputColors(theme);
  return {
    fontSize: fontSize(theme),
    color: muted,
    marginRight: 4
  };
});
var ZoomPercent = styled.span(({ theme }) => {
  const { muted } = getInputColors(theme);
  return {
    fontSize: fontSize(theme),
    color: muted,
    minWidth: 36,
    textAlign: "right",
    userSelect: "none"
  };
});
var Select = styled.select(({ theme }) => {
  const { bg, text, border } = getInputColors(theme);
  return {
    padding: "4px 8px",
    fontSize: fontSize(theme),
    border: `1px solid ${border}`,
    borderRadius: radius(theme),
    background: bg,
    color: text,
    minWidth: 120
  };
});
var Button = styled.button(({ theme }) => {
  const { buttonColor, buttonHoverColor, buttonHoverBg, selectedBg, selectedText } = getToolbarColors(theme);
  return {
    border: 0,
    cursor: "pointer",
    gap: 6,
    justifyContent: "center",
    overflow: "hidden",
    padding: "0 7px",
    height: 28,
    position: "relative",
    textAlign: "center",
    textDecoration: "none",
    transitionProperty: "background, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-out",
    verticalAlign: "top",
    whiteSpace: "nowrap",
    userSelect: "none",
    opacity: 1,
    margin: 0,
    fontSize: fontSize(theme),
    fontWeight: 700,
    lineHeight: 1,
    background: "transparent",
    color: buttonColor,
    boxShadow: "none",
    borderRadius: radius(theme),
    flexShrink: 0,
    display: "inline-flex",
    alignItems: "center",
    "& svg": {
      color: buttonColor
    },
    "&:hover:not(:disabled)": {
      color: buttonHoverColor,
      background: buttonHoverBg
    },
    "&:hover:not(:disabled) svg": {
      color: buttonHoverColor
    },
    "&[aria-pressed='true']": {
      background: selectedBg,
      color: selectedText
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  };
});
var Input = styled.input(({ theme }) => {
  const { bg, text, border } = getInputColors(theme);
  return {
    width: 56,
    padding: "4px 6px",
    fontSize: fontSize(theme),
    border: `1px solid ${border}`,
    borderRadius: radius(theme),
    background: bg,
    color: text
  };
});
var Row = styled.div({
  display: "inline-flex",
  alignItems: "center",
  gap: 6
});

// src/ui/CustomDimensions.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var CustomDimensions = memo(function CustomDimensions2({
  customWidth,
  customHeight,
  onCustomWidthChange,
  onCustomHeightChange
}) {
  return /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx2(Label, { htmlFor: "rta-preview-width", children: "W" }),
    /* @__PURE__ */ jsx2(
      Input,
      {
        id: "rta-preview-width",
        type: "number",
        min: 100,
        placeholder: "\u2014",
        value: customWidth ?? "",
        onChange: onCustomWidthChange,
        "aria-label": "Custom width"
      }
    ),
    /* @__PURE__ */ jsx2(Label, { htmlFor: "rta-preview-height", children: "H" }),
    /* @__PURE__ */ jsx2(
      Input,
      {
        id: "rta-preview-height",
        type: "number",
        min: 100,
        placeholder: "\u2014",
        value: customHeight ?? "",
        onChange: onCustomHeightChange,
        "aria-label": "Custom height"
      }
    )
  ] });
});

// src/ui/Device.tsx
import { memo as memo2 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var Device = memo2(function Device2({ deviceId, onDeviceChange }) {
  return /* @__PURE__ */ jsx3(
    Select,
    {
      id: "rta-preview-device",
      value: deviceId,
      onChange: onDeviceChange,
      "aria-label": "Select device viewport",
      children: DEVICE_CATEGORIES.map(({ label: groupLabel, pattern }) => {
        const keys = Object.keys(DEVICES).filter((k) => pattern.test(k));
        if (!keys.length) return null;
        return /* @__PURE__ */ jsx3("optgroup", { label: groupLabel, children: keys.map((id) => /* @__PURE__ */ jsx3("option", { value: id, children: DEVICES[id].label }, id)) }, groupLabel);
      })
    }
  );
});

// src/ui/Download.tsx
import { addons } from "@storybook/manager-api";
import { memo as memo3 } from "react";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function DownloadIcon({ size = 16 }) {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx4("title", { children: "Download" }),
        /* @__PURE__ */ jsx4("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        /* @__PURE__ */ jsx4("polyline", { points: "7 10 12 15 17 10" }),
        /* @__PURE__ */ jsx4("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
      ]
    }
  );
}
var Download = memo3(function Download2({ deviceLabel, deviceId }) {
  const handleClick = () => {
    const label = deviceLabel ?? deviceId;
    const base = sanitizeFilenameForDownload(label);
    const filename = `${base}.png`;
    addons.getChannel().emit(RTA_PREVIEW_DOWNLOAD_VIEW, { filename });
  };
  return /* @__PURE__ */ jsx4(
    Button,
    {
      type: "button",
      onClick: handleClick,
      "aria-label": "Download current view",
      title: "Download current view",
      children: /* @__PURE__ */ jsx4(DownloadIcon, {})
    }
  );
});

// src/ui/Enable.tsx
import { memo as memo4 } from "react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function PhoneIcon({ size = 16 }) {
  return /* @__PURE__ */ jsxs3(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "54 1 147 253",
      xmlns: "http://www.w3.org/2000/svg",
      style: { transform: "scale(1.3)" },
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsx5("title", { children: "Phone" }),
        /* @__PURE__ */ jsxs3(
          "g",
          {
            style: {
              stroke: "none",
              strokeWidth: 0,
              fill: "currentColor",
              fillRule: "nonzero",
              opacity: 1
            },
            transform: "matrix(2.81 0 0 2.81 1.407 1.407)",
            children: [
              /* @__PURE__ */ jsx5("path", { d: "M64.967 0H25.033a6.106 6.106 0 0 0-6.099 6.098v77.803A6.107 6.107 0 0 0 25.033 90h39.934a6.106 6.106 0 0 0 6.099-6.099V6.098A6.106 6.106 0 0 0 64.967 0zM20.935 12.417h48.131v63.67H20.935v-63.67zM25.033 2h39.934a4.103 4.103 0 0 1 4.099 4.098v4.319H20.935V6.098A4.102 4.102 0 0 1 25.033 2zm39.934 86H25.033a4.104 4.104 0 0 1-4.099-4.099v-5.814h48.131v5.814A4.103 4.103 0 0 1 64.967 88z" }),
              /* @__PURE__ */ jsx5("circle", { cx: "45", cy: "83.04", r: "2" }),
              /* @__PURE__ */ jsx5("path", { d: "M47.169 7.254H36.114a1 1 0 0 1 0-2h11.055a1 1 0 1 1 0 2z" }),
              /* @__PURE__ */ jsx5("circle", { cx: "51.89", cy: "6.25", r: "1.5" })
            ]
          }
        )
      ]
    }
  );
}
var Enable = memo4(function Enable2({ enabled, onSetEnabled }) {
  return /* @__PURE__ */ jsx5(
    Button,
    {
      type: "button",
      onClick: () => onSetEnabled(!enabled),
      "aria-label": enabled ? "Disable RTA Preview" : "Enable RTA Preview",
      title: enabled ? "Turn off device preview" : "Enable device preview",
      children: /* @__PURE__ */ jsx5(PhoneIcon, {})
    }
  );
});

// src/ui/Rotation.tsx
import { memo as memo5 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var Rotation = memo5(function Rotation2({
  rotation,
  rotatable,
  onCycleRotation
}) {
  if (!rotatable) return null;
  return /* @__PURE__ */ jsx6(Row, { children: /* @__PURE__ */ jsx6(
    Button,
    {
      type: "button",
      onClick: onCycleRotation,
      "aria-label": `Rotate (${rotation}\xB0)`,
      title: rotation === 0 ? "Portrait \u2192 Landscape" : "Landscape \u2192 Portrait",
      children: rotation === 0 ? "\u21BA Portrait" : "\u21BB Landscape"
    }
  ) });
});

// src/ui/Zoom.tsx
import { memo as memo6 } from "react";
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var Zoom = memo6(function Zoom2({
  zoomNum,
  canZoomIn,
  canZoomOut,
  fitButtonFlash,
  onZoomIn,
  onZoomOut,
  onZoomFit
}) {
  return /* @__PURE__ */ jsxs4(Row, { children: [
    /* @__PURE__ */ jsx7(
      Button,
      {
        type: "button",
        onClick: onZoomOut,
        disabled: !canZoomOut,
        "aria-label": "Zoom out",
        title: "Zoom out",
        children: "\u2212"
      }
    ),
    /* @__PURE__ */ jsx7(
      Button,
      {
        type: "button",
        onClick: onZoomFit,
        "aria-label": "Fit",
        title: "Fit to view",
        "data-flashing": fitButtonFlash ? "true" : void 0,
        children: "Fit"
      }
    ),
    /* @__PURE__ */ jsx7(
      Button,
      {
        type: "button",
        onClick: onZoomIn,
        disabled: !canZoomIn,
        "aria-label": "Zoom in",
        title: "Zoom in",
        children: "+"
      }
    ),
    /* @__PURE__ */ jsx7(ZoomPercent, { "aria-label": "Zoom percentage", role: "status", children: `${Math.round(zoomNum * 100)}%` })
  ] });
});

// src/ui/Tool.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var FIT_FLASH_DURATION_MS = 500;
var Tool = memo7(function Toolbar2() {
  const api = useRtaPreview();
  const [fitButtonFlash, setFitButtonFlash] = useState3(false);
  const triggerFitFlash = useCallback4(() => setFitButtonFlash(true), []);
  useEffect6(() => {
    if (!fitButtonFlash) return;
    const id = setTimeout(() => setFitButtonFlash(false), FIT_FLASH_DURATION_MS);
    return () => clearTimeout(id);
  }, [fitButtonFlash]);
  useEffect6(() => {
    triggerFitFlash();
  }, [triggerFitFlash]);
  const handleDeviceChange = useCallback4(
    (e) => {
      api.setDevice(e);
      api.zoomFit();
    },
    [api]
  );
  const handleZoomFit = useCallback4(() => {
    api.zoomFit();
    triggerFitFlash();
  }, [api, triggerFitFlash]);
  if (!api.enabled) {
    return /* @__PURE__ */ jsx8(Toolbar, { className: "rta-preview-toolbar", children: /* @__PURE__ */ jsx8(Enable, { enabled: false, onSetEnabled: api.setEnabled }) }, TOOL_ID);
  }
  return /* @__PURE__ */ jsxs5(Toolbar, { className: "rta-preview-toolbar", children: [
    FIT_BUTTON_FLASH_STYLE,
    /* @__PURE__ */ jsxs5(Row, { children: [
      /* @__PURE__ */ jsx8(Enable, { enabled: true, onSetEnabled: api.setEnabled }),
      /* @__PURE__ */ jsx8(Device, { deviceId: api.deviceId, onDeviceChange: handleDeviceChange })
    ] }),
    /* @__PURE__ */ jsx8(
      Rotation,
      {
        rotation: api.rotation,
        rotatable: api.rotatable,
        onCycleRotation: api.cycleRotation
      }
    ),
    /* @__PURE__ */ jsx8(
      Zoom,
      {
        zoomNum: api.zoomNum,
        canZoomIn: api.canZoomIn,
        canZoomOut: api.canZoomOut,
        fitButtonFlash,
        onZoomIn: api.zoomIn,
        onZoomOut: api.zoomOut,
        onZoomFit: handleZoomFit
      }
    ),
    api.isCustom && /* @__PURE__ */ jsx8(
      CustomDimensions,
      {
        customWidth: api.customWidth,
        customHeight: api.customHeight,
        onCustomWidthChange: api.setCustomWidth,
        onCustomHeightChange: api.setCustomHeight
      }
    ),
    /* @__PURE__ */ jsx8(Download, { deviceLabel: api.device?.label, deviceId: api.deviceId })
  ] }, TOOL_ID);
});

// src/ui/Manager.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
addons2.register(ADDON_ID, () => {
  addons2.add(`${ADDON_ID}/toolbar`, {
    type: types.TOOL,
    title: "\u1E5Ata (\u090B\u0924) - Storybook Preview",
    match: ({ viewMode }) => viewMode === "story",
    render: () => /* @__PURE__ */ jsx9(Tool, {})
  });
});
export {
  Tool
};
//# sourceMappingURL=manager.js.map