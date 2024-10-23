import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import ChainService from '../src/services/ChainService';
import {
  BlockHeightResponseDto,
  GasPriceResponseDto,
  BlockResponseDto,
} from '../src/types';
import { GetGasPriceRequestDto, GetBlockRequestDto } from '../src/types';

describe('ChainService (Real API)', () => {
  let client: HistoriClient;
  let chainService: ChainService;

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
    chainService = new ChainService(client);
  });

  test('should call getBlockHeight and return real block height data', async () => {
    const result: BlockHeightResponseDto = await chainService.getBlockHeight();
    //console.log('Block Height:', result); // For debugging, remove in production
    expect(result).toHaveProperty('block_height');
    expect(result.network_name).toBe('eth-mainnet');
    expect(result.chain_id).toBe(1);
  });

  test('should call getGasPrice and return real gas price data', async () => {
    const dto: GetGasPriceRequestDto = { type: 'native_transfer' };
    const result: GasPriceResponseDto = await chainService.getGasInfo(dto);
    //console.log('Gas Price:', result); // For debugging, remove in production
    expect(result).toHaveProperty('gas_cost_wei');
    expect(result.network_name).toBe('eth-mainnet');
    expect(result.chain_id).toBe(1);
  });

  test('should call getBlock by block height and return block data', async () => {
    const dto: GetBlockRequestDto = { tag: 21021031 };
    const result: BlockResponseDto = await chainService.getBlock(dto);
    //console.log('Block by Height:', result); // For debugging, remove in production
    expect(result).toHaveProperty('block_height');
    expect(result.block_height).toBe(21021031);
  });


  test('should call getBlock by block hash and return block data', async () => {
    const dto: GetBlockRequestDto = { blockHash: '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3' };
    const result: BlockResponseDto = await chainService.getBlock(dto);
    //console.log('Block by Hash:', result); // For debugging, remove in production
    expect(result).toHaveProperty('block_hash');
    expect(result.block_hash).toBe('0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3');
  });
});
