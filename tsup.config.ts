import { defineConfig, type Options } from "tsup";

const NODE_TARGET = "node20.19";

export default defineConfig(async () => {
  const packageJson = (
    await import("./package.json", { with: { type: "json" } })
  ).default as {
    bundler?: {
      managerEntries?: string[];
      previewEntries?: string[];
      nodeEntries?: string[];
    };
  };

  const {
    managerEntries = [],
    previewEntries = [],
    nodeEntries = [],
  } = packageJson.bundler ?? {};

  const commonConfig: Options = {
    splitting: true,
    format: ["esm"],
    treeshake: true,
    clean: false,
    external: ["react", "react-dom", "@storybook/icons"],
    esbuildOptions(options) {
      options.jsx = "automatic";
    },
  };

  const configs: Options[] = [];

  if (managerEntries.length > 0) {
    configs.push({
      ...commonConfig,
      entry: { manager: managerEntries[0] },
      platform: "browser",
      target: "esnext",
      outDir: "dist",
      sourcemap: true,
      dts: false,
    });
  }

  if (previewEntries.length > 0) {
    configs.push({
      ...commonConfig,
      entry: { preview: previewEntries[0] },
      platform: "browser",
      target: "esnext",
      outDir: "dist",
      sourcemap: true,
      dts: true,
      noExternal: ["html2canvas"],
    });
  }

  if (nodeEntries.length > 0) {
    configs.push({
      ...commonConfig,
      entry: { preset: nodeEntries[0] },
      platform: "node",
      target: NODE_TARGET,
      outDir: "dist",
      sourcemap: true,
      dts: false,
    });
  }

  return configs;
});
