#!/usr/bin/env node
// Orchard Vale theme validator. Pure Node.js ESM, zero dependencies.
//
// Usage: node scripts/validate-theme.mjs [--warn-only]
//   --warn-only   Report every problem but always exit 0 (handy mid-wave).

import { execFileSync } from "node:child_process";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const warnOnly = process.argv.includes("--warn-only");
const ignoredDirectoryNames = new Set([".git", "node_modules", ".pet-runs"]);
const ignoredRootPaths = ["art-sources", "pets/.pet-runs"];
const errors = [];
const checked = {
  html: 0, css: 0, markdown: 0, references: 0, js: 0, jsSyntax: 0,
  jsAssetRefs: 0, images: 0, manifestAssets: 0, contrastPairs: 0, ids: 0,
};

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function isIgnoredPath(file) {
  const rel = relative(file);
  return ignoredRootPaths.some((prefix) => rel === prefix || rel.startsWith(`${prefix}/`));
}

async function filesIn(directory) {
  const output = [];
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return output;
  }
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name) || isIgnoredPath(fullPath)) continue;
      output.push(...await filesIn(fullPath));
    } else if (entry.isFile()) {
      output.push(fullPath);
    }
  }
  return output;
}

async function exists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function count(text, pattern) {
  return Array.from(text.matchAll(pattern)).length;
}

function lineOf(text, index) {
  return text.slice(0, index).split("\n").length;
}

// ---------------------------------------------------------------- references

function referencesFor(file, text) {
  const extension = path.extname(file).toLowerCase();
  const patterns = [];
  if (extension === ".html") patterns.push(/(?:src|href)=["']([^"']+)["']/g);
  if (extension === ".css" || extension === ".html") patterns.push(/url\(["']?([^)"']+)["']?\)/g);
  if (extension === ".md") patterns.push(/\]\(([^)]+)\)/g);
  return patterns.flatMap((pattern) => Array.from(text.matchAll(pattern), (match) => match[1].trim()));
}

async function checkReference(file, reference) {
  if (!reference || /^(?:#|data:|https?:|mailto:|javascript:)/i.test(reference) || reference.startsWith("<")) return;
  let clean;
  try {
    clean = decodeURIComponent(reference.split("#")[0].split("?")[0]);
  } catch {
    errors.push(`${relative(file)}: malformed local reference ${reference}`);
    return;
  }
  if (!clean || clean.includes("${")) return;
  const target = path.resolve(path.dirname(file), clean);
  checked.references += 1;
  if (!(await exists(target))) errors.push(`${relative(file)}: missing local reference ${reference}`);
}

// ------------------------------------------------------------ HTML structure

const voidElements = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

function attr(attrs, name) {
  const match = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : undefined;
}

function analyzeHtml(file, text) {
  const rel = relative(file);
  const tagPattern = /<!--[\s\S]*?-->|<(script|style)\b[\s\S]*?<\/\1\s*>|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  const ids = new Map();
  const idRefs = []; // { kind, id, line }
  const stack = [];
  const nameAnchors = new Set();

  for (const match of text.matchAll(tagPattern)) {
    if (match[3] === undefined) continue; // comment, script or style block
    const closing = match[2] === "/";
    const name = match[3].toLowerCase();
    const attrs = match[4] ?? "";
    const line = lineOf(text, match.index);

    if (closing) {
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].name === name) {
          stack.length = i;
          break;
        }
      }
      continue;
    }

    const id = attr(attrs, "id");
    if (id !== undefined && !id.includes("${")) {
      checked.ids += 1;
      if (ids.has(id)) errors.push(`${rel}:${line}: duplicate id "${id}" (first used on line ${ids.get(id)})`);
      else ids.set(id, line);
    }
    if (name === "a") {
      const anchorName = attr(attrs, "name");
      if (anchorName) nameAnchors.add(anchorName);
    }

    const href = attr(attrs, "href");
    if (href && href.startsWith("#") && href.length > 1 && !href.includes("${")) {
      idRefs.push({ kind: `href="${href}"`, id: decodeURIComponent(href.slice(1)), line });
    }
    for (const kind of ["aria-labelledby", "aria-controls"]) {
      const value = attr(attrs, kind);
      if (!value) continue;
      for (const token of value.split(/\s+/).filter(Boolean)) {
        if (!token.includes("${")) idRefs.push({ kind: `${kind}="${token}"`, id: token, line });
      }
    }

    const role = (attr(attrs, "role") ?? "").toLowerCase();
    if (role.split(/\s+/).includes("tab") && !stack.some((entry) => entry.roles.includes("tablist"))) {
      errors.push(`${rel}:${line}: role="tab" element is not inside a role="tablist" ancestor`);
    }

    if (!voidElements.has(name) && !attrs.trimEnd().endsWith("/")) {
      stack.push({ name, roles: role.split(/\s+/) });
    }
  }

  for (const ref of idRefs) {
    if (!ids.has(ref.id) && !nameAnchors.has(ref.id)) {
      errors.push(`${rel}:${ref.line}: ${ref.kind} points to missing id "${ref.id}"`);
    }
  }
}

