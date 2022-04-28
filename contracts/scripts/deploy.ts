import { ethers } from 'hardhat';
import waitDeploy from '../lib/waitDeploy';
import { DeepSquare__factory } from '../typings';

async function main() {
  const [deployer] = await ethers.getSigners();
  const DeepSquare = await waitDeploy(new DeepSquare__factory(deployer).deploy());
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
