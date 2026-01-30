import * as managerApi from "@storybook/manager-api";
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useRtaPreview } from "./useRtaPreview";

// Mock Storybook manager-api
vi.mock("@storybook/manager-api", () => ({
  useGlobals: vi.fn(() => [
    {
      rtaEnabled: true,
      rtaDevice: "iPhone 13",
      rtaRotate: 0,
      rtaZoom: 1,
      rtaCustomWidth: undefined,
      rtaCustomHeight: undefined,
      rtaToolbarVisible: true,
    },
    vi.fn(),
  ]),
  useStorybookApi: vi.fn(() => ({
    setAddonShortcut: vi.fn(),
  })),
}));

describe("useRtaPreview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should read enabled state from globals", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(result.current.enabled).toBeDefined();
  });

  it("should read device from globals", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(result.current.deviceId).toBeDefined();
  });

  it("should read rotation from globals", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(result.current.rotation).toBeDefined();
  });

  it("should provide setDevice callback", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.setDevice).toBe("function");
  });

  it("should provide cycleRotation callback", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.cycleRotation).toBe("function");
  });

  it("should provide zoom callbacks", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.zoomIn).toBe("function");
    expect(typeof result.current.zoomOut).toBe("function");
    expect(typeof result.current.zoomFit).toBe("function");
  });

  it("should provide custom dimension setters", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.setCustomWidth).toBe("function");
    expect(typeof result.current.setCustomHeight).toBe("function");
  });

  it("should provide setEnabled callback", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.setEnabled).toBe("function");
  });

  it("should provide toggleToolbar callback", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.toggleToolbar).toBe("function");
  });

  it("should register keyboard shortcuts on mount", () => {
    const mockSetAddonShortcut = vi.fn();
    vi.mocked(managerApi.useStorybookApi).mockReturnValue({
      setAddonShortcut: mockSetAddonShortcut,
    } as ReturnType<typeof managerApi.useStorybookApi>);

    renderHook(() => useRtaPreview());

    expect(mockSetAddonShortcut).toHaveBeenCalled();
  });

  it("should provide UI helpers for zoom controls", () => {
    const { result } = renderHook(() => useRtaPreview());
    expect(typeof result.current.zoomNum).toBe("number");
    expect(typeof result.current.canZoomIn).toBe("boolean");
    expect(typeof result.current.canZoomOut).toBe("boolean");
  });
});
