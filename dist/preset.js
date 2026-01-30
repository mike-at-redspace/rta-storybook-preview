// src/preset.ts
import { fileURLToPath } from "url";
function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve("rta-preview-addon/manager"))];
}
export {
  managerEntries
};
//# sourceMappingURL=preset.js.map