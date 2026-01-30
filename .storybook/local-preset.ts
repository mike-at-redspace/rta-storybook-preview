import { fileURLToPath } from "node:url";

/** Manager entry so the addon toolbar loads. */
export function managerEntries(entry: string[] = []): string[] {
  return [...entry, fileURLToPath(import.meta.resolve("../dist/manager.js"))];
}

/** Preview annotations so the addon decorator runs in the iframe. */
export function previewAnnotations(entry: string[] = []): string[] {
  return [...entry, fileURLToPath(import.meta.resolve("../dist/preview.js"))];
}
