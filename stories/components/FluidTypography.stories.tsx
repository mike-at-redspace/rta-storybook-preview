import type { Meta, StoryObj } from "@storybook/react";
import { FluidTypography } from "./FluidTypography";

const meta: Meta<typeof FluidTypography> = {
  component: FluidTypography,
  title: "Demo/Fluid Typography",
};

export default meta;

type Story = StoryObj<typeof FluidTypography>;

export const Default: Story = {
  render: () => <FluidTypography />,
};
