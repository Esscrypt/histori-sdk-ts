import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import TokenSupplyService from '../src/services/TokenSupplyService';
import { GetTokenSupplyDto } from '../src/types';

describe('TokenSupplyService (Real API)', () => {
  let client: HistoriClient;
  let tokenSupplyService: TokenSupplyService;

  beforeEach(() => {

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
    tokenSupplyService = new TokenSupplyService(client);
  });

  test('should call getTokenSupply and return real token supply data', async () => {
    const dto: GetTokenSupplyDto = {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      tag: 20000000,
    };

    const result = await tokenSupplyService.getTokenSupply(dto);
    //console.log('Token Supply:', result); // For debugging, remove in production
    expect(result).toHaveProperty('total_supply');
  });
});
