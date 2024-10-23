import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import HistoriClient from '../src/HistoriClient';
import TransactionService from '../src/services/TransactionService';
import { TransactionDetailsResponseDto } from '../src/types';

describe('TransactionService (Real API)', () => {
  let client: HistoriClient;
  let transactionService: TransactionService;

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
    transactionService = new TransactionService(client);
  });

  test('should call getTransactionDetails and return real transaction details', async () => {
    const txHash = '0xf85e0f37296608a3a23ffd8b2349c4cb25e9174d357c32d4416d3eb1d214080e';

    const result: TransactionDetailsResponseDto = await transactionService.getTransactionDetails({
      txHash,
    });

    //console.log('Transaction Details:', result); // For debugging, remove in production

    // Assertions
    expect(result).toHaveProperty('transaction');
  });

  test('should handle invalid transaction hash gracefully', async () => {
    const invalidTxHash = '0xinvalidhash';

    try {
      await transactionService.getTransactionDetails({ txHash: invalidTxHash });
    } catch (error: any) {
      //console.log('Error:', error); // For debugging, remove in production

      // Assertions
      expect(error.status).toEqual(400)
    }
  });

  test('should handle non-existent transaction hash gracefully', async () => {
    const invalidTxHash = '0xf85e0f37296608a3a23ffd8b2349c4cb25e9174d357c32d4416d3eb1d214080f';

    try {
      await transactionService.getTransactionDetails({ txHash: invalidTxHash });
    } catch (error: any) {
      //console.log('Error:', error); // For debugging, remove in production

      // Assertions
      expect(error.status).toEqual(404)
    }
  });
});
