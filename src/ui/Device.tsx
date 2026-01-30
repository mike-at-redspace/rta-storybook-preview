import type React from "react";
import { memo } from "react";
import type { DeviceId } from "../devices";
import { DEVICE_CATEGORIES, DEVICES } from "../devices";
import { Select } from "./Styles";

export interface DeviceProps {
  deviceId: string;
  onDeviceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/** Device selector for the RTA Preview addon.
 *
 * @param deviceId - The current device id.
 * @param onDeviceChange - The function to call when the device is changed.
 * @returns The device selector.
 */
export const Device = memo(function Device({ deviceId, onDeviceChange }: DeviceProps) {
  return (
    <Select
      id="rta-preview-device"
      value={deviceId}
      onChange={onDeviceChange}
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
  );
});
