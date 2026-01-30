#!/usr/bin/env node
import { spawnSync } from "node:child_process";
/**
 * Only run husky when this package is in a git repo (direct clone).
 * When the package is linked globally and the consumer runs install,
 * we may run from a context where husky would fail; skip silently.
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const gitDir = resolve(process.cwd(), ".git");
if (existsSync(gitDir)) {
  spawnSync("husky", ["install"], {
    stdio: "inherit",
    shell: true,
  });
}
