import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import AllowanceService from '../src/services/AllowanceService';
import { GetAllowanceDto } from '../src/types';

describe('AllowanceService (Real API)', () => {
  let client: HistoriClient;
  let allowanceService: AllowanceService;

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
    allowanceService = new AllowanceService(client);
  });

  test('should call getAllowance and return real allowance data', async () => {
    const dto: GetAllowanceDto = {
      owner: '0xa24D38b1B49E32c1c63731810a8D42ec9dd9aa8C',
      spender: '0x858646372CC42E1A627fcE94aa7A7033e7CF075A',
      tokenAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
      tag: 19676072,
    };

    const result = await allowanceService.getAllowanceResponse(dto);

    // Assert all properties of the result
    expect(result).toHaveProperty('allowance');
    expect(result).toHaveProperty('owner');
    expect(result).toHaveProperty('spender');
    expect(result).toHaveProperty('token_address');
    expect(result).toHaveProperty('token_name');
    expect(result).toHaveProperty('token_symbol');
    expect(result).toHaveProperty('token_type');
    expect(result).toHaveProperty('checked_at_block');
    expect(result).toHaveProperty('checked_at_timestamp');

    // Check if the allowance is a valid string
    expect(typeof result.allowance).toBe('string');
  });

  test('should call getAllowance and handle not found case', async () => {
    const dto: GetAllowanceDto = {
      owner: '0xa24D38b1B49E32c1c63731810a8D42ec9dd9aa8C',
      spender: '0x858646372CC42E1A627fcE94aa7A7033e7CF075A',
      tokenAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
      tag: 10000000, // Non-existing block height for the token/allowance query
    };

    try {
      await allowanceService.getAllowanceResponse(dto);
    } catch (error: any) {
      // Expect a 404 error
      expect(error.status).toBe(404);
      expect(error.message).toContain('does not exist');
    }
  });
});
