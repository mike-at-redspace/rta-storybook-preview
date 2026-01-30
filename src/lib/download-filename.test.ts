import { describe, expect, it } from "vitest";
import { sanitizeFilenameForDownload } from "./download-filename";

describe("sanitizeFilenameForDownload", () => {
  it("replaces spaces with dashes", () => {
    expect(sanitizeFilenameForDownload("My Device Label")).toBe("My-Device-Label");
  });

  it("replaces ' / ' with a single dash", () => {
    expect(sanitizeFilenameForDownload("Device / Label")).toBe("Device-Label");
    expect(sanitizeFilenameForDownload("Device/Label")).toBe("Device-Label");
    expect(sanitizeFilenameForDownload("Device /Label")).toBe("Device-Label");
    expect(sanitizeFilenameForDownload("Device/ Label")).toBe("Device-Label");
  });

  it("removes invalid characters", () => {
    expect(sanitizeFilenameForDownload("Device:Label*?")).toBe("DeviceLabel");
    expect(sanitizeFilenameForDownload("Device@Label#Test!")).toBe("DeviceLabelTest");
  });

  it("collapses multiple dashes", () => {
    expect(sanitizeFilenameForDownload("Device  /  Label")).toBe("Device-Label");
    expect(sanitizeFilenameForDownload("Device---Label")).toBe("Device-Label");
  });

  it("removes leading and trailing dashes", () => {
    expect(sanitizeFilenameForDownload("  Device Label  ")).toBe("Device-Label");
    expect(sanitizeFilenameForDownload("-Device Label-")).toBe("Device-Label");
  });

  it("allows dots and underscores", () => {
    expect(sanitizeFilenameForDownload("Device.Label_Name")).toBe("Device.Label_Name");
  });

  it("returns 'preview' for empty or invalid input", () => {
    expect(sanitizeFilenameForDownload("")).toBe("preview");
    expect(sanitizeFilenameForDownload("   ")).toBe("preview");
    expect(sanitizeFilenameForDownload("///")).toBe("preview");
    expect(sanitizeFilenameForDownload("!!!")).toBe("preview");
  });

  it("handles mixed cases", () => {
    expect(sanitizeFilenameForDownload("My / Device: Label!")).toBe("My-Device-Label");
  });
});
