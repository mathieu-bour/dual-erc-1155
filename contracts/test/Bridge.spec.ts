import { expect } from 'chai';
import { BigNumber, utils } from 'ethers';
import { describe } from 'mocha';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import waitDeploy from '../lib/waitDeploy';
import waitTx from '../lib/waitTx';
import { Bridge, Bridge__factory, DeepSquare } from '../typings';
import setup from './utils/setup';

describe('Bridge', () => {
  let deployer: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let DeepSquare: DeepSquare;
  let Bridge: Bridge;

  let INITIAL_SUPPLY: BigNumber;
  let DPS: BigNumber;
  let SQUARE: BigNumber;

  beforeEach(async () => {
    ({ deployer, accounts, DeepSquare, INITIAL_SUPPLY, DPS, SQUARE } = await setup());
    Bridge = await waitDeploy(new Bridge__factory(deployer).deploy(DeepSquare.address));
    await waitTx(DeepSquare.grantRole(utils.id('MINTER_ROLE'), Bridge.address));
    await waitTx(DeepSquare.grantRole(utils.id('BURNER_ROLE'), Bridge.address));
  });

  describe('swapDPStoSQUARE', () => {
    it('should allow users to swap zero of DPS', async () => {
      expect(await DeepSquare.balanceOf(accounts[0].address, DPS)).to.equals(0);

      await expect(Bridge.connect(accounts[0]).swapDPStoSQUARE(0))
        .to.emit(Bridge, 'SwapDPStoSQUARE')
        .withArgs(accounts[0].address, 0);

      expect(await DeepSquare.balanceOf(accounts[0].address, DPS)).to.equals(0);
      expect(await DeepSquare.balanceOf(accounts[0].address, SQUARE)).to.equals(0);
    });
  });
});
