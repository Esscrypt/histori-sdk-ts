import ApiClient from '../HistoriClient';
import { PaginatedTokensResponseDto, TokenResponseDto, GetTokensDto, GetTokenByAddressDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class TokenService {
  private client: ApiClient;

  /**
   * Creates an instance of TokenService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Retrieves a paginated list of tokens, optionally filtering by token type.
   * @param {GetTokensDto} dto - The DTO containing parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<PaginatedTokensResponseDto>} A promise that resolves to a `PaginatedTokensResponseDto` object containing the list of tokens.
   */
  async getTokens(dto?: GetTokensDto, options?: RequestOptions): Promise<PaginatedTokensResponseDto> {
    
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;
    let url = `/${version}/${network}/tokens`;
    if(dto) {
      const { tokenType, page = 1, limit = 10 } = dto;
  
      // Construct the query parameters for the request
      const queryParams: Record<string, string | number> = {
        token_type: tokenType || '',
        page,
        limit,
      };
  
      // Remove empty values from the query parameters
      const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
          if (value) {
            acc[key] = value.toString();
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString();
  
      url = `${url}?${queryString}`;
    }
    return this.client.makeGetRequest<PaginatedTokensResponseDto>(url, options);
  }

  /**
   * Retrieves a token by its contract address.
   * @param {GetTokenByAddressDto} dto - The DTO containing parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<TokenResponseDto>} A promise that resolves to a `TokenResponseDto` object containing the token details.
   */
  async getTokenByAddress(dto: GetTokenByAddressDto, options?: RequestOptions): Promise<TokenResponseDto> {
    const { tokenAddress } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    const url = `/${version}/${network}/tokens/single?token_address=${tokenAddress}`;
    return this.client.makeGetRequest<TokenResponseDto>(url, options);
  }

  // Implement other token-related methods as needed
}

export default TokenService;
