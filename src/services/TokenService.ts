import ApiClient from '../HistoriClient';
import { GetTokensDto, TokenDto } from '../types';
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
   * Retrieves details of a specific token by its contract address.
   * @param {contractAddress} string - The contract address of the token to retrieve.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<TokenDto>} A promise that resolves to a `TokenDto` object containing the token details.
   */
  async getTokenByAddress(contractAddress: string, options?: RequestOptions): Promise<TokenDto> {
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;
    const url = `/${version}/${network}/token/${contractAddress}`;
    return this.client.makeGetRequest<TokenDto>(url, options);
  }

  /**
   * Retrieves a paginated list of tokens.
   * @param {GetTokensDto} dto - The DTO containing pagination and query parameters.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<TokenDto[]>} A promise that resolves to an array of `TokenDto` objects.
   */
  async getTokens(dto: GetTokensDto, options?: RequestOptions): Promise<TokenDto[]> {
    const {page, limit } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;
    const url = `/${version}/${network}/token`;
    return this.client.makeGetRequest<TokenDto[]>(url, { ...options, page, limit });
  }
}

export default TokenService;
