import { BalanceDto } from '../types';

export interface IBalanceService {
  getBalance(args: {
    walletAddress: string;
    tokenAddress: string;
    blockNumber: number;
    options?: Record<string, any>;
  }): Promise<BalanceDto>;
}
