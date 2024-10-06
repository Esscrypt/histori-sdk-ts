import ApiClient from '../HistoriClient';
import { AllowanceDto, GetAllowanceDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class AllowanceService {
  private client: ApiClient;

  /**
   * Creates an instance of AllowanceService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Retrieves the allowance for a given token and block number.
   * @param {AllowanceDto} dto - The DTO containing all parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<AllowanceDto>} A promise that resolves to an `AllowanceDto` object containing the allowance details.
   */
  async getAllowance(dto: GetAllowanceDto, options?: RequestOptions): Promise<AllowanceDto> {
    const { ownerAddress, spenderAddress, tokenAddress, blockNumber } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;
    const url = `/${version}/${network}/allowance/${ownerAddress}/${spenderAddress}/${tokenAddress}/${blockNumber}`;
    return this.client.makeGetRequest<AllowanceDto>(url, options);
  }

  // Implement other allowance-related methods as needed
}

export default AllowanceService;
