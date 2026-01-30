import type { Preview } from "@storybook/react";
import { getRtaPreviewPreviewConfig, withRtaPreview } from "rta-preview-addon/preview";

const rtaConfig = getRtaPreviewPreviewConfig();

const preview: Preview = {
  decorators: [withRtaPreview],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  ...rtaConfig,
  initialGlobals: {
    ...rtaConfig.initialGlobals,
    backgrounds: { value: "transparent" },
  },
};

export default preview;
