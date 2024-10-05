import ApiClient from '../HistoriClient';
import { AllowanceDto } from '../types';

class AllowanceService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getAllowance(
    version: string,
    networkName: string,
    ownerAddress: string,
    spenderAddress: string,
    tokenAddress: string,
    blockNumber: number,
    options?: Record<string, any>
  ): Promise<AllowanceDto> {
    const url = `/${version}/${networkName}/allowance/${ownerAddress}/${spenderAddress}/${tokenAddress}/${blockNumber}`;
    return this.client.makeGetRequest<AllowanceDto>(url, options);
  }

  // Implement other allowance-related methods as needed
}

export default AllowanceService;
