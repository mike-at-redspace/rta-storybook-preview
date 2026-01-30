import { memo } from "react";
import { Button } from "./Styles";

/** Phone/mobile icon for the RTA Preview toggle.
 *
 * @returns The phone/mobile icon.
 */
function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="54 1 147 253"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "scale(1.3)" }}
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

export interface EnableProps {
  enabled: boolean;
  onSetEnabled: (value: boolean) => void;
}

/** Enable button for the RTA Preview addon. Uses custom Button (aria-pressed for state); ToggleButton from storybook/internal/components causes manager-bundle crash (React 19 recentlyCreatedOwnerStacks). */
export const Enable = memo(function Enable({ enabled, onSetEnabled }: EnableProps) {
  return (
    <Button
      type="button"
      onClick={() => onSetEnabled(!enabled)}
      aria-label={enabled ? "Disable RTA Preview" : "Enable RTA Preview"}
      title={enabled ? "Turn off device preview" : "Enable device preview"}
    >
      <PhoneIcon />
    </Button>
  );
});
