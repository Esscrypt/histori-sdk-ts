import { IBalanceService } from './IBalanceService';
import { BalanceDto } from '../types';
import HistoriClient from '../HistoriClient';

class BalanceService implements IBalanceService {
  private client: HistoriClient;

  constructor(client: HistoriClient) {
    this.client = client;
  }

  /**
   * Retrieves the balance for a specific wallet and token at a given block number.
   * @param args Object containing walletAddress, tokenAddress, blockNumber, and optional query parameters.
   * @returns A Promise resolving to a BalanceDto object.
   */
  async getBalance(args: {
    walletAddress: string;
    tokenAddress: string;
    blockNumber: number;
    options?: Record<string, any>;
  }): Promise<BalanceDto> {
    const { walletAddress, tokenAddress, blockNumber, options } = args;
    const url = `/${this.client.version}/${this.client.network}/balance/${walletAddress}/${tokenAddress}/${blockNumber}`;
    return this.client.makeGetRequest<BalanceDto>(url, options);
  }
}

export default BalanceService;
