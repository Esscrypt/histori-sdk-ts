import ApiClient from '../HistoriClient';
import { UniswapV3PriceResponseDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class UniswapV3Service {
  private client: ApiClient;

  /**
   * Creates an instance of UniswapV3Service.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Fetches the ETH to USDT price from Uniswap V3 pool for a specified network.
   * It defaults to the network from the client, but can be overridden via options.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<UniswapV3PriceResponseDto>} A promise that resolves to a `UniswapV3PriceResponseDto` object containing the ETH/USDT price.
   */
  async getETHToUSDResponse(options?: RequestOptions): Promise<UniswapV3PriceResponseDto> {
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;
    const url = `/${version}/${network}/uniswap/eth-usd-price`;

    return this.client.makeGetRequest<UniswapV3PriceResponseDto>(url, options);
  }

  async getETHToUSDPrice(options?: RequestOptions): Promise<string> {
    const response = await this.getETHToUSDResponse(options);
    return response.price;
  }
}

export default UniswapV3Service;
