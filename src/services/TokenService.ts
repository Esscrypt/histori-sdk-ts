import { ITokenService } from './ITokenService';
import { TokenDto } from '../types';
import HistoriClient from '../HistoriClient';

class TokenService implements ITokenService {
  private client: HistoriClient;

  constructor(client: HistoriClient) {
    this.client = client;
  }

  /**
   * Retrieves a paginated list of tokens.
   * @param args Object containing page, limit, and optional query parameters.
   * @returns A Promise resolving to an array of TokenDto objects.
   */
  async getTokens(args: {
    page: number;
    limit: number;
    options?: Record<string, any>;
  }): Promise<TokenDto[]> {
    const { page, limit, options } = args;
    const url = `/${this.client.version}/${this.client.network}/token`;
    return this.client.makeGetRequest<TokenDto[]>(url, { ...options, page, limit });
  }

  /**
   * Retrieves details of a specific token by its contract address.
   * @param args Object containing contractAddress and optional query parameters.
   * @returns A Promise resolving to a TokenDto object.
   */
  async getTokenByAddress(args: {
    contractAddress: string;
    options?: Record<string, any>;
  }): Promise<TokenDto> {
    const { contractAddress, options } = args;
    const url = `/${this.client.version}/${this.client.network}/token/${contractAddress}`;
    return this.client.makeGetRequest<TokenDto>(url, options);
  }
}

export default TokenService;
