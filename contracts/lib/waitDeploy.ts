import { BaseContract } from 'ethers';

export default async function waitDeploy<T extends BaseContract>(contract: Promise<T> | T): Promise<T> {
  const response = await contract;
  return (await response.deployed()) as T;
}
