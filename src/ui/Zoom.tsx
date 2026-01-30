import { memo } from "react";
import { Button, Row, ZoomPercent } from "./Styles";

export interface ZoomProps {
  zoomNum: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  fitButtonFlash: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
}

/** Zoom button for the RTA Preview addon.
 *
 * @param zoomNum - The current zoom level.
 * @param canZoomIn - Whether the zoom can be increased.
 * @param canZoomOut - Whether the zoom can be decreased.
 * @param fitButtonFlash - Whether the fit button is flashing.
 * @param onZoomIn - The function to call when the zoom is increased.
 * @param onZoomOut - The function to call when the zoom is decreased.
 * @param onZoomFit - The function to call when the zoom is fit.
 * @returns The zoom button.
 */
export const Zoom = memo(function Zoom({
  zoomNum,
  canZoomIn,
  canZoomOut,
  fitButtonFlash,
  onZoomIn,
  onZoomOut,
  onZoomFit,
}: ZoomProps) {
  return (
    <Row>
      <Button
        type="button"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
      >
        −
      </Button>
      <Button
        type="button"
        onClick={onZoomFit}
        aria-label="Fit"
        title="Fit to view"
        data-flashing={fitButtonFlash ? "true" : undefined}
      >
        Fit
      </Button>
      <Button
        type="button"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
      >
        +
      </Button>
      <ZoomPercent aria-label="Zoom percentage" role="status">
        {`${Math.round(zoomNum * 100)}%`}
      </ZoomPercent>
    </Row>
  );
});
