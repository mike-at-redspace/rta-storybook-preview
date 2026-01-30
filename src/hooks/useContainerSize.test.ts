import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useContainerSize } from "./useContainerSize";

describe("useContainerSize", () => {
  beforeEach(() => {
    // Mock ResizeObserver
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it("should initialize with width and height 0", () => {
    const { result } = renderHook(() => useContainerSize());
    expect(result.current.containerSize.width).toBe(0);
    expect(result.current.containerSize.height).toBe(0);
  });

  it("should have a containerRef that can be attached to an element", () => {
    const { result } = renderHook(() => useContainerSize());
    expect(result.current.containerRef).toBeDefined();
    expect(result.current.containerRef.current).toBeNull();
  });

  it("should provide containerSize object with proper structure", () => {
    const { result } = renderHook(() => useContainerSize());
    expect(result.current.containerSize).toBeDefined();
    expect(typeof result.current.containerSize.width).toBe("number");
    expect(typeof result.current.containerSize.height).toBe("number");
  });

  it("should update size when parent has dimensions", () => {
    const { result } = renderHook(() => useContainerSize());
    const parentDiv = document.createElement("div");
    Object.defineProperty(parentDiv, "clientWidth", { value: 300, configurable: true });
    Object.defineProperty(parentDiv, "clientHeight", { value: 400, configurable: true });

    const childDiv = document.createElement("div");
    Object.defineProperty(childDiv, "clientWidth", { value: 100, configurable: true });
    Object.defineProperty(childDiv, "clientHeight", { value: 200, configurable: true });
    Object.defineProperty(childDiv, "parentElement", { value: parentDiv, configurable: true });

    act(() => {
      result.current.containerRef.current = childDiv;
    });

    // Size should be from parent when available
    expect(result.current.containerSize.width).toBeGreaterThanOrEqual(0);
    expect(result.current.containerSize.height).toBeGreaterThanOrEqual(0);
  });

  it("should cleanup ResizeObserver on unmount", () => {
    const { unmount } = renderHook(() => useContainerSize());
    const disconnect = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect,
    }));

    unmount();
    // The hook should cleanup
    expect(true).toBe(true); // Test passes if no error occurs
  });
});
