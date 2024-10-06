import HistoriClient from '../src/HistoriClient';
import BalanceService from '../src/services/BalanceService';
import { GetBalanceDto } from '../src/types';

jest.mock('axios');

describe('BalanceService', () => {
  let client: HistoriClient;
  let balanceService: BalanceService;

  beforeEach(() => {
    client = new HistoriClient('test-api-key', { version: 'v1', network: 'eth-mainnet', debug: false });
    balanceService = new BalanceService(client);
  });

  test('should call getBalance and return balance data', async () => {
    jest.spyOn(client, 'makeGetRequest').mockResolvedValueOnce({
      walletAddress: '0xWalletAddress',
      tokenAddress: '0xTokenAddress',
      balance: '1000',
      blockNumber: 123456,
      tokenType: 'ERC20',
    });

    const dto: GetBalanceDto = {
      walletAddress: '0xWalletAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
    };

    const result = await balanceService.getBalance(dto);
    expect(result).toEqual({
      walletAddress: '0xWalletAddress',
      tokenAddress: '0xTokenAddress',
      balance: '1000',
      blockNumber: 123456,
      tokenType: 'ERC20',
    });
    expect(client.makeGetRequest).toHaveBeenCalledWith(
      '/v1/eth-mainnet/balance/0xWalletAddress/0xTokenAddress/123456',
      undefined
    );
  });
});
