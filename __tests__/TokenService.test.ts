import HistoriClient from '../src/HistoriClient';
import TokenService from '../src/services/TokenService';
import { GetTokensDto } from '../src/types';

jest.mock('axios');

describe('TokenService', () => {
  let client: HistoriClient;
  let tokenService: TokenService;

  beforeEach(() => {
    client = new HistoriClient('test-api-key', { version: 'v1', network: 'eth-mainnet', debug: false });
    tokenService = new TokenService(client);
  });

  test('should call getTokenByAddress and return token data', async () => {
    jest.spyOn(client, 'makeGetRequest').mockResolvedValueOnce({
      tokenAddress: '0xContractAddress',
      tokenType: 'ERC20',
      name: 'MyToken',
      symbol: 'MTK',
      decimals: 18,
    });

    const result = await tokenService.getTokenByAddress('0xContractAddress',);
    expect(result).toEqual({
      tokenAddress: '0xContractAddress',
      tokenType: 'ERC20',
      name: 'MyToken',
      symbol: 'MTK',
      decimals: 18,
    });
    expect(client.makeGetRequest).toHaveBeenCalledWith(
      '/v1/eth-mainnet/token/0xContractAddress',
      undefined
    );
  });

  test('should call getTokens and return token list', async () => {
    jest.spyOn(client, 'makeGetRequest').mockResolvedValueOnce([
      { tokenAddress: '0xContractAddress1', tokenType: 'ERC20' },
      { tokenAddress: '0xContractAddress2', tokenType: 'ERC721' },
    ]);

    const dto: GetTokensDto = {
      page: 1,
      limit: 10,
    };

    const result = await tokenService.getTokens(dto);
    expect(result).toEqual([
      { tokenAddress: '0xContractAddress1', tokenType: 'ERC20' },
      { tokenAddress: '0xContractAddress2', tokenType: 'ERC721' },
    ]);
    expect(client.makeGetRequest).toHaveBeenCalledWith(
      '/v1/eth-mainnet/token',
      { page: 1, limit: 10 }
    );
  });
});
