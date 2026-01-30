import { fileURLToPath } from "node:url";

/**
 * Preset entry for Storybook. Exports managerEntries so Storybook loads the addon manager
 * (toolbar) when the addon is listed in addons. Runs in Node when Storybook resolves the addon.
 *
 * @param entry - Existing manager entry paths from Storybook.
 * @returns Entry array with this addon's manager bundle path appended.
 */
export function managerEntries(entry: string[] = []): string[] {
  return [...entry, fileURLToPath(import.meta.resolve("rta-preview-addon/manager"))];
}
