import type { Preview } from "@storybook/react";
import { getRtaPreviewPreviewConfig, withRtaPreview } from "rta-preview-addon/preview";

const preview: Preview = {
  decorators: [withRtaPreview],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    initialGlobals: {
      backgrounds: { value: "transparent" },
    },
  },
  ...getRtaPreviewPreviewConfig(),
};

export default preview;
