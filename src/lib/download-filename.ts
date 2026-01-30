/**
 * Returns a filesystem-safe filename (no extension) from a device label.
 * Replaces spaces and " / " with "-", strips other invalid characters.
 *
 * @param label - The device label
 * @returns The sanitized filename
 */
export function sanitizeFilenameForDownload(label: string): string {
  return (
    label
      .replace(/\s*\/\s*/g, "-")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "preview"
  );
}
