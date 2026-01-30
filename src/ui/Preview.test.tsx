import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { usePreviewViewport } from "../hooks";
import { Preview } from "./Preview";

vi.mock("../hooks", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../hooks")>();
  return {
    ...actual,
    usePreviewViewport: vi.fn(),
  };
});

const mockUsePreviewViewport = vi.mocked(usePreviewViewport);

vi.mock("@storybook/preview-api", () => ({
  addons: {
    getChannel: () => ({ on: vi.fn(), off: vi.fn() }),
  },
}));

describe("Preview", () => {
  it("renders container with rta-preview-stage and children when viewport enabled", () => {
    mockUsePreviewViewport.mockReturnValue({
      enabled: true,
      containerRef: { current: null },
      viewportStyle: {},
      stageStyle: {},
      handlePointerDown: vi.fn(),
      dimensionsLabel: "375 × 667",
      showFrame: true,
      showSize: true,
      isConstrained: false,
      scaledWidth: 0,
      scaledHeight: 0,
      deviceWrapperStyle: {},
    } as ReturnType<typeof usePreviewViewport>);

    render(
      <Preview>
        <span>child</span>
      </Preview>,
    );
    const stage = document.querySelector(".rta-preview-stage");
    expect(stage).toBeTruthy();
    expect(screen.getByText("child")).toBeTruthy();
  });

  it("renders only children when viewport enabled is false", () => {
    mockUsePreviewViewport.mockReturnValue({
      enabled: false,
      containerRef: { current: null },
      viewportStyle: {},
      stageStyle: {},
      handlePointerDown: vi.fn(),
      dimensionsLabel: "",
      showFrame: false,
      showSize: false,
      isConstrained: false,
      scaledWidth: 0,
      scaledHeight: 0,
      deviceWrapperStyle: {},
    } as ReturnType<typeof usePreviewViewport>);

    render(
      <Preview>
        <span>child</span>
      </Preview>,
    );
    expect(screen.getByText("child")).toBeTruthy();
    expect(document.querySelector(".rta-preview-stage")).toBeNull();
  });
});
