import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebouncedResize } from "./useDebouncedResize";

describe("useDebouncedResize", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should call callback after delay", () => {
    const callback = vi.fn();
    renderHook(() => useDebouncedResize(callback, 100, []));

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should debounce multiple calls when deps change", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(
      ({ delay, deps }) => useDebouncedResize(callback, delay, deps),
      { initialProps: { delay: 100, deps: [1] } },
    );

    expect(callback).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);

    // Change deps before timer fires
    rerender({ delay: 100, deps: [2] });
    vi.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    // Now wait for full delay
    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should use latest callback reference", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(({ cb }) => useDebouncedResize(cb, 100, []), {
      initialProps: { cb: callback1 },
    });

    // Update callback before timer fires
    rerender({ cb: callback2 });

    vi.advanceTimersByTime(100);
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it("should cleanup timeout on unmount", () => {
    const callback = vi.fn();
    const { unmount } = renderHook(() => useDebouncedResize(callback, 100, []));

    unmount();
    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();
  });

  it("should reschedule when delayMs changes", () => {
    const callback = vi.fn();
    const { rerender } = renderHook(({ delay }) => useDebouncedResize(callback, delay, []), {
      initialProps: { delay: 100 },
    });

    vi.advanceTimersByTime(50);
    rerender({ delay: 200 });

    vi.advanceTimersByTime(100);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
