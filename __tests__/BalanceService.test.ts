import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import BalanceService from '../src/services/BalanceService';
import { GetBalanceDto } from '../src/types';

describe('BalanceService (Real API)', () => {
  let client: HistoriClient;
  let balanceService: BalanceService;

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
    balanceService = new BalanceService(client);
  });

  test('should call getBalance and return real balance data', async () => {
    const dto: GetBalanceDto = {
      holder: 'vitalik.eth',
      tokenAddress: '0xF2ec4a773ef90c58d98ea734c0eBDB538519b988',
      tag: 20853281,
    };

    const result = await balanceService.getBalanceResponse(dto);
    //console.log('Balance:', result); // For debugging, remove this in production
    expect(result).toHaveProperty('balance');
  });
});
