import { createElement } from "react";
import { vi } from "vitest";

// Mock @storybook/theming styled components
vi.mock("@storybook/theming", () => {
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
