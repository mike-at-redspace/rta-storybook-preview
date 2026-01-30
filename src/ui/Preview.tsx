import { addons } from "@storybook/preview-api";
import html2canvas from "html2canvas";
import type React from "react";
import { useEffect, useRef } from "react";
import { FRAME_STYLE, RTA_PREVIEW_DOWNLOAD_VIEW, SIZE_OVERLAY_STYLE } from "../constants";
import { usePreviewViewport } from "../hooks";
import { THIN_SCROLLBAR_STYLE } from "./Styles";
export type PreviewViewportState = ReturnType<typeof usePreviewViewport>;

interface PreviewViewProps {
  viewport: PreviewViewportState;
  children: React.ReactNode;
}

/** Preview view for the RTA Preview addon.
 *
 * @param viewport - The viewport state.
 * @param children - The children to render.
 * @returns The preview view.
 */
function PreviewView({ viewport: v, children }: PreviewViewProps) {
  const containerRefRef = useRef(v.containerRef);
  const enabledRef = useRef(v.enabled);
  containerRefRef.current = v.containerRef;
  enabledRef.current = v.enabled;

  useEffect(() => {
    const channel = addons.getChannel();
    const handler = (payload: { filename?: string } | undefined) => {
      if (!enabledRef.current || !containerRefRef.current?.current) return;
      const filename = payload?.filename ?? "preview.png";
      const element = containerRefRef.current.current;
      html2canvas(element, { useCORS: true })
        .then((canvas) => {
          canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
          }, "image/png");
        })
        .catch(() => {});
    };
    channel.on(RTA_PREVIEW_DOWNLOAD_VIEW, handler);
    return () => channel.off(RTA_PREVIEW_DOWNLOAD_VIEW, handler);
  }, []);

  if (!v.enabled) {
    return <>{children}</>;
  }

  const viewport = (
    <div style={v.viewportStyle} className="rta-preview-viewport">
      {children}
    </div>
  );

  const scaledWrapperStyle: React.CSSProperties =
    v.isConstrained && v.scaledWidth > 0 && v.scaledHeight > 0
      ? {
          width: v.scaledWidth,
          height: v.scaledHeight,
          overflow: "hidden" as const,
          position: "relative" as const,
          flexShrink: 0,
        }
      : {};

  const content =
    v.isConstrained && v.scaledWidth > 0 && v.scaledHeight > 0 ? (
      <div style={scaledWrapperStyle} className="rta-preview-scaled-wrapper">
        {viewport}
      </div>
    ) : (
      viewport
    );

  return (
    <div
      ref={v.containerRef}
      style={v.stageStyle}
      className="rta-preview-stage"
      onPointerDownCapture={v.handlePointerDown}
    >
      {THIN_SCROLLBAR_STYLE}
      <div style={v.deviceWrapperStyle}>
        {v.showFrame && v.isConstrained ? (
          <div style={FRAME_STYLE} className="rta-preview-device-frame">
            {content}
          </div>
        ) : (
          content
        )}
        {v.showSize && v.isConstrained && (
          <output
            style={SIZE_OVERLAY_STYLE}
            aria-live="polite"
            aria-label={`Viewport dimensions: ${v.dimensionsLabel}`}
          >
            {v.dimensionsLabel}
          </output>
        )}
      </div>
    </div>
  );
}

/** Props for the Preview component. */
interface PreviewProps {
  /** Story content to render inside the viewport. */
  children: React.ReactNode;
}

/**
 * RTA Preview stage: wraps story content in a viewport with device dimensions,
 * zoom, pan (when zoomed), optional frame and dimensions overlay.
 * Reads and writes state via Storybook globals. Use inside a story or as a wrapper.
 *
 * @param props - Component props.
 * @param props.children - Story content to render inside the viewport.
 * @returns JSX for the preview stage.
 */
export function Preview({ children }: PreviewProps) {
  const viewport = usePreviewViewport();
  return <PreviewView viewport={viewport}>{children}</PreviewView>;
}

// -----------------------------------------------------------------------------
// Decorator (hook must run here so Storybook allows it)
// -----------------------------------------------------------------------------

/** Story context shape for viewMode; full type lives in Storybook. */
interface StoryContextViewMode {
  viewMode?: string;
}

/**
 * Storybook decorator that wraps stories in the RTA preview viewport.
 * Does not wrap on docs view (viewMode === "docs") so docs pages are not broken.
 * Preview hooks (useGlobals) must be called inside the decorator function, not in a child.
 * Use in `.storybook/preview.ts` so all stories get the viewport and toolbar controls.
 *
 * @param Story - The story component to render inside the viewport.
 * @param context - Storybook context; viewMode "docs" skips the wrapper.
 * @returns JSX wrapping Story in the Preview viewport, or Story alone on docs.
 */
export const withRtaPreview = (Story: React.ComponentType, context: StoryContextViewMode) => {
  const viewport = usePreviewViewport();
  if (context?.viewMode === "docs") {
    return <Story />;
  }
  return (
    <PreviewView viewport={viewport}>
      <Story />
    </PreviewView>
  );
};

/** @deprecated Use Preview instead. Kept for backwards compatibility. */
export { Preview as RtaPreviewDecorator };

export { getRtaPreviewPreviewConfig, initialGlobals } from "../initial-globals";
