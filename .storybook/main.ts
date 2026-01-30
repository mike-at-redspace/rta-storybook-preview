import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

function getAbsolutePath(packageName: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${packageName}/package.json`)));
}

const config: StorybookConfig = {
  addons: [getAbsolutePath("rta-preview-addon")],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");
    const base =
      configType === "PRODUCTION" && process.env.GITHUB_REPOSITORY != null
        ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
        : configType === "PRODUCTION"
          ? "/rta-storybook-preview/"
          : "/";
    return mergeConfig(config, { base });
  },
};

export default config;
