export function getHwDir() {
	const arg = process.env.npm_config_hw || process.argv[2] || 'hw01'; // supports --hw=hw02
	if (!/^hw\d{2}$/.test(arg)) {
		console.error('Pick a week like --hw=hw03');
		process.exit(2);
	}
	return arg;
}

