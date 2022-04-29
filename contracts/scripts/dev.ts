import { spawn } from 'child_process';
import { join } from 'path';
import waitOn from 'wait-on';

/**
 * Start the hardhat node, wait for the node to be up and running and deploy the contracts.
 * @returns {Promise<void>}
 */
async function main() {
  const cwd = join(__dirname, '..');
  const script = join(cwd, 'scripts', 'deploy.ts');
  process.chdir(cwd);

  const node = spawn('pnpx', ['hardhat', 'node'], { stdio: 'inherit', cwd });
  await waitOn({
    resources: ['http-get://127.0.0.1:8545'],
  });
  const deploy = spawn('pnpx', ['hardhat', '--network', 'localhost', 'run', script], { stdio: 'inherit', cwd });

  await new Promise((resolve) => {
    node.on('close', resolve);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
