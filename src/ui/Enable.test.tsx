import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Enable } from "./Enable";

describe("Enable", () => {
  it("renders with enabled true: aria-label and title for disable", () => {
    const onSetEnabled = vi.fn();
    render(<Enable enabled onSetEnabled={onSetEnabled} />);
    const button = screen.getByRole("button", { name: "Disable RTA Preview" });
    expect(button.getAttribute("title")).toBe("Turn off device preview");
  });

  it("renders with enabled false: aria-label and title for enable", () => {
    const onSetEnabled = vi.fn();
    render(<Enable enabled={false} onSetEnabled={onSetEnabled} />);
    const button = screen.getByRole("button", { name: "Enable RTA Preview" });
    expect(button.getAttribute("title")).toBe("Enable device preview");
  });

  it("calls onSetEnabled with toggled value when clicked", () => {
    const onSetEnabled = vi.fn();
    render(<Enable enabled onSetEnabled={onSetEnabled} />);
    const button = screen.getByRole("button", { name: "Disable RTA Preview" });
    fireEvent.click(button);
    expect(onSetEnabled).toHaveBeenCalledTimes(1);
    expect(onSetEnabled).toHaveBeenCalledWith(false);
  });
});
