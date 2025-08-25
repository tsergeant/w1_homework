// scripts/_dir.mjs
export function getHwDir() {
	const args = process.argv.slice(2);

	// Try in this order:
	// 1) npm run ... -- --hw=hw03   (parse --hw=)
	let flagEq = (args.find(a => a.startsWith('--hw=')) || '').split('=')[1];

	// 2) npm run ... -- --hw hw03   (parse --hw <val>)
	let flagNext = null;
	const idx = args.indexOf('--hw');
	if (idx !== -1 && args[idx + 1]) flagNext = args[idx + 1];

	// 3) npm run ... -- hw03        (positional that looks like hwNN)
	let positional = args.find(a => /^hw\d{2}$/.test(a));

	const raw = flagEq || flagNext || positional || process.env.npm_config_hw || 'hw01';

	if (!/^hw\d{2}$/.test(raw)) {
		console.error('Pick a week using: npm run <task> -- --hw=hw03  OR  npm run <task> -- hw03');
		process.exit(2);
	}
	return raw;
}
