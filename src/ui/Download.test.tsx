import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RTA_PREVIEW_DOWNLOAD_VIEW } from "../constants";
import { Download } from "./Download";

const mockEmit = vi.fn();

vi.mock("@storybook/manager-api", () => ({
  addons: {
    getChannel: () => ({ emit: mockEmit }),
  },
}));

describe("Download", () => {
  beforeEach(() => {
    mockEmit.mockClear();
  });

  it("renders download button with aria-label", () => {
    render(<Download deviceLabel="iPhone SE" deviceId="iphone-se" />);
    screen.getByRole("button", { name: "Download current view" });
  });

  it("calls emit with RTA_PREVIEW_DOWNLOAD_VIEW and filename when clicked", () => {
    render(<Download deviceLabel="iPhone SE" deviceId="iphone-se" />);
    const button = screen.getByRole("button", { name: "Download current view" });
    fireEvent.click(button);
    expect(mockEmit).toHaveBeenCalledTimes(1);
    expect(mockEmit).toHaveBeenCalledWith(RTA_PREVIEW_DOWNLOAD_VIEW, {
      filename: "iPhone-SE.png",
    });
  });

  it("uses deviceId when deviceLabel is undefined for filename", () => {
    render(<Download deviceLabel={undefined} deviceId="custom" />);
    const button = screen.getByRole("button", { name: "Download current view" });
    fireEvent.click(button);
    expect(mockEmit).toHaveBeenCalledWith(RTA_PREVIEW_DOWNLOAD_VIEW, {
      filename: "custom.png",
    });
  });
});
