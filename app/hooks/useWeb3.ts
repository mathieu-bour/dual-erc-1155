import { useCallback, useEffect, useState } from 'react';
import useProvider from './useProvider';

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

export default function useWeb3() {
  const [chainId, setChainId] = useState<string | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const provider = useProvider();

  /**
   * Dispatch a web3.refresh event.
   */
  const refresh = useCallback(() => {
    window.dispatchEvent(new CustomEvent('web3.refresh'));
  }, []);

  /**
   * Refresh the account, network and chain details.
   */
  const _refresh = useCallback(async () => {
    if (!provider) return;

    const [network, accounts] = await Promise.all([provider.detectNetwork(), provider.listAccounts()]);

    setChainId(`0x${Number(network.chainId.toString()).toString(16)}`);
    setAccount(accounts?.[0] ?? null);
  }, [provider]);

  /**
   * Connect the web3 provider (MetaMask, Coinbase Wallet, etc).
   */
  const connect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.send('eth_requestAccounts', []);
    } catch (e) {
      console.error(e);
    } finally {
      refresh();
    }
  }, [refresh, provider]);

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

  /**
   * Auto-connect the web3 provider.
   */
  useEffect(() => {
    connect();
  }, [connect]);

  return {
    provider,
    account,
    chainId,

    refresh,
    connect,
  };
}
