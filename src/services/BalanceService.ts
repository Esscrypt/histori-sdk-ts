import ApiClient from '../HistoriClient';
import { BalanceDto, GetBalanceDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class BalanceService {
  private client: ApiClient;

  /**
   * Creates an instance of BalanceService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Retrieves the balance for a given wallet and token.
   * @param {GetBalanceDto} dto - The DTO containing all parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<BalanceDto>} A promise that resolves to a `BalanceDto` object containing the balance details.
   */
  async getBalance(dto: GetBalanceDto, options?: RequestOptions): Promise<BalanceDto> {
    const { walletAddress, tokenAddress, blockNumber } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;
    const url = `/${version}/${network}/balance/${walletAddress}/${tokenAddress}/${blockNumber}`;
    return this.client.makeGetRequest<BalanceDto>(url, options);
  }
}

export default BalanceService;
