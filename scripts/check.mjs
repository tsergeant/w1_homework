import { spawnSync } from 'node:child_process';
import { getHwDir } from './_dir.mjs';

const dir = getHwDir();

function run(bin, args) {
	const r = spawnSync('npx', [bin, ...args], { stdio: 'inherit', shell: true });
	if (r.status !== 0) process.exit(r.status ?? 1);
}

run('prettier', ['-w', dir]);
run('html-validate', ['--config', '.htmlvalidate.json', `${dir}/**/*.html`]);
run('stylelint', [`${dir}/**/*.css`]);
run('eslint', [dir, '--ext', '.js']);

