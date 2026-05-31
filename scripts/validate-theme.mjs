#!/usr/bin/env node
/**
 * Validates Mango theme JSON files before publish.
 * Usage: node scripts/validate-theme.mjs
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themesDir = join(root, "themes");

const REQUIRED_UI = [
	"editor.background",
	"editor.foreground",
	"sideBar.background",
	"activityBar.background",
	"tab.activeBackground",
	"statusBar.background",
];

const REQUIRED_TOKEN_NAMES = ["Comment", "Keyword", "String", "Variable"];

let errors = 0;

function fail(message) {
	console.error(`  ✗ ${message}`);
	errors++;
}

function pass(message) {
	console.log(`  ✓ ${message}`);
}

const themeFiles = readdirSync(themesDir).filter((f) => f.endsWith("-color-theme.json"));

if (themeFiles.length === 0) {
	fail("No theme files found in themes/");
	process.exit(1);
}

console.log(`Checking ${themeFiles.length} theme file(s)…\n`);

for (const file of themeFiles) {
	console.log(file);
	const path = join(themesDir, file);
	let theme;

	try {
		theme = JSON.parse(readFileSync(path, "utf8"));
		pass("Valid JSON");
	} catch (e) {
		fail(`Invalid JSON: ${e.message}`);
		continue;
	}

	if (!theme.name) fail("Missing name");
	else pass(`name: "${theme.name}"`);

	if (!theme.type) fail("Missing type");
	else pass(`type: ${theme.type}`);

	if (!theme.colors || typeof theme.colors !== "object") {
		fail("Missing colors object");
	} else {
		pass(`${Object.keys(theme.colors).length} UI colors`);
		for (const key of REQUIRED_UI) {
			if (!(key in theme.colors)) fail(`Missing UI color: ${key}`);
		}
	}

	if (!Array.isArray(theme.tokenColors) || theme.tokenColors.length === 0) {
		fail("Missing tokenColors");
	} else {
		pass(`${theme.tokenColors.length} syntax rules`);
		const names = new Set(theme.tokenColors.map((r) => r.name));
		for (const name of REQUIRED_TOKEN_NAMES) {
			if (!names.has(name)) fail(`Missing token rule: ${name}`);
		}
	}

	for (const [key, value] of Object.entries(theme.colors ?? {})) {
		if (typeof value === "string" && value.startsWith("#") && ![4, 5, 7, 9].includes(value.length)) {
			fail(`Suspicious hex in ${key}: ${value}`);
		}
	}

	console.log("");
}

if (errors > 0) {
	console.error(`${errors} problem(s) found.`);
	process.exit(1);
}

console.log("All checks passed.");
