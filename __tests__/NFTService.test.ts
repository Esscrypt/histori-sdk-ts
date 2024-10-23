import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import NFTService from '../src/services/NFTService';
import { TokenUriResponseDto, NFTOwnershipResponseDto } from '../src/types';

describe('NFTService (Real API)', () => {
  let client: HistoriClient;
  let nftService: NFTService;

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
    nftService = new NFTService(client);
  });

  test('should fetch the token URI for an NFT', async () => {
    const result: TokenUriResponseDto = await nftService.getTokenInfo({
      tokenAddress: '0x630aa263CD2D9afed696AC6ca76268AFcD0ab1b2',
      tokenId: 1,
    });

    console.log('Token URI:', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('token_uri');
    expect(result).toHaveProperty('metadata');
    expect(result.metadata).toHaveProperty('name');
    expect(result.metadata).toHaveProperty('image');
  });

  test('should check if the user is the owner of the NFT', async () => {
    const result: NFTOwnershipResponseDto = await nftService.checkOwnerOfToken({
      tokenAddress: '0xB3e782D5919924Faa456B5b5689B0A45963da4b7',
      owner: '0xd5470BaFb6074B10107b303D0cCe03cA5539b6E3',
      tokenId: 1,
    });

    console.log('NFT Ownership:', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('is_owner');
    expect(result.is_owner).toBe(true);
  });
});
