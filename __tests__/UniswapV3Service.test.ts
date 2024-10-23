import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import UniswapV3Service from '../src/services/UniswapV3Service';
import { UniswapV3PriceResponseDto } from '../src/types';

describe('UniswapV3Service (Real API)', () => {
  let client: HistoriClient;
  let uniswapV3Service: UniswapV3Service;

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
    uniswapV3Service = new UniswapV3Service(client);
  });

  test('should call getETHToUSDTPrice and return real price data using default network', async () => {
    const result: UniswapV3PriceResponseDto = await uniswapV3Service.getETHToUSDResponse();

    console.log('ETH to USDT Price:', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('chain_id');
    expect(result).toHaveProperty('network_name');
    expect(result).toHaveProperty('block_height');
  });
});
