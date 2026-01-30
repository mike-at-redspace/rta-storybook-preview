import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

/**
 * Viewport state and styles for the RTA Preview stage (globals, scale, pan, memoized styles).
 *
 * @returns Object with enabled, containerRef, stageStyle, viewportStyle, dimensionsLabel,
 *   showFrame, showSize, isConstrained, handlePointerDown.
 */
declare function usePreviewViewport(): {
    enabled: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
    stageStyle: React.CSSProperties;
    viewportStyle: React.CSSProperties;
    deviceWrapperStyle: React.CSSProperties;
    scale: number;
    scaledWidth: number;
    scaledHeight: number;
    dimensionsLabel: string;
    showFrame: boolean;
    showSize: boolean;
    isConstrained: boolean;
    handlePointerDown: (e: React.PointerEvent) => void;
};

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
declare const initialGlobals: Record<string, unknown>;
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
declare function getRtaPreviewPreviewConfig(): {
    initialGlobals: Record<string, unknown>;
    globals?: Record<string, unknown>;
};

type PreviewViewportState = ReturnType<typeof usePreviewViewport>;
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
declare function Preview({ children }: PreviewProps): react_jsx_runtime.JSX.Element;
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
declare const withRtaPreview: (Story: React.ComponentType, context: StoryContextViewMode) => react_jsx_runtime.JSX.Element;

export { Preview, type PreviewViewportState, Preview as RtaPreviewDecorator, getRtaPreviewPreviewConfig, initialGlobals, withRtaPreview };
