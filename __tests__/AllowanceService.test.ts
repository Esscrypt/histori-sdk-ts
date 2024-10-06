import HistoriClient from '../src/HistoriClient';
import AllowanceService from '../src/services/AllowanceService';
import { GetAllowanceDto } from '../src/types';

jest.mock('axios');

describe('AllowanceService', () => {
  let client: HistoriClient;
  let allowanceService: AllowanceService;

  beforeEach(() => {
    client = new HistoriClient('test-api-key', { version: 'v1', network: 'eth-mainnet', debug: false });
    allowanceService = new AllowanceService(client);
  });

  test('should call getAllowance and return allowance data', async () => {
    // Mock the client's makeGetRequest method to return a sample allowance
    jest.spyOn(client, 'makeGetRequest').mockResolvedValueOnce({
      ownerAddress: '0xOwnerAddress',
      spenderAddress: '0xSpenderAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
      allowance: '1000',
      tokenType: 'ERC20',
    });

    const dto: GetAllowanceDto = {
      ownerAddress: '0xOwnerAddress',
      spenderAddress: '0xSpenderAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
    };

    const result = await allowanceService.getAllowance(dto);
    expect(result).toEqual({
      ownerAddress: '0xOwnerAddress',
      spenderAddress: '0xSpenderAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
      allowance: '1000',
      tokenType: 'ERC20',
    });
    expect(client.makeGetRequest).toHaveBeenCalledWith(
      '/v1/eth-mainnet/allowance/0xOwnerAddress/0xSpenderAddress/0xTokenAddress/123456',
      undefined
    );
  });

  test('should handle options override in getAllowance', async () => {
    // Mock the client's makeGetRequest method to return a sample allowance
    jest.spyOn(client, 'makeGetRequest').mockResolvedValueOnce({
      ownerAddress: '0xOwnerAddress',
      spenderAddress: '0xSpenderAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
      allowance: '1000',
      tokenType: 'ERC20',
    });

    const dto: GetAllowanceDto = {
      ownerAddress: '0xOwnerAddress',
      spenderAddress: '0xSpenderAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
    };

    const options = { debug: true, maxRetries: 3 };

    const result = await allowanceService.getAllowance(dto, options);
    expect(result).toEqual({
      ownerAddress: '0xOwnerAddress',
      spenderAddress: '0xSpenderAddress',
      tokenAddress: '0xTokenAddress',
      blockNumber: 123456,
      allowance: '1000',
      tokenType: 'ERC20',
    });
    expect(client.makeGetRequest).toHaveBeenCalledWith(
      '/v1/eth-mainnet/allowance/0xOwnerAddress/0xSpenderAddress/0xTokenAddress/123456',
      options
    );
  });
});
