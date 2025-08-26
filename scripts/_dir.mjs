import fs from "node:fs";
import path from "node:path";

export function getHwDir() {
	const args = process.argv.slice(2);

	// --hw=NAME or --hw NAME
	const eq = (args.find(a => a.startsWith("--hw=")) || "").split("=")[1];
	const ix = args.indexOf("--hw");
	const next = ix !== -1 && args[ix + 1] ? args[ix + 1] : null;

	// positional candidate (first arg that exists as a directory)
	const positional = args.find(a => fs.existsSync(a) && fs.statSync(a).isDirectory());

	// classic hwNN
	const hwnn = args.find(a => /^hw\d{2}$/.test(a));

	const pick = eq || next || positional || hwnn || process.env.npm_config_hw || "hw01";
	const dir = fs.existsSync(pick) ? pick : "hw01";
	return path.normalize(dir);
}
