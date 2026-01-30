import { describe, expect, it } from "vitest";
import { buildViewportTransform } from "./build-viewport-transform";

describe("buildViewportTransform", () => {
  it("returns undefined when no transform is needed (no pan, scale=1, pan disabled)", () => {
    expect(buildViewportTransform({ x: 0, y: 0 }, 1, false)).toBeUndefined();
  });

  it("returns scale only when scale is not 1 and no pan", () => {
    expect(buildViewportTransform({ x: 0, y: 0 }, 2, false)).toBe("scale(2)");
    expect(buildViewportTransform({ x: 0, y: 0 }, 0.5, false)).toBe("scale(0.5)");
  });

  it("returns translate only when pan is non-zero and isPanEnabled is true, scale=1", () => {
    expect(buildViewportTransform({ x: 10, y: 20 }, 1, true)).toBe("translate(10px, 20px)");
    expect(buildViewportTransform({ x: -5, y: 0 }, 1, true)).toBe("translate(-5px, 0px)");
  });

  it("returns undefined when pan is non-zero but isPanEnabled is false", () => {
    expect(buildViewportTransform({ x: 10, y: 20 }, 1, false)).toBeUndefined();
  });

  it("returns both translate and scale when both are needed", () => {
    expect(buildViewportTransform({ x: 10, y: 20 }, 2, true)).toBe(
      "translate(10px, 20px) scale(2)",
    );
    expect(buildViewportTransform({ x: -5, y: 3 }, 0.5, true)).toBe(
      "translate(-5px, 3px) scale(0.5)",
    );
  });

  it("returns scale only when pan is zero and isPanEnabled is true", () => {
    expect(buildViewportTransform({ x: 0, y: 0 }, 1.5, true)).toBe("scale(1.5)");
  });

  it("returns undefined when pan is zero, scale is 1, isPanEnabled is true", () => {
    expect(buildViewportTransform({ x: 0, y: 0 }, 1, true)).toBeUndefined();
  });
});
