import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { describe } from 'mocha';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { DeepSquare } from '../typings';
import setup from './utils/setup';

describe('DeepSquare', () => {
  let deployer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let DeepSquare: DeepSquare;

  let INITIAL_SUPPLY: BigNumber;
  let DPS: BigNumber;
  let SQUARE: BigNumber;

  beforeEach(async () => {
    ({ deployer, accounts, DeepSquare, INITIAL_SUPPLY, DPS, SQUARE } = await setup());
  });

  describe('constructor', () => {
    it('should mint 210M DPS and SQUARE tokens to the deployer', async () => {
      expect(await DeepSquare.balanceOf(deployer.address, DPS)).to.equals(INITIAL_SUPPLY);
      expect(await DeepSquare.balanceOf(deployer.address, SQUARE)).to.equals(0);
    });
  });
});
