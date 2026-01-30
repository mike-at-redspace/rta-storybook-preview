import { memo } from "react";
import { addons } from "storybook/manager-api";
import { RTA_PREVIEW_DOWNLOAD_VIEW } from "../constants";
import { sanitizeFilenameForDownload } from "../lib";
import { Button } from "./Styles";

/** Download icon for saving the current view.
 *
 * @param size - The size of the icon.
 * @returns The download icon.
 */
function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <title>Download</title>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export interface DownloadProps {
  deviceLabel: string | undefined;
  deviceId: string;
}

/** Download button for the RTA Preview addon.
 *
 * @param deviceLabel - The current device label.
 * @param deviceId - The current device id.
 * @returns The download button.
 */
export const Download = memo(function Download({ deviceLabel, deviceId }: DownloadProps) {
  const handleClick = () => {
    const label = deviceLabel ?? deviceId;
    const base = sanitizeFilenameForDownload(label);
    const filename = `${base}.png`;
    addons.getChannel().emit(RTA_PREVIEW_DOWNLOAD_VIEW, { filename });
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      aria-label="Download current view"
      title="Download current view"
    >
      <DownloadIcon />
    </Button>
  );
});
