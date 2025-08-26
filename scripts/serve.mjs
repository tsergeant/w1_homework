import { spawn } from "node:child_process";
import { getHwDir } from "./_dir.mjs";

const dir = getHwDir();

console.log(`Serving ${dir} on http://127.0.0.1:8080`);
const child = spawn(
    "npx",
    // NOTE: -c must be in a single token: -c-1
    ["http-server", dir, "-p", "8080", "-a", "127.0.0.1", "-c-1", "-d", "-i"],
    { stdio: "inherit", shell: true }
);
child.on("close", code => process.exit(code ?? 0));
