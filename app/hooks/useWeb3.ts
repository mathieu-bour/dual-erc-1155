import { providers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

interface BasicEventEmitter {
  on: (event: string, cb: (payload: any) => void) => void;
  removeListener: (event: string, cb: (payload: any) => void) => void;
}

function supportsEvents(ethereum: unknown): ethereum is BasicEventEmitter {
  return (
    typeof ethereum === 'object' &&
    ethereum !== null &&
    typeof (ethereum as BasicEventEmitter).on === 'function' &&
    typeof (ethereum as BasicEventEmitter).removeListener === 'function'
  );
}

function useProvider(): providers.JsonRpcProvider | null {
  return useMemo(() => {
    if (typeof window !== 'undefined' && MetaMaskOnboarding.isMetaMaskInstalled()) {
      return new providers.Web3Provider(window.ethereum as any);
    }

    return null;
  }, []);
}

export default function useWeb3() {
  const [chainId, setChainId] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const provider = useProvider();

  const _dispatch = useCallback(() => window.dispatchEvent(new CustomEvent('web3.refresh')), []);

  const _refresh = useCallback(async () => {
    if (!provider) return;

    const [network, accounts] = await Promise.all([provider.detectNetwork(), provider.listAccounts()]);

    setChainId(Number(network.chainId.toString()).toString(16));
    setAccount(accounts?.[0] ?? null);
  }, [provider]);

  const connect = async () => {
    if (!provider) return;

    try {
      await provider.send('eth_requestAccounts', []);
    } catch (e) {
      console.error(e);
    } finally {
      _dispatch();
    }
  };

  useEffect(() => {
    window.addEventListener('web3.refresh', _refresh);

    if (supportsEvents(window.ethereum)) {
      window.ethereum.on('accountsChanged', _refresh);
    }

    return () => {
      window.removeEventListener('web3.refresh', _refresh);

      if (supportsEvents(window.ethereum)) {
        window.ethereum.removeListener('accountsChanged', _refresh);
      }
    };
  }, [_refresh]);

  return {
    provider,
    account,
    chainId,

    connect,
  };
}
