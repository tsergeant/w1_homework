import { spawnSync } from 'node:child_process';
import { getHwDir } from './_dir.mjs';
import { platform } from 'node:os';

const dir = getHwDir();
const out = `submission-${dir}.zip`;

if (platform() === 'win32') {
	const ps = `Compress-Archive -Path ${dir}/* -DestinationPath ${out} -Force`;
	const r = spawnSync('powershell', ['-NoProfile', '-Command', ps], { stdio: 'inherit' });
	process.exit(r.status ?? 0);
} else {
	const r = spawnSync('zip', ['-r', out, dir], { stdio: 'inherit' });
	process.exit(r.status ?? 0);
}

