import { spawn } from 'node:child_process';
import { getHwDir } from './_dir.mjs';

const dir = getHwDir();
const child = spawn('npx', ['http-server', dir, '-p', '8080', '-c', '-1'], { stdio: 'inherit', shell: true });
child.on('close', code => process.exit(code ?? 0));

