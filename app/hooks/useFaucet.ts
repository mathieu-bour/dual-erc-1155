import { Faucet, Faucet__factory } from '@mathieu-bour/dual-contracts';
import { FAUCET_ADDRESS } from '../lib/web3/constants';
import useContract from './useContract';

export default function useFaucet() {
  return useContract<Faucet>(Faucet__factory, FAUCET_ADDRESS);
}
