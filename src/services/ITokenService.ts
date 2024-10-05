import { TokenDto } from '../types';

export interface ITokenService {
  getTokens(args: {
    page: number;
    limit: number;
    options?: Record<string, any>;
  }): Promise<TokenDto[]>;

  getTokenByAddress(args: {
    contractAddress: string;
    options?: Record<string, any>;
  }): Promise<TokenDto>;
}
