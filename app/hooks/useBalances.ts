import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import useDeepSquare from './useDeepSquare';
import useWeb3 from './useWeb3';

export default function useBalances(account?: string | null) {
  const [balanceDPS, setBalanceDPS] = useState<BigNumber | null>(null);
  const [balanceSQUARE, setBalanceSQUARE] = useState<BigNumber | null>(null);

  const { account: currentAccount } = useWeb3();
  const deepsquare = useDeepSquare();

  const _refresh = useCallback(async () => {
    const actualAccount = account ?? currentAccount;
    if (!deepsquare || !actualAccount) return;

    // const [DPS, SQUARE] = await Promise.all([deepsquare.DPS(), deepsquare.SQUARE()]);
    const [DPS, SQUARE] = [0, 1];

    const balances = await deepsquare.balanceOfBatch([actualAccount, actualAccount], [DPS, SQUARE]);

    setBalanceDPS(balances[0]);
    setBalanceSQUARE(balances[1]);
  }, [account, currentAccount, deepsquare]);

  useEffect(() => {
    void _refresh();
  }, [_refresh]);

  return {
    balanceDPS,
    balanceSQUARE,
  };
}
