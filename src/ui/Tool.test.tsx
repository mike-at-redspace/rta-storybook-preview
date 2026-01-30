import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useRtaPreview } from "../hooks";
import { Tool } from "./Tool";

vi.mock("../hooks", () => ({
  useRtaPreview: vi.fn(),
}));

const mockUseRtaPreview = vi.mocked(useRtaPreview);

describe("Tool", () => {
  it("renders only Enable control when api.enabled is false", () => {
    const setEnabled = vi.fn();
    mockUseRtaPreview.mockReturnValue({
      enabled: false,
      setEnabled,
    } as ReturnType<typeof useRtaPreview>);

    render(<Tool />);
    screen.getByRole("button", { name: "Enable RTA Preview" });
    expect(screen.queryByRole("combobox", { name: "Select device viewport" })).toBeNull();
  });

  it("renders full toolbar when api.enabled is true", () => {
    const setEnabled = vi.fn();
    const setDevice = vi.fn();
    const zoomFit = vi.fn();
    const cycleRotation = vi.fn();
    const zoomIn = vi.fn();
    const zoomOut = vi.fn();
    const setCustomWidth = vi.fn();
    const setCustomHeight = vi.fn();

    mockUseRtaPreview.mockReturnValue({
      enabled: true,
      setEnabled,
      deviceId: "iphoneSE",
      setDevice,
      zoomFit,
      rotation: 0,
      rotatable: true,
      cycleRotation,
      zoomNum: 1,
      canZoomIn: true,
      canZoomOut: true,
      zoomIn,
      zoomOut,
      isCustom: false,
      customWidth: undefined,
      customHeight: undefined,
      setCustomWidth,
      setCustomHeight,
      device: { label: "iPhone SE", width: 375, height: 667 },
    } as ReturnType<typeof useRtaPreview>);

    render(<Tool />);
    screen.getByRole("button", { name: "Disable RTA Preview" });
    screen.getByRole("combobox", { name: "Select device viewport" });
    screen.getByRole("button", { name: "Rotate (0°)" });
    screen.getByRole("button", { name: "Zoom out" });
    screen.getByRole("button", { name: "Fit" });
    screen.getByRole("button", { name: "Zoom in" });
    screen.getByRole("button", { name: "Download current view" });
  });

  it("calls setEnabled with false when Enable is clicked and enabled is true", () => {
    const setEnabled = vi.fn();
    mockUseRtaPreview.mockReturnValue({
      enabled: true,
      setEnabled,
      deviceId: "iphoneSE",
      setDevice: vi.fn(),
      zoomFit: vi.fn(),
      rotation: 0,
      rotatable: true,
      cycleRotation: vi.fn(),
      zoomNum: 1,
      canZoomIn: true,
      canZoomOut: true,
      zoomIn: vi.fn(),
      zoomOut: vi.fn(),
      isCustom: false,
      customWidth: undefined,
      customHeight: undefined,
      setCustomWidth: vi.fn(),
      setCustomHeight: vi.fn(),
      device: { label: "iPhone SE", width: 375, height: 667 },
    } as ReturnType<typeof useRtaPreview>);

    render(<Tool />);
    const disableButton = screen.getByRole("button", { name: "Disable RTA Preview" });
    fireEvent.click(disableButton);
    expect(setEnabled).toHaveBeenCalledTimes(1);
    expect(setEnabled).toHaveBeenCalledWith(false);
  });
});
