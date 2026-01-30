import { memo, useCallback, useEffect, useState } from "react";
import { TOOL_ID } from "../constants";
import { useRtaPreview } from "../hooks";
import { CustomDimensions } from "./CustomDimensions";
import { Device } from "./Device";
import { Download } from "./Download";
import { Enable } from "./Enable";
import { Rotation } from "./Rotation";
import { FIT_BUTTON_FLASH_STYLE, Row, Toolbar as ToolbarRoot } from "./Styles";
import { Zoom } from "./Zoom";

const FIT_FLASH_DURATION_MS = 500;

/** Toolbar for the RTA Preview addon.
 *
 * @returns The toolbar.
 */
export const Tool = memo(function Toolbar() {
  const api = useRtaPreview();
  const [fitButtonFlash, setFitButtonFlash] = useState(false);

  const triggerFitFlash = useCallback(() => setFitButtonFlash(true), []);

  useEffect(() => {
    if (!fitButtonFlash) return;
    const id = setTimeout(() => setFitButtonFlash(false), FIT_FLASH_DURATION_MS);
    return () => clearTimeout(id);
  }, [fitButtonFlash]);

  useEffect(() => {
    triggerFitFlash();
  }, [triggerFitFlash]);

  const handleDeviceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      api.setDevice(e);
      api.zoomFit();
    },
    [api],
  );

  const handleZoomFit = useCallback(() => {
    api.zoomFit();
    triggerFitFlash();
  }, [api, triggerFitFlash]);

  if (!api.enabled) {
    return (
      <ToolbarRoot key={TOOL_ID} className="rta-preview-toolbar">
        <Enable enabled={false} onSetEnabled={api.setEnabled} />
      </ToolbarRoot>
    );
  }

  return (
    <ToolbarRoot key={TOOL_ID} className="rta-preview-toolbar">
      {FIT_BUTTON_FLASH_STYLE}
      <Row>
        <Enable enabled onSetEnabled={api.setEnabled} />
        <Device deviceId={api.deviceId} onDeviceChange={handleDeviceChange} />
      </Row>
      <Rotation
        rotation={api.rotation}
        rotatable={api.rotatable}
        onCycleRotation={api.cycleRotation}
      />
      <Zoom
        zoomNum={api.zoomNum}
        canZoomIn={api.canZoomIn}
        canZoomOut={api.canZoomOut}
        fitButtonFlash={fitButtonFlash}
        onZoomIn={api.zoomIn}
        onZoomOut={api.zoomOut}
        onZoomFit={handleZoomFit}
      />
      {api.isCustom && (
        <CustomDimensions
          customWidth={api.customWidth}
          customHeight={api.customHeight}
          onCustomWidthChange={api.setCustomWidth}
          onCustomHeightChange={api.setCustomHeight}
        />
      )}
      <Download deviceLabel={api.device?.label} deviceId={api.deviceId} />
    </ToolbarRoot>
  );
});
