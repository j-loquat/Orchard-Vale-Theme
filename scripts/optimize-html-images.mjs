#!/usr/bin/env node
// Adds image performance hints to <img> tags in the theme kit's HTML.
//   - decoding="async" on every image
//   - loading="lazy" on every non-hero (below-the-fold) image
//   - intrinsic width/height (read from the local PNG, WebP, JPEG or SVG file)
//     so the browser can reserve space and avoid layout shift (CLS)
//
// Usage: node scripts/optimize-html-images.mjs [--write | --check]
//   --write  Rewrite files in place (default).
//   --check  Change nothing; list files that need updates and exit 1 if any do.

import { access, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");
if (args.has("--write") && checkOnly) {
  console.error("Use either --check or --write, not both.");
  process.exit(2);
}

const targets = [
  path.join(root, "demo"),
  path.join(root, "starter", "index.html"),
  path.join(root, "index.html"),
  path.join(root, "src", "assets", "orchard-vale"),
];
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

async function htmlFiles(target) {
  let entries;
  try {
    entries = await readdir(target, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOTDIR") return target.endsWith(".html") ? [target] : [];
    if (error.code === "ENOENT") return [];
    throw error;
  }
  const output = [];
  for (const entry of entries) {
    const fullPath = path.join(target, entry.name);
    if (entry.isDirectory()) output.push(...await htmlFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith(".html")) output.push(fullPath);
  }
  return output;
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function addAttributes(tag, attributes) {
  return tag.replace(/\s*\/?>(\s*)$/, ` ${attributes.join(" ")}>$1`);
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
}

// ---------------------------------------------------------- image dimensions

function pngSize(buffer) {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (buffer.length < 24 || !signature.every((byte, i) => buffer[i] === byte)) return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function webpSize(buffer) {
  if (buffer.length < 30 || buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    if (buffer[23] !== 0x9d || buffer[24] !== 0x01 || buffer[25] !== 0x2a) return null;
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  }
  if (chunk === "VP8L") {
    if (buffer[20] !== 0x2f) return null;
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") {
    return { width: buffer.readUIntLE(24, 3) + 1, height: buffer.readUIntLE(27, 3) + 1 };
  }
  return null;
}

function jpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    const isFrame = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isFrame) return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
}

function svgSize(text) {
  const root = text.match(/<svg\b[^>]*>/i)?.[0];
  if (!root) return null;
  const length = (name) => {
    const value = getAttribute(root, name);
    const match = value?.trim().match(/^([0-9]*\.?[0-9]+)(?:px)?$/i);
    return match ? Number(match[1]) : null;
  };
  const width = length("width");
  const height = length("height");
  if (width && height) return { width: Math.round(width), height: Math.round(height) };
  const viewBox = getAttribute(root, "viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (viewBox?.length === 4 && viewBox[2] > 0 && viewBox[3] > 0) {
    return { width: Math.round(viewBox[2]), height: Math.round(viewBox[3]) };
  }
  return null;
}

const sizeCache = new Map();
async function imageSize(file) {
  if (sizeCache.has(file)) return sizeCache.get(file);
  let size = null;
  try {
    await access(file);
    const extension = path.extname(file).toLowerCase();
    if (extension === ".svg") size = svgSize(await readFile(file, "utf8"));
    else {
      const buffer = await readFile(file);
      // Sniff the real format from the bytes first so a misnamed file still yields true dimensions.
      size = pngSize(buffer) ?? webpSize(buffer) ?? jpegSize(buffer);
    }
  } catch {
    size = null;
  }
  sizeCache.set(file, size);
  return size;
}

async function localImagePath(htmlFile, tag) {
  const src = getAttribute(tag, "src");
  if (!src || /^(?:data:|https?:|\/\/|blob:)/i.test(src) || src.includes("${") || src.includes("{{")) return null;
  try {
    return path.resolve(path.dirname(htmlFile), decodeURIComponent(src.split("#")[0].split("?")[0]));
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------------- main

const files = new Set();
for (const target of targets) for (const file of await htmlFiles(target)) files.add(file);

const stats = { files: 0, changedFiles: [], images: 0, dimensions: 0, decoding: 0, lazy: 0 };
const unresolved = [];

for (const file of [...files].sort()) {
  stats.files += 1;
  const original = await readFile(file, "utf8");
  const isDemo = path.dirname(file) === path.join(root, "demo");
  const eagerCount = isDemo ? (eagerThresholds.get(path.basename(file)) ?? 3) : 2;

  const tags = Array.from(original.matchAll(/<img\b[^>]*>/g));
  const replacements = [];
  for (const [currentIndex, match] of tags.entries()) {
    stats.images += 1;
    const tag = match[0];
    const additions = [];
    if (!/\bdecoding\s*=/.test(tag)) {
      additions.push('decoding="async"');
      stats.decoding += 1;
    }
    const isDataUri = /\bsrc\s*=\s*["']data:/.test(tag);
    if (currentIndex >= eagerCount && !/\bloading\s*=/.test(tag) && !isDataUri) {
      additions.push('loading="lazy"');
      stats.lazy += 1;
    }
    // Only fill in dimensions when neither is set; one-sided sizing is usually deliberate CSS.
    if (!/\swidth\s*=/.test(tag) && !/\sheight\s*=/.test(tag)) {
      const imagePath = await localImagePath(file, tag);
      if (imagePath) {
        const size = await imageSize(imagePath);
        if (size) {
          additions.push(`width="${size.width}"`, `height="${size.height}"`);
          stats.dimensions += 1;
        } else {
          unresolved.push(`${relative(file)}: could not read dimensions for ${getAttribute(tag, "src")}`);
        }
      }
    }
    if (additions.length) replacements.push({ index: match.index, tag, next: addAttributes(tag, additions) });
  }

  if (!replacements.length) continue;
  let updated = "";
  let cursor = 0;
  for (const item of replacements) {
    updated += original.slice(cursor, item.index) + item.next;
    cursor = item.index + item.tag.length;
  }
  updated += original.slice(cursor);
  stats.changedFiles.push(relative(file));
  if (!checkOnly) await writeFile(file, updated, "utf8");
}

for (const message of unresolved) console.warn(`warning: ${message}`);
const summary = `${stats.decoding} decoding, ${stats.lazy} lazy-loading, ${stats.dimensions} width/height pair(s) across ${stats.images} images in ${stats.files} HTML files`;

if (checkOnly) {
  if (stats.changedFiles.length) {
    console.error(`Image hints out of date in ${stats.changedFiles.length} file(s) (${summary} needed):`);
    for (const file of stats.changedFiles) console.error(`- ${file}`);
    console.error("Run `npm run optimize:images` to fix.");
    process.exit(1);
  }
  console.log(`Image hints are up to date (${stats.images} images in ${stats.files} HTML files).`);
} else {
  console.log(`Updated image hints in ${stats.changedFiles.length} HTML files (${summary}).`);
}
