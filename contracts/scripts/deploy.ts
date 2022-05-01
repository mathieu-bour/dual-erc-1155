import { utils } from 'ethers';
import { ethers } from 'hardhat';
import waitDeploy from '../lib/waitDeploy';
import waitTx from '../lib/waitTx';
import { Bridge__factory, DeepSquare__factory, Faucet__factory } from '../typings';

async function main() {
  const [deployer, ...accounts] = await ethers.getSigners();
  const DeepSquare = await waitDeploy(new DeepSquare__factory(deployer).deploy());

  const Bridge = await waitDeploy(new Bridge__factory(deployer).deploy(DeepSquare.address));
  await waitTx(DeepSquare.grantRole(utils.id('MINTER_ROLE'), Bridge.address));
  await waitTx(DeepSquare.grantRole(utils.id('BURNER_ROLE'), Bridge.address));

  const Faucet = await waitDeploy(new Faucet__factory(deployer).deploy(DeepSquare.address));
  await waitTx(DeepSquare.grantRole(utils.id('MINTER_ROLE'), Faucet.address));
  await waitTx(DeepSquare.grantRole(utils.id('BURNER_ROLE'), Faucet.address));

  await waitTx(
    accounts[0].sendTransaction({
      to: '0x623c6CFcE1B249b8502C300a3b9c5cb8a6d78e81',
      value: ethers.utils.parseEther('500'),
    }),
  );

  console.log('DeepSquare deployed to', DeepSquare.address);
  console.log('Bridge deployed to', Bridge.address);
  console.log('Faucet deployed to', Faucet.address);
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
