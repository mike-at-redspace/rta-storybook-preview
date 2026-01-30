import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CustomDimensions } from "./CustomDimensions";

describe("CustomDimensions", () => {
  it("renders W and H labels and inputs with aria-labels", () => {
    const onCustomWidthChange = vi.fn();
    const onCustomHeightChange = vi.fn();
    render(
      <CustomDimensions
        customWidth={400}
        customHeight={600}
        onCustomWidthChange={onCustomWidthChange}
        onCustomHeightChange={onCustomHeightChange}
      />,
    );
    expect(screen.getByLabelText("W")).toBeTruthy();
    expect(screen.getByLabelText("H")).toBeTruthy();
    const widthInput = screen.getByRole("spinbutton", { name: "Custom width" });
    const heightInput = screen.getByRole("spinbutton", { name: "Custom height" });
    expect((widthInput as HTMLInputElement).value).toBe("400");
    expect((heightInput as HTMLInputElement).value).toBe("600");
  });

  it("shows empty value when customWidth/customHeight are undefined", () => {
    const onCustomWidthChange = vi.fn();
    const onCustomHeightChange = vi.fn();
    render(
      <CustomDimensions
        customWidth={undefined}
        customHeight={undefined}
        onCustomWidthChange={onCustomWidthChange}
        onCustomHeightChange={onCustomHeightChange}
      />,
    );
    const widthInput = screen.getByRole("spinbutton", { name: "Custom width" });
    const heightInput = screen.getByRole("spinbutton", { name: "Custom height" });
    expect((widthInput as HTMLInputElement).value).toBe("");
    expect((heightInput as HTMLInputElement).value).toBe("");
  });

  it("calls onCustomWidthChange when width input changes", () => {
    const onCustomWidthChange = vi.fn();
    const onCustomHeightChange = vi.fn();
    render(
      <CustomDimensions
        customWidth={400}
        customHeight={600}
        onCustomWidthChange={onCustomWidthChange}
        onCustomHeightChange={onCustomHeightChange}
      />,
    );
    const widthInput = screen.getByRole("spinbutton", { name: "Custom width" });
    fireEvent.change(widthInput, { target: { value: "500" } });
    expect(onCustomWidthChange).toHaveBeenCalledTimes(1);
    expect(onCustomWidthChange.mock.calls[0][0].type).toBe("change");
  });

  it("calls onCustomHeightChange when height input changes", () => {
    const onCustomWidthChange = vi.fn();
    const onCustomHeightChange = vi.fn();
    render(
      <CustomDimensions
        customWidth={400}
        customHeight={600}
        onCustomWidthChange={onCustomWidthChange}
        onCustomHeightChange={onCustomHeightChange}
      />,
    );
    const heightInput = screen.getByRole("spinbutton", { name: "Custom height" });
    fireEvent.change(heightInput, { target: { value: "800" } });
    expect(onCustomHeightChange).toHaveBeenCalledTimes(1);
    expect(onCustomHeightChange.mock.calls[0][0].type).toBe("change");
  });
});
