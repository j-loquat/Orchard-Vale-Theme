#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const targets = [path.join(root, "demo"), path.join(root, "src", "assets", "orchard-vale")];
const eagerThresholds = new Map([
  ["index.html", 1],
  ["friendly-town.html", 4],
  ["town-notice-board.html", 4],
  ["guildhall-planner.html", 6],
  ["command-center.html", 8],
  ["scholars-hollow-workbench.html", 8],
  ["guildhall-project-board.html", 8],
  ["character-gallery.html", 6],
  ["asset-pattern-library.html", 2],
  ["orchard-morning-briefing.html", 1],
  ["orchard-research-report.html", 1],
  ["prosperity-grove-ledger.html", 2],
]);

async function htmlFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await htmlFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) output.push(fullPath);
  }
  return output;
}

function addAttribute(tag, attribute) {
  return tag.replace(/\s*\/?>(\s*)$/, ` ${attribute}>$1`);
}

let changed = 0;
for (const target of targets) {
  for (const file of await htmlFiles(target)) {
    const original = await readFile(file, "utf8");
    const isDemo = path.dirname(file) === path.join(root, "demo");
    const eagerCount = isDemo ? (eagerThresholds.get(path.basename(file)) ?? 3) : 2;
    let imageIndex = 0;
    const updated = original.replace(/<img\b[^>]*>/g, (tag) => {
      const currentIndex = imageIndex++;
      let next = tag;
      if (!/\bdecoding\s*=/.test(next)) next = addAttribute(next, 'decoding="async"');
      if (currentIndex >= eagerCount && !/\bloading\s*=/.test(next) && !/\bsrc\s*=\s*["']data:/.test(next)) {
        next = addAttribute(next, 'loading="lazy"');
      }
      return next;
    });
    if (updated !== original) {
      await writeFile(file, updated, "utf8");
      changed += 1;
    }
  }
}

console.log(`Updated image loading hints in ${changed} HTML files.`);
