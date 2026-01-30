import { fileURLToPath } from 'url';

// src/preset.ts
function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve("rta-preview-addon/manager"))];
}

export { managerEntries };
//# sourceMappingURL=preset.js.map
//# sourceMappingURL=preset.js.map