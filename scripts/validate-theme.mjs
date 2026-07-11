#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignoredDirectories = new Set([".git", "node_modules", ".pet-runs"]);
const errors = [];
const checked = { html: 0, css: 0, markdown: 0, references: 0 };

async function filesIn(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await filesIn(fullPath));
    if (entry.isFile()) output.push(fullPath);
  }
  return output;
}

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function referencesFor(file, text) {
  const extension = path.extname(file).toLowerCase();
  const patterns = [];
  if (extension === ".html") patterns.push(/(?:src|href)=["']([^"']+)["']/g);
  if (extension === ".css" || extension === ".html") patterns.push(/url\(["']?([^\)"']+)["']?\)/g);
  if (extension === ".md") patterns.push(/\]\(([^)]+)\)/g);
  return patterns.flatMap((pattern) => Array.from(text.matchAll(pattern), (match) => match[1].trim()));
}

async function checkReference(file, reference) {
  if (!reference || /^(?:#|data:|https?:|mailto:|javascript:)/i.test(reference) || reference.startsWith("<")) return;
  const clean = decodeURIComponent(reference.split("#")[0].split("?")[0]);
  if (!clean) return;
  const target = path.resolve(path.dirname(file), clean);
  checked.references += 1;
  try {
    await access(target);
  } catch {
    errors.push(`${relative(file)}: missing local reference ${reference}`);
  }
}

function count(text, pattern) {
  return Array.from(text.matchAll(pattern)).length;
}

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
      if (!/\balt=["'][^"']*["']/.test(match[0])) errors.push(`${relative(file)}: image missing alt attribute`);
    }
    for (const match of text.matchAll(/<button\b[^>]*>/g)) {
      if (!/\btype=["'][^"']+["']/.test(match[0])) errors.push(`${relative(file)}: button missing explicit type`);
    }
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

if (errors.length) {
  console.error(`Theme validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Theme validation passed: ${checked.html} HTML, ${checked.css} CSS, ${checked.markdown} Markdown, ${checked.references} local references.`);
