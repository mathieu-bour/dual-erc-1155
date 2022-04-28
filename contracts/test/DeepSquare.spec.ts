import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { describe } from 'mocha';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { DeepSquare, DeepSquare__factory } from '../typings';

describe('DeepSquare', () => {
  let deployer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let DeepSquare: DeepSquare;

  let INITIAL_SUPPLY: BigNumber;
  let DPS: BigNumber;
  let SQUARE: BigNumber;

  beforeEach(async () => {
    [deployer, ...accounts] = await ethers.getSigners();
    DeepSquare = await new DeepSquare__factory(deployer).deploy();
    await DeepSquare.deployed();

    INITIAL_SUPPLY = await DeepSquare.INITIAL_SUPPLY();
    DPS = await DeepSquare.DPS();
    SQUARE = await DeepSquare.SQUARE();
  });

  describe('constructor', () => {
    it('should mint 210M DPS and SQUARE tokens to the deployer', async () => {
      expect(await DeepSquare.balanceOf(deployer.address, DPS)).to.equals(INITIAL_SUPPLY);
      expect(await DeepSquare.balanceOf(deployer.address, SQUARE)).to.equals(INITIAL_SUPPLY);
    });
  });
});
