import axios, { AxiosInstance } from 'axios';
import HistoriClient from '../src/HistoriClient';
import BalanceService from '../src/services/BalanceService';
import TokenService from '../src/services/TokenService';
import AllowanceService from '../src/services/AllowanceService';

jest.mock('axios');

describe('HistoriClient', () => {
  let client: HistoriClient;
  let axiosInstance: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    // Mock axios.create to return a mocked AxiosInstance
    axiosInstance = {
      get: jest.fn(),
    } as unknown as jest.Mocked<AxiosInstance>;

    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    client = new HistoriClient('test-api-key', {
      version: 'v1',
      network: 'eth-mainnet',
      debug: true,
      enableRetry: true,
      maxRetries: 2,
      retryDelay: 2000,
    });
  });

  test('should be instantiated with default options', () => {
    expect(client).toBeInstanceOf(HistoriClient);
    expect(client.version).toBe('v1');
    expect(client.network).toBe('eth-mainnet');
    expect(client['debug']).toBe(true);
    expect(client['maxRetries']).toBe(2);
    expect(client['retryDelay']).toBe(2000);

    // Verify that services are instantiated
    expect(client.BalanceService).toBeInstanceOf(BalanceService);
    expect(client.TokenService).toBeInstanceOf(TokenService);
    expect(client.AllowanceService).toBeInstanceOf(AllowanceService);
  });

  test('should make a GET request successfully', async () => {
    // Mock axiosInstance.get to return a successful response
    axiosInstance.get.mockResolvedValueOnce({
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    const result = await client.makeGetRequest('/test-endpoint');
    expect(result).toEqual({ success: true });
    expect(axiosInstance.get).toHaveBeenCalledWith('/test-endpoint', { params: {source: ''} });
  });

  test('should handle GET request with retry on 429 error', async () => {
    // Mock axiosInstance.get to first throw a 429 error, then return success
    axiosInstance.get
      .mockRejectedValueOnce({ response: { status: 429 }, message: 'Rate limit hit' })
      .mockResolvedValueOnce({
        data: { success: true },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      });

    const result = await client.makeGetRequest('/test-endpoint');
    expect(result).toEqual({ success: true });
    expect(axiosInstance.get).toHaveBeenCalledTimes(2);
  });

  test('should throw an error if the GET request fails', async () => {
    // Mock axiosInstance.get to throw an error
    axiosInstance.get.mockRejectedValueOnce(new Error('Request failed'));

    await expect(client.makeGetRequest('/test-endpoint')).rejects.toMatchObject({
      error: true,
      error_message: 'Request failed',
      error_code: 500,
    });
  });

  test('should call getTokens and return token list', async () => {
    // Mock axiosInstance.get to return a token list
    axiosInstance.get.mockResolvedValueOnce({
      data: [{ tokenAddress: '0x123', tokenType: 'ERC20' }],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    });

    const result = await client.getTokens({ page: 1, limit: 10 });
    expect(result).toEqual([{ tokenAddress: '0x123', tokenType: 'ERC20' }]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/v1/eth-mainnet/token', {
      params: { page: 1, limit: 10, source: '' },
    });
  });
});
