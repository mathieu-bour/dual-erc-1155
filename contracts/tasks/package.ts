import { spawn } from 'child_process';
import { subtask, task } from 'hardhat/config';

task('package', async () => {
  return new Promise((resolve, reject) => {
    const build = spawn('tsc', ['-p', 'tsconfig.package.json'], { stdio: 'inherit' });
    build.on('close', () => {
      resolve(void 0);
    });
    build.on('error', reject);
  });
});

subtask('typechain:generate-types').setAction(async (taskArgs, env, runSuper) => {
  await runSuper(taskArgs);
  await env.run('package');
});
