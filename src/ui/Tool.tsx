import { memo, useCallback, useEffect, useState } from "react";
import { TOOL_ID } from "../constants";
import type { DeviceId } from "../devices";
import { DEVICE_CATEGORIES, DEVICES } from "../devices";
import { useRtaPreview } from "../hooks";
import {
  Button,
  FIT_BUTTON_FLASH_STYLE,
  Input,
  Label,
  Row,
  Select,
  Toolbar,
  ZoomPercent,
} from "./Styles";

const FIT_FLASH_DURATION_MS = 500;

/** Phone/mobile icon for the RTA Preview toggle. */
function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="54 1 147 253"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "scale(1.3)",
      }}
      aria-hidden
    >
      <title>Phone</title>
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          fill: "currentColor",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      >
        <path d="M64.967 0H25.033a6.106 6.106 0 0 0-6.099 6.098v77.803A6.107 6.107 0 0 0 25.033 90h39.934a6.106 6.106 0 0 0 6.099-6.099V6.098A6.106 6.106 0 0 0 64.967 0zM20.935 12.417h48.131v63.67H20.935v-63.67zM25.033 2h39.934a4.103 4.103 0 0 1 4.099 4.098v4.319H20.935V6.098A4.102 4.102 0 0 1 25.033 2zm39.934 86H25.033a4.104 4.104 0 0 1-4.099-4.099v-5.814h48.131v5.814A4.103 4.103 0 0 1 64.967 88z" />
        <circle cx="45" cy="83.04" r="2" />
        <path d="M47.169 7.254H36.114a1 1 0 0 1 0-2h11.055a1 1 0 1 1 0 2z" />
        <circle cx="51.89" cy="6.25" r="1.5" />
      </g>
    </svg>
  );
}

export const Tool = memo(function RtaPreviewTool() {
  const api = useRtaPreview();
  const [fitButtonFlash, setFitButtonFlash] = useState(false);

  const triggerFitFlash = useCallback(() => {
    setFitButtonFlash(true);
  }, []);

  useEffect(() => {
    if (!fitButtonFlash) return;
    const id = setTimeout(() => setFitButtonFlash(false), FIT_FLASH_DURATION_MS);
    return () => clearTimeout(id);
  }, [fitButtonFlash]);

  useEffect(() => {
    triggerFitFlash();
  }, [triggerFitFlash]);

  if (!api.enabled) {
    return (
      <Toolbar key={TOOL_ID} className="rta-preview-toolbar">
        <Button
          type="button"
          onClick={() => api.setEnabled(true)}
          aria-label="Enable RTA Preview"
          title="Enable device preview"
        >
          <PhoneIcon />
        </Button>
      </Toolbar>
    );
  }

  return (
    <Toolbar key={TOOL_ID} className="rta-preview-toolbar">
      {FIT_BUTTON_FLASH_STYLE}
      <Row>
        <Button
          type="button"
          onClick={() => api.setEnabled(false)}
          aria-label="Disable RTA Preview"
          title="Turn off device preview"
        >
          <PhoneIcon />
        </Button>
        <Select
          id="rta-preview-device"
          value={api.deviceId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            api.setDevice(e);
            api.zoomFit();
          }}
          aria-label="Select device viewport"
        >
          {DEVICE_CATEGORIES.map(({ label: groupLabel, pattern }) => {
            const keys = (Object.keys(DEVICES) as DeviceId[]).filter((k) => pattern.test(k));
            if (!keys.length) return null;
            return (
              <optgroup key={groupLabel} label={groupLabel}>
                {keys.map((id) => (
                  <option key={id} value={id}>
                    {DEVICES[id].label}
                  </option>
                ))}
              </optgroup>
            );
          })}
        </Select>
      </Row>

      {api.rotatable && (
        <Row>
          <Button
            type="button"
            onClick={api.cycleRotation}
            aria-label={`Rotate (${api.rotation}°)`}
            title={api.rotation === 0 ? "Portrait → Landscape" : "Landscape → Portrait"}
          >
            {api.rotation === 0 ? "↺ Portrait" : "↻ Landscape"}
          </Button>
        </Row>
      )}

      <Row>
        <Button
          type="button"
          onClick={api.zoomOut}
          disabled={!api.canZoomOut}
          aria-label="Zoom out"
          title="Zoom out"
        >
          −
        </Button>
        <Button
          type="button"
          onClick={() => {
            api.zoomFit();
            triggerFitFlash();
          }}
          aria-label="Fit"
          title="Fit to view"
          data-flashing={fitButtonFlash ? "true" : undefined}
        >
          Fit
        </Button>
        <Button
          type="button"
          onClick={api.zoomIn}
          disabled={!api.canZoomIn}
          aria-label="Zoom in"
          title="Zoom in"
        >
          +
        </Button>
        <ZoomPercent aria-label="Zoom percentage" role="status">
          {`${Math.round(api.zoomNum * 100)}%`}
        </ZoomPercent>
      </Row>

      {api.isCustom && (
        <Row>
          <Label htmlFor="rta-preview-width">W</Label>
          <Input
            id="rta-preview-width"
            type="number"
            min={100}
            placeholder="—"
            value={api.customWidth ?? ""}
            onChange={api.setCustomWidth}
            aria-label="Custom width"
          />
          <Label htmlFor="rta-preview-height">H</Label>
          <Input
            id="rta-preview-height"
            type="number"
            min={100}
            placeholder="—"
            value={api.customHeight ?? ""}
            onChange={api.setCustomHeight}
            aria-label="Custom height"
          />
        </Row>
      )}
    </Toolbar>
  );
});
