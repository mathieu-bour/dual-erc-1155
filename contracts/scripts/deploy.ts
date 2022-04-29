import { ethers } from 'hardhat';
import waitDeploy from '../lib/waitDeploy';
import { Bridge__factory, DeepSquare__factory } from '../typings';

async function main() {
  const [deployer] = await ethers.getSigners();
  const DeepSquare = await waitDeploy(new DeepSquare__factory(deployer).deploy());
  console.log('DeepSquare deployed to', DeepSquare.address);

  const Bridge = await waitDeploy(new Bridge__factory(deployer).deploy(DeepSquare.address));
  console.log('Bridge deployed to', Bridge.address);
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
