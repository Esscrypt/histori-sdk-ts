import ApiClient from '../HistoriClient';
import { BalanceResponseDto, GetBalanceDto } from '../types';
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
   * Retrieves the balanceDto for a given token and holder at a specific block height or timestamp.
   * @param {GetBalanceDto} dto - The DTO containing parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<BalanceResponseDto>} A promise that resolves to a `BalanceResponseDto` object containing the balance details.
   */
  async getBalanceResponse(dto: GetBalanceDto, options?: RequestOptions): Promise<BalanceResponseDto> {
    const { holder, tokenAddress, tag } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    // Construct the query parameters based on blockHeight or date, but not both
    const queryParams: Record<string, string | number | undefined> = {
      holder,
      token_address: tokenAddress,
    };

    if(tag) {
      if (typeof tag === 'number') {
        queryParams['block_height'] = tag;
      } else if (tag instanceof Date) {
        queryParams['date'] = tag.toISOString(); // Convert Date object to ISO string
      }
    }

    // Remove undefined values from the query parameters
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `/${version}/${network}/balance/single?${queryString}`;
    return this.client.makeGetRequest<BalanceResponseDto>(url, options);
  }

  /**
   * Retrieves the balance for a given token and holder at a specific block height or timestamp.
   * @param {GetBalanceDto} dto - The DTO containing parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<BalanceResponseDto>} A promise that resolves to a `BalanceResponseDto` object containing the balance details.
   */
  async getBalance(dto: GetBalanceDto, options?: RequestOptions): Promise<string> {
    const response = await this.getBalanceResponse(dto, options);
    return response.balance;
  }
}

export default BalanceService;
