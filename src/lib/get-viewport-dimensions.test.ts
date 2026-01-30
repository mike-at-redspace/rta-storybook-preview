import { describe, expect, it } from "vitest";
import { getViewportDimensions } from "./get-viewport-dimensions";

describe("getViewportDimensions", () => {
  it("returns custom width/height when both provided and positive", () => {
    expect(getViewportDimensions("iphone14", 400, 800)).toEqual({
      width: 400,
      height: 800,
    });
  });

  it("returns 0,0 for responsive", () => {
    expect(getViewportDimensions("responsive", undefined, undefined)).toEqual({
      width: 0,
      height: 0,
    });
  });

  it("returns device preset for known device", () => {
    expect(getViewportDimensions("iphone14", undefined, undefined)).toEqual({
      width: 390,
      height: 844,
    });
  });

  it("returns custom dimensions when both provided", () => {
    expect(getViewportDimensions("custom", 50, 200)).toEqual({
      width: 50,
      height: 200,
    });
  });

  it("swaps width and height when rotation is 90 or 270", () => {
    expect(getViewportDimensions("iphone14", undefined, undefined, 90)).toEqual({
      width: 844,
      height: 390,
    });
    expect(getViewportDimensions("iphone14", undefined, undefined, 270)).toEqual({
      width: 844,
      height: 390,
    });
    expect(getViewportDimensions("iphone14", undefined, undefined, 0)).toEqual({
      width: 390,
      height: 844,
    });
  });

  it("uses preset dimensions as fallback for custom device with missing dimensions", () => {
    // When custom device but width/height undefined, use preset minimums (100)
    const result = getViewportDimensions("custom", undefined, undefined);
    expect(result.width).toBeGreaterThanOrEqual(100);
    expect(result.height).toBeGreaterThanOrEqual(100);
  });

  it("enforces minimum 100px for custom device with undefined dimensions", () => {
    // When custom device and width is undefined, uses Math.max(100, preset.width)
    const result1 = getViewportDimensions("custom", undefined, 200);
    expect(result1.width).toBeGreaterThanOrEqual(100);
    expect(result1.height).toBe(200);

    // When custom device and height is undefined, uses Math.max(100, preset.height)
    const result2 = getViewportDimensions("custom", 200, undefined);
    expect(result2.width).toBe(200);
    expect(result2.height).toBeGreaterThanOrEqual(100);
  });
});
