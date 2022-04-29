import { providers } from 'ethers';
import { useMemo } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

export default function useProvider(): providers.JsonRpcProvider | null {
  return useMemo(() => {
    if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
      return new providers.Web3Provider(window.ethereum as any);
    }

    return null;
  }, []);
}
