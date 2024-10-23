import ApiClient from '../HistoriClient';
import {
  BlockHeightResponseDto,
  GasPriceResponseDto,
  BlockResponseDto,
} from '../types';
import { GetGasPriceRequestDto, GetBlockRequestDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class ChainService {
  private client: ApiClient;

  /**
   * Creates an instance of ChainService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Fetches the current block height.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<BlockHeightResponseDto>} A promise that resolves to a `BlockHeightResponseDto` containing the current block height.
   */
  async getBlockHeight(options?: RequestOptions): Promise<BlockHeightResponseDto> {
    const version = options?.version || this.client.version;
    const network = options?.network || this.client.network;
    const url = `/${version}/${network}/chain/block-height`;

    return this.client.makeGetRequest<BlockHeightResponseDto>(url, options);
  }

  /**
   * Fetches the current gas price for the specified transaction type.
   * @param {GetGasPriceRequestDto} dto - The DTO containing gas price query parameters.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<GasPriceResponseDto>} A promise that resolves to a `GasPriceResponseDto` containing the gas price details.
   */
  async getGasInfo(
    dto: GetGasPriceRequestDto,
    options?: RequestOptions
  ): Promise<GasPriceResponseDto> {
    const version = options?.version || this.client.version;
    const network = options?.network || this.client.network;
    const url = `/${version}/${network}/chain/gas-price?type=${dto.type}`;

    return this.client.makeGetRequest<GasPriceResponseDto>(url, options);
  }

  /**
   * Fetches block details by block height or block hash.
   * @param {GetBlockRequestDto} dto - The DTO containing block height or block hash.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<BlockResponseDto>} A promise that resolves to a `BlockResponseDto` containing block details.
   */
  async getBlock(
    dto?: GetBlockRequestDto,
    options?: RequestOptions
  ): Promise<BlockResponseDto> {
    const version = options?.version || this.client.version;
    const network = options?.network || this.client.network;
    let url = `/${version}/${network}/chain/block`;

    if(dto)
    {
      const { blockHash, tag } = dto;
  
      let queryParams: Record<string, string | number | undefined> = {};
  
      if (blockHash) {
        queryParams['block_hash'] = blockHash;
      } else if (tag) {
        if (typeof tag === 'number') {
          queryParams['block_height'] = tag;
        } else if (tag instanceof Date) {
          queryParams['date'] = tag.toISOString(); // Convert Date object to ISO string
        } else {
          throw new Error('Invalid blockHeightOrDate. Must be a block height (number) or a Date.');
        }
      }
  
      // Remove undefined values from the query parameters
      const queryString = new URLSearchParams(
        Object.entries(queryParams).reduce((acc, [key, value]) => {
          if (value !== undefined) {
            acc[key] = value.toString();
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString();
  
      url = `${url}?${queryString}`
    }

    return this.client.makeGetRequest<BlockResponseDto>(url, options);
  }
}

export default ChainService;
