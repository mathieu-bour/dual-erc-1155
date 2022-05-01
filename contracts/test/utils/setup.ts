import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import waitDeploy from '../../lib/waitDeploy';
import { DeepSquare__factory } from '../../typings';

export default async function setup() {
  const [deployer, ...accounts] = await ethers.getSigners();
  const DeepSquare = await waitDeploy(new DeepSquare__factory(deployer).deploy());

  const [INITIAL_SUPPLY, DPS, SQUARE] = await Promise.all([
    DeepSquare.INITIAL_SUPPLY(),
    DeepSquare.DPS(),
    DeepSquare.SQUARE(),
  ]);

  return {
    deployer,
    accounts,

    DeepSquare,

    INITIAL_SUPPLY,
    DPS,
    SQUARE,
  };
}
