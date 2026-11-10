/**
 * Parses every site script with `node --check` so a syntax error can't reach
 * GitHub Pages. Data files under common/data are excluded: they are generated
 * and huge.
 */
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const roots = ["characters/js", "damage/js", "drops", "common/js"];
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".js")) files.push(path);
  }
}

roots.forEach((root) => walk(root));

let failed = 0;
for (const file of files) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (error) {
    failed++;
    console.error(`FAIL ${file}\n${error.stderr ? error.stderr.toString() : error.message}`);
  }
}

console.log(`Checked ${files.length} files, ${failed} failed.`);
process.exit(failed ? 1 : 0);
