import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import TokenService from '../src/services/TokenService';
import { PaginatedTokensResponseDto, TokenResponseDto } from '../src/types';

describe('TokenService (Real API)', () => {
  let client: HistoriClient;
  let tokenService: TokenService;

  beforeEach(() => {
    // Ensure environment variables are available and properly set
    if (!process.env.API_KEY || !process.env.BASE_URL || !process.env.VERSION) {
      throw new Error('API_KEY, BASE_URL and VERSION environment variables are required.');
    }

    // Create the client with API key and base URL from environment variables
    client = new HistoriClient(process.env.API_KEY, {
      version: process.env.VERSION,
      network: 'eth-mainnet',
      baseUrl: process.env.BASE_URL,
      debug: true,
    });
    tokenService = new TokenService(client);
  });

  test('should fetch a paginated list of tokens', async () => {
    const result: PaginatedTokensResponseDto = await tokenService.getTokens({
      page: 1,
      limit: 10,
    });

    //console.log('Paginated Tokens:', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('tokens');
    expect(result.tokens).toBeInstanceOf(Array);
    expect(result.tokens.length).toBeGreaterThan(0);
    expect(result.tokens[0]).toHaveProperty('token_address');
  });

  test('should fetch a single token by address', async () => {
    const result: TokenResponseDto = await tokenService.getTokenByAddress({
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    });

    //console.log('Token:', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('token_address');
    expect(result.token_address).toBe('0x6b175474e89094c44da98b954eedeac495271d0f');
    expect(result).toHaveProperty('symbol');
    expect(result).toHaveProperty('name');
  });
});
