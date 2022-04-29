import { useMemo } from 'react';
import { DeepSquare__factory } from '@mathieu-bour/dual-contracts';
import useProvider from './useProvider';

export default function useDeepSquare() {
  const provider = useProvider();

  return useMemo(() => {
    return provider && DeepSquare__factory.connect('0x5FbDB2315678afecb367f032d93F642f64180aa3', provider);
  }, [provider]);
}
