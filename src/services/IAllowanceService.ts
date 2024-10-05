import { AllowanceDto } from '../types';

export interface IAllowanceService {
  getAllowance(args: {
    ownerAddress: string;
    spenderAddress: string;
    tokenAddress: string;
    blockNumber: number;
    options?: Record<string, any>;
  }): Promise<AllowanceDto>;
}
