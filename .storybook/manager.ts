import { addons } from "storybook/manager-api";
import { themes } from "storybook/theming";

/** Dark theme only; hide default toolbar tools so only RTA Preview addon shows. */
addons.setConfig({
  theme: themes.dark,
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});
