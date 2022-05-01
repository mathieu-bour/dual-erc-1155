import { BaseContract } from 'ethers';
import { useMemo } from 'react';
import useProvider from './useProvider';

export default function useContract<T extends BaseContract>(factory: any, address: string) {
  const provider = useProvider();

  return useMemo(() => {
    return provider && (factory.connect(address, provider.getSigner()) as T);
  }, [address, factory, provider]);
}
