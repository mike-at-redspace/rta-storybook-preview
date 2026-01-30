import { describe, expect, it } from "vitest";
import { computeScale } from "./compute-scale";

describe("computeScale", () => {
  it("returns 1 when viewport has zero dimensions", () => {
    expect(computeScale(0, 100, "fit", 500, 500)).toBe(1);
    expect(computeScale(100, 0, "fit", 500, 500)).toBe(1);
  });

  it("returns 1 when container has zero dimensions", () => {
    expect(computeScale(100, 100, "fit", 0, 500)).toBe(1);
    expect(computeScale(100, 100, "fit", 500, 0)).toBe(1);
  });

  it("returns explicit zoom when number and positive", () => {
    expect(computeScale(100, 100, 0.5, 500, 500)).toBe(0.5);
    expect(computeScale(100, 100, 2, 500, 500)).toBe(2);
  });

  it("clamps zoom to ZOOM_CONFIG min/max", () => {
    expect(computeScale(100, 100, 0.05, 500, 500)).toBe(0.1);
    expect(computeScale(100, 100, 5, 500, 500)).toBe(3);
  });

  it("returns fit scale min of scaleX, scaleY, 1", () => {
    expect(computeScale(200, 200, "fit", 400, 400)).toBe(1);
    expect(computeScale(400, 400, "fit", 200, 200)).toBe(0.5);
  });
});
