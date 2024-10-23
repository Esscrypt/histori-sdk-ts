import ApiClient from '../HistoriClient';
import { AllowanceResponseDto, GetAllowanceDto } from '../types';
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
   * Retrieves the allowance for a given token, owner, and spender at a specific block height or timestamp.
   * @param {GetAllowanceDto} dto - The DTO containing parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<AllowanceResponseDto>} A promise that resolves to an `AllowanceResponseDto` object containing the allowance details.
   */
  public async getAllowanceResponse(dto: GetAllowanceDto, options?: RequestOptions): Promise<AllowanceResponseDto> {
    const { owner, spender, tokenAddress, tag } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    // Construct the query parameters for the request
    const queryParams: Record<string, string | number | undefined> = {
      owner,
      spender,
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

    const url = `/${version}/${network}/allowance/single?${queryString}`;
    return this.client.makeGetRequest<AllowanceResponseDto>(url, options);
  }

  /**
   * Retrieves the allowance for a given token, owner, and spender at a specific block height or timestamp.
   * @param {GetAllowanceDto} dto - The DTO containing parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<AllowanceResponseDto>} A promise that resolves to an `AllowanceResponseDto` object containing the allowance details.
   */
  public async getAllowance(dto: GetAllowanceDto, options?: RequestOptions): Promise<string> {
    const response = await this.getAllowanceResponse(dto, options);
    return response.allowance
  }
}

export default AllowanceService;
