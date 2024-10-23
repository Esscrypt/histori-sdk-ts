import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import ContractService from '../src/services/ContractService';
import { ContractTypeResponseDto } from '../src/types';

describe('ContractService (Real API)', () => {
  let client: HistoriClient;
  let contractService: ContractService;

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
    contractService = new ContractService(client);
  });

  test('should check if a contract is of type ERC20', async () => {
    const result: ContractTypeResponseDto = await contractService.checkContractType({
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // Example contract address
      tokenType: 'erc20',
    });

    //console.log('Contract Type Check (ERC20):', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('token_address');
    expect(result.token_address).toBe('0x6b175474e89094c44da98b954eedeac495271d0f');
    expect(result).toHaveProperty('is_of_type');
    expect(result.is_of_type).toBe(true); // Assuming the contract implements ERC20
  });

  test('should check if a contract is of type ERC721', async () => {
    const result: ContractTypeResponseDto = await contractService.checkContractType({
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // Example ERC721 contract address
      tokenType: 'erc721',
    });

    console.log('Contract Type Check (ERC721):', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('token_address');
    expect(result.token_address).toBe('0x6b175474e89094c44da98b954eedeac495271d0f');
    expect(result).toHaveProperty('is_of_type');
    expect(result.is_of_type).toBe(false); // Assuming the contract implements ERC721
  });

  test('should handle incorrect contract type check gracefully', async () => {
    try{
      const result: ContractTypeResponseDto = await contractService.checkContractType({
        tokenAddress: '0xinvalidaddress1234567890123456789012345678901234', // Invalid address
        tokenType: 'erc20',
      });
    } catch(error: any) {
      expect(error.message).toContain('Invalid Ethereum address');
    }
  })
})
