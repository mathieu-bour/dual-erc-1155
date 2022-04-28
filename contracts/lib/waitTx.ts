import { TransactionResponse } from '@ethersproject/providers';

export default async function waitTx(tx: Promise<TransactionResponse> | TransactionResponse, confirmations?: number) {
  const response = await tx;
  return await response.wait(confirmations);
}
