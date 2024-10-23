import ApiClient from '../HistoriClient';
import { GetTokenSupplyDto, TokenSupplyDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class TokenSupplyService {
  private client: ApiClient;

  /**
   * Creates an instance of TokenSupplyService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Fetches the token supply by token address and block height or date for a given network.
   * @param {GetTokenSupplyDto} dto - The DTO containing token address, block height, or date.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<TokenSupplyDto>} A promise that resolves to a `TokenSupplyDto` object containing the token supply details.
   */
  async getTokenSupply(dto: GetTokenSupplyDto, options?: RequestOptions): Promise<TokenSupplyDto> {
    const { tokenAddress, tag } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    // Build query parameters based on the provided values
    let queryParams: Record<string, string | number> = { token_address: tokenAddress };
    
    if(tag) {
      if (typeof tag === 'number') {
        queryParams['block_height'] = tag;
      } else if (tag instanceof Date) {
        queryParams['date'] = tag.toISOString(); // Convert Date object to ISO string
      }
    }

    // Remove undefined values and construct query string
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `/${version}/${network}/token-supply?${queryString}`;
    return this.client.makeGetRequest<TokenSupplyDto>(url, options);
  }

  // Implement other token-supply-related methods as needed
}

export default TokenSupplyService;