// ----------------------------------------------------------- JS validation

async function checkJsAssetReferences(file, text) {
  const pattern = /(?:\.\.\/|\.\/)*src\/assets\/[^"'`\s)<>]*/g;
  for (const match of text.matchAll(pattern)) {
    let reference = match[0];
    const afterIndex = match.index + reference.length;
    // Skip template placeholders and partial paths built up with string concatenation.
    if (reference.includes("${") || text.slice(afterIndex, afterIndex + 2) === "${") continue;
    reference = reference.split("?")[0].split("#")[0];
    const target = path.join(root, reference.slice(reference.indexOf("src/assets/")));
    checked.jsAssetRefs += 1;
    if (!(await exists(target))) {
      errors.push(`${relative(file)}:${lineOf(text, match.index)}: missing asset referenced from JS: ${match[0]}`);
    }
  }
}

function checkJsSyntax(file) {
  checked.jsSyntax += 1;
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: ["ignore", "pipe", "pipe"] });
  } catch (error) {
    const detail = String(error.stderr || error.message).trim().split("\n").slice(0, 4).join(" | ");
    errors.push(`${relative(file)}: JavaScript syntax check failed: ${detail}`);
  }
}

// ------------------------------------------------------------ image formats

async function imageCandidates() {
  const scopes = [path.join(root, "src", "assets", "orchard-vale"), path.join(root, "demo", "screenshots")];
  const isImage = (file) => /\.(?:png|webp|jpe?g)$/i.test(file);
  try {
    // Tracked plus untracked-but-not-ignored files: exactly what could ever be committed.
    const output = execFileSync(
      "git",
      ["ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "src/assets/orchard-vale", "demo/screenshots"],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 },
    );
    const files = output.split("\0").filter(Boolean).map((entry) => path.join(root, entry)).filter(isImage);
    const withDisk = [];
    for (const file of files) if (await exists(file)) withDisk.push(file);
    return withDisk;
  } catch {
    const all = [];
    for (const scope of scopes) all.push(...await filesIn(scope));
    return all.filter(isImage);
  }
}

async function checkImageMagic(file) {
  const extension = path.extname(file).toLowerCase();
  const buffer = await readFile(file);
  checked.images += 1;
  let ok = true;
  let expected = "";
  if (extension === ".png") {
    expected = "PNG (89 50 4E 47 0D 0A 1A 0A)";
    ok = buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  } else if (extension === ".webp") {
    expected = "WebP (RIFF....WEBP)";
    ok = buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP";
  } else {
    expected = "JPEG (FF D8 FF)";
    ok = buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (!ok) {
    const head = Array.from(buffer.subarray(0, 4), (byte) => byte.toString(16).padStart(2, "0")).join(" ");
    let actual = "unknown data";
    if (buffer[0] === 0xff && buffer[1] === 0xd8) actual = "JPEG data";
    else if (buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) actual = "PNG data";
    else if (buffer.toString("ascii", 0, 4) === "RIFF") actual = "RIFF/WebP data";
    errors.push(`${relative(file)}: extension ${extension} does not match file content (expected ${expected}, found ${actual}; header bytes ${head})`);
  }
}

// ---------------------------------------------------------------- manifests

async function checkAssetManifests() {
  const directory = path.join(root, "src", "assets", "orchard-vale");
  const jsonFile = path.join(directory, "asset-manifest.json");
  const jsFile = path.join(directory, "asset-manifest.js");
  let entries;
  try {
    const [json, js] = await Promise.all([readFile(jsonFile, "utf8"), readFile(jsFile, "utf8")]);
    entries = JSON.parse(json);
    const payload = js.match(/^window\.ORCHARD_ASSET_MANIFEST\s*=\s*([\s\S]+);\s*$/)?.[1];
    if (!Array.isArray(entries) || JSON.stringify(entries) !== JSON.stringify(JSON.parse(payload))) {
      errors.push(`${relative(jsFile)}: expected the same asset list as ${relative(jsonFile)}`);
      return;
    }
  } catch (error) {
    errors.push(`${relative(jsonFile)} and ${relative(jsFile)}: could not read both manifests: ${error.message}`);
    return;
  }

  const issues = await Promise.all(entries.map(async (entry) => {
    if (typeof entry?.path !== "string") return "manifest entry is missing its asset path";
    const target = path.resolve(root, entry.path);
    if (!target.startsWith(directory + path.sep)) return `manifest path is outside the asset directory: ${entry.path}`;
    let contents;
    try {
      contents = await readFile(target);
    } catch (error) {
      return `could not read ${entry.path}: ${error.code}`;
    }
    // Git stores SVGs with LF even when their working-tree copies use CRLF.
    const bytes = path.extname(target) === ".svg"
      ? Buffer.byteLength(contents.toString("utf8").replaceAll("\r\n", "\n"))
      : contents.length;
    if (bytes !== entry.bytes) return `${entry.path}: expected ${bytes} bytes, recorded ${entry.bytes}`;
  }));
  checked.manifestAssets = entries.length;
  for (const issue of issues.filter(Boolean)) errors.push(`${relative(jsonFile)}: ${issue}`);
}

// ---------------------------------------------------------------- contrast

function parseHex(value) {
  const match = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  let hex = match[1];
  if (hex.length === 3) hex = [...hex].map((char) => char + char).join("");
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function luminance([r, g, b]) {
  const channel = (value) => {
    const s = value / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

async function checkContrast() {
  const cssFile = path.join(root, "src", "theme", "orchard-vale.css");
  if (!(await exists(cssFile))) {
    errors.push(`${relative(cssFile)}: token file not found; cannot run contrast checks`);
    return;
  }
  const css = (await readFile(cssFile, "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
  const tokens = new Map();
  for (const block of css.matchAll(/:root\s*\{([^}]*)\}/g)) {
    for (const decl of block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);?/g)) tokens.set(decl[1], decl[2].trim());
  }

  const resolve = (name, depth = 0) => {
    const value = tokens.get(name);
    if (value === undefined || depth > 8) return null;
    const variable = value.match(/^var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)$/);
    if (variable) return resolve(variable[1], depth + 1);
    return parseHex(value);
  };
  const light = ["paper", "paper-warm", "parchment"];
  const dark = ["forest-black", "forest", "forest-mid"];
  // Each group tests every foreground against every background in the documented matrix.
  const groups = [
    [["ink", "ink-soft", "ink-muted", "forest", "brass-dark"], light, 4.5],
    [["paper", "brass-light"], dark, 4.5],
    [["link-light", "link-light-hover"], light, 4.5],
    [["link-dark", "link-dark-hover"], ["forest-black", "forest"], 4.5],
    [["paper"], ["green", "blue", "red", "purple"], 4.5],
    [["red-ink"], ["red-soft"], 4.5],
    [["amber-ink"], ["amber-soft"], 4.5],
    [["focus-light"], light, 3],
    [["focus-dark"], dark, 3],
    [["amber"], ["paper"], 3],
  ];
  const pairs = groups.flatMap(([foregrounds, backgrounds, minimum]) =>
    foregrounds.flatMap((foreground) =>
      backgrounds.map((background) => [`--ov-${foreground}`, `--ov-${background}`, minimum])));
  for (const [foreground, background, minimum] of pairs) {
    const fg = resolve(foreground);
    const bg = resolve(background);
    if (!fg || !bg) {
      const missing = [!fg && foreground, !bg && background].filter(Boolean).join(", ");
      errors.push(`${relative(cssFile)}: cannot check contrast ${foreground} on ${background}; unresolvable color: ${missing}`);
      continue;
    }
    checked.contrastPairs += 1;
    const ratio = contrastRatio(fg, bg);
    if (ratio < minimum) {
      errors.push(`${relative(cssFile)}: contrast ${foreground} on ${background} is ${ratio.toFixed(2)}:1, needs at least ${minimum}:1`);
    }
  }
}

// -------------------------------------------------------------------- main

const allFiles = await filesIn(root);
for (const file of allFiles) {
  const extension = path.extname(file).toLowerCase();
  if (![".html", ".css", ".md"].includes(extension)) continue;
  const text = await readFile(file, "utf8");

  if (extension === ".html") {
    checked.html += 1;
    const h1Count = count(text, /<h1(?:\s|>)/g);
    const mainCount = count(text, /<main(?:\s|>)/g);
    if (h1Count !== 1) errors.push(`${relative(file)}: expected one h1, found ${h1Count}`);
    if (mainCount !== 1) errors.push(`${relative(file)}: expected one main landmark, found ${mainCount}`);
    if (!/<html\s[^>]*lang=["'][^"']+["']/.test(text)) errors.push(`${relative(file)}: missing html lang attribute`);
    if (!/<meta\s[^>]*name=["']viewport["']/.test(text)) errors.push(`${relative(file)}: missing viewport metadata`);
    for (const match of text.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt=["'][^"']*["']/.test(match[0])) errors.push(`${relative(file)}:${lineOf(text, match.index)}: image missing alt attribute`);
    }
    for (const match of text.matchAll(/<button\b[^>]*>/g)) {
      if (!/\btype=["'][^"']+["']/.test(match[0])) errors.push(`${relative(file)}:${lineOf(text, match.index)}: button missing explicit type`);
    }
    analyzeHtml(file, text);
  }

  if (extension === ".css") {
    checked.css += 1;
    const opens = count(text, /\{/g);
    const closes = count(text, /\}/g);
    if (opens !== closes) errors.push(`${relative(file)}: unbalanced CSS braces (${opens} open, ${closes} close)`);
  }

  if (extension === ".md") checked.markdown += 1;
  for (const reference of referencesFor(file, text)) await checkReference(file, reference);
}

// JavaScript: syntax everywhere we ship scripts, asset references in demo/theme scripts.
const scriptScopes = ["demo", "src/theme", "scripts"].map((scope) => path.join(root, scope));
const jsFiles = allFiles.filter((file) => /\.(?:m?js)$/i.test(file) && scriptScopes.some((scope) => file.startsWith(scope + path.sep)));
for (const file of jsFiles) {
  checked.js += 1;
  checkJsSyntax(file);
  const rel = relative(file);
  if (/^(?:demo|src\/theme)\/[^/]+\.js$/.test(rel)) await checkJsAssetReferences(file, await readFile(file, "utf8"));
}

for (const file of await imageCandidates()) await checkImageMagic(file);
await checkAssetManifests();
await checkContrast();

const summary = `${checked.html} HTML (${checked.ids} ids), ${checked.css} CSS, ${checked.markdown} Markdown, ${checked.references} local references, `
  + `${checked.jsSyntax} JS syntax checks, ${checked.jsAssetRefs} JS asset references, ${checked.images} image signatures, ${checked.manifestAssets} manifest entries, ${checked.contrastPairs} contrast pairs`;

if (errors.length) {
  const label = warnOnly ? "warning" : "failed";
  console.error(`Theme validation ${label} with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  console.error(`Checked: ${summary}.`);
  process.exit(warnOnly ? 0 : 1);
}

console.log(`Theme validation passed: ${summary}.`);
