import { providers } from 'ethers';

export async function waitTx(
  tx: Promise<providers.TransactionResponse> | providers.TransactionResponse,
  confirmations?: number,
) {
  const response = await tx;
  return await response.wait(confirmations);
}
