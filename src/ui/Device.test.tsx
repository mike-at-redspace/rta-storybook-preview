import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Device } from "./Device";

describe("Device", () => {
  it("renders select with correct value and aria-label", () => {
    const onDeviceChange = vi.fn();
    render(<Device deviceId="iphoneSE" onDeviceChange={onDeviceChange} />);
    const select = screen.getByRole("combobox", { name: "Select device viewport" });
    expect((select as HTMLSelectElement).value).toBe("iphoneSE");
  });

  it("renders option groups with device options", () => {
    const onDeviceChange = vi.fn();
    render(<Device deviceId="iphoneSE" onDeviceChange={onDeviceChange} />);
    screen.getByRole("combobox", { name: "Select device viewport" });
    const options = screen.getAllByRole("option");
    expect(options.length).toBeGreaterThan(0);
  });

  it("calls onDeviceChange when select value changes", () => {
    const onDeviceChange = vi.fn();
    render(<Device deviceId="iphoneSE" onDeviceChange={onDeviceChange} />);
    const select = screen.getByRole("combobox", { name: "Select device viewport" });
    fireEvent.change(select, { target: { value: "custom" } });
    expect(onDeviceChange).toHaveBeenCalledTimes(1);
    expect(onDeviceChange.mock.calls[0][0].type).toBe("change");
  });
});
