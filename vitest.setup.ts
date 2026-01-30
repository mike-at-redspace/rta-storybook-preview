import { createElement } from "react";
import { vi } from "vitest";

// Mock storybook/theming styled components
vi.mock("storybook/theming", () => {
  const styledMock = new Proxy(
    {},
    {
      get: (_target, tag: string) => (_styles: unknown) => (props: Record<string, unknown>) =>
        createElement(tag, props),
    },
  );

  return {
    styled: styledMock,
  };
});

// Mock storybook/internal/components ToggleButton so tests run without Storybook theme
vi.mock("storybook/internal/components", () => {
  function ToggleButton({
    children,
    pressed,
    onClick,
    ariaLabel,
    tooltip,
    ...rest
  }: {
    children?: unknown;
    pressed?: boolean;
    onClick?: () => void;
    ariaLabel?: string;
    tooltip?: string;
    [key: string]: unknown;
  }) {
    return createElement(
      "button",
      {
        type: "button",
        "aria-pressed": pressed,
        "aria-label": ariaLabel,
        title: tooltip,
        onClick,
        ...rest,
      },
      children,
    );
  }
  return { ToggleButton };
});
