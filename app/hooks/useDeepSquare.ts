import { DeepSquare__factory } from '@mathieu-bour/dual-contracts';
import { DeepSquare } from '@mathieu-bour/dual-contracts';
import { DEEPSQUARE_ADDRESS } from '../lib/web3/constants';
import useContract from './useContract';

export default function useDeepSquare() {
  return useContract<DeepSquare>(DeepSquare__factory, DEEPSQUARE_ADDRESS);
}
