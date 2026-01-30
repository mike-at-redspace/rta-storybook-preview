import { addons, types } from "@storybook/manager-api";
import { ADDON_ID } from "../constants";
import { Tool } from "./Tool";

/** Register the RTA Preview addon in Storybook. */
addons.register(ADDON_ID, () => {
  addons.add(`${ADDON_ID}/toolbar`, {
    type: types.TOOL,
    title: "Ṛta (ऋत) - Storybook Preview",
    match: ({ viewMode }) => viewMode === "story",
    render: () => <Tool />,
  });
});

export { Tool };
