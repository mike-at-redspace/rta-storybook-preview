import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Rotation } from "./Rotation";

describe("Rotation", () => {
  it("renders nothing when rotatable is false", () => {
    const onCycleRotation = vi.fn();
    const { container } = render(
      <Rotation rotation={0} rotatable={false} onCycleRotation={onCycleRotation} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders button with rotation aria-label and text when rotatable", () => {
    const onCycleRotation = vi.fn();
    render(<Rotation rotation={0} rotatable onCycleRotation={onCycleRotation} />);
    const button = screen.getByRole("button", { name: "Rotate (0°)" });
    expect(button.textContent).toContain("↺ Portrait");
  });

  it("renders landscape label when rotation is 90", () => {
    const onCycleRotation = vi.fn();
    render(<Rotation rotation={90} rotatable onCycleRotation={onCycleRotation} />);
    const button = screen.getByRole("button", { name: "Rotate (90°)" });
    expect(button.textContent).toContain("↻ Landscape");
  });

  it("calls onCycleRotation when clicked", () => {
    const onCycleRotation = vi.fn();
    render(<Rotation rotation={0} rotatable onCycleRotation={onCycleRotation} />);
    const button = screen.getByRole("button", { name: "Rotate (0°)" });
    fireEvent.click(button);
    expect(onCycleRotation).toHaveBeenCalledTimes(1);
  });
});
