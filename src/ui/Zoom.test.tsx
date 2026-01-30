import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Zoom } from "./Zoom";

describe("Zoom", () => {
  const defaultProps = {
    zoomNum: 1,
    canZoomIn: true,
    canZoomOut: true,
    fitButtonFlash: false,
    onZoomIn: vi.fn(),
    onZoomOut: vi.fn(),
    onZoomFit: vi.fn(),
  };

  it("renders zoom out, Fit, and zoom in buttons and percentage", () => {
    render(<Zoom {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Zoom out" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Fit" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Zoom in" })).toBeTruthy();
    expect(screen.getByRole("status", { name: "Zoom percentage" }).textContent).toBe("100%");
  });

  it("disables zoom out when canZoomOut is false", () => {
    render(<Zoom {...defaultProps} canZoomOut={false} />);
    expect((screen.getByRole("button", { name: "Zoom out" }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it("disables zoom in when canZoomIn is false", () => {
    render(<Zoom {...defaultProps} canZoomIn={false} />);
    expect((screen.getByRole("button", { name: "Zoom in" }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it("calls onZoomOut when zoom out is clicked", () => {
    const onZoomOut = vi.fn();
    render(<Zoom {...defaultProps} onZoomOut={onZoomOut} />);
    fireEvent.click(screen.getByRole("button", { name: "Zoom out" }));
    expect(onZoomOut).toHaveBeenCalledTimes(1);
  });

  it("calls onZoomFit when Fit is clicked", () => {
    const onZoomFit = vi.fn();
    render(<Zoom {...defaultProps} onZoomFit={onZoomFit} />);
    fireEvent.click(screen.getByRole("button", { name: "Fit" }));
    expect(onZoomFit).toHaveBeenCalledTimes(1);
  });

  it("calls onZoomIn when zoom in is clicked", () => {
    const onZoomIn = vi.fn();
    render(<Zoom {...defaultProps} onZoomIn={onZoomIn} />);
    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
  });
});
