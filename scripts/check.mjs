// scripts/check.mjs
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { getHwDir } from "./_dir.mjs";

function run(bin, args) {
	const r = spawnSync("npx", [bin, ...args], { stdio: "inherit", shell: true });
	if (r.status !== 0) process.exit(r.status ?? 1);
}

function toPosix(pathString) {
	return pathString.split(path.sep).join('/');
}


function collectFiles(root) {
	const out = { html: [], css: [], js: [] };
	if (!fs.existsSync(root)) return out;

	const walk = dir => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) walk(full);
			else if (entry.isFile()) {
				if (full.endsWith(".html")) out.html.push(full);
				else if (full.endsWith(".css")) out.css.push(full);
				else if (full.endsWith(".js")) out.js.push(full);
			}
		}
	};
	walk(root);
	return out;
}

const dir = getHwDir();
const files = collectFiles(dir);

// Always format (safe even if the folder is small/empty)
run("prettier", ["-w", dir]);

// HTML-Validate (only if we have any HTML files)
const htmlFiles = files.html.map(toPosix);
if (htmlFiles.length) {
	run('html-validate', ['--config', '.htmlvalidate.json', ...htmlFiles]);
} else {
	console.log(`(skip) no HTML files in ${dir}`);
}

// Stylelint (only if we have any CSS files)
if (files.css.length) {
	run("stylelint", [...files.css]);
} else {
	console.log(`(skip) no CSS files in ${dir}`);
}

// ESLint (only if we have any JS files)
if (files.js.length) {
	run("eslint", ["--no-error-on-unmatched-pattern", ...files.js]);
} else {
	console.log(`(skip) no JS files in ${dir}`);
}
