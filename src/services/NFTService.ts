import ApiClient from '../HistoriClient';
import {
  GetNFTOwnerDto,
  GetTokenUriDto,
  NFTOwnershipResponseDto,
  TokenUriResponseDto
} from '../types';
import { RequestOptions } from '../types/RequestOptions';

class NFTService {
  private client: ApiClient;

  /**
   * Creates an instance of NFTService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Fetches the token Info for an ERC721 or ERC1155 token.
   * @param {GetTokenUriDto} dto - The DTO containing the token details (address and ID).
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<TokenUriResponseDto>} A promise that resolves to a `TokenUriResponseDto` object containing the token URI and metadata.
   */
  async getTokenInfo(dto: GetTokenUriDto, options?: RequestOptions): Promise<TokenUriResponseDto> {
    const { tokenAddress, tokenId } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    const url = `/${version}/${network}/nft/token-uri?token_address=${tokenAddress}&token_id=${tokenId}`;
    return this.client.makeGetRequest<TokenUriResponseDto>(url, options);
  }

    /**
   * Fetches the token metadata for an ERC721 or ERC1155 token.
   * @param {GetTokenUriDto} dto - The DTO containing the token details (address and ID).
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<any>} A promise that resolves to a `metadata` object containing the token metadata.
   */
    async getTokenMetadata(dto: GetTokenUriDto, options?: RequestOptions): Promise<any> {
      const response = await this.getTokenInfo(dto, options);
      return response.metadata;
    }

  /**
   * Fetches the token uri for an ERC721 or ERC1155 token.
   * @param {GetTokenUriDto} dto - The DTO containing the token details (address and ID).
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<string>} A promise that resolves to a string containing the token uri.
   */
    async getTokenUri(dto: GetTokenUriDto, options?: RequestOptions): Promise<any> {
      const response = await this.getTokenInfo(dto, options);
      return response.token_uri;
    }

  /**
   * Checks if a specific address owns an NFT (ERC721 or ERC1155).
   * Either block height or date can be passed to further refine the query.
   * @param {GetNFTOwnerDto} dto - The DTO containing the ownership details (token address, token ID, and owner address).
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<NFTOwnershipResponseDto>} A promise that resolves to a `NFTOwnershipResponseDto` indicating whether the user is the owner.
   */
  async checkOwnerOfToken(dto: GetNFTOwnerDto, options?: RequestOptions): Promise<NFTOwnershipResponseDto> {
    const { tokenAddress, owner, tokenId, tag } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;


    // Construct query parameters based on blockHeight or date
    let queryParams: Record<string, string | number> = {
      token_address: tokenAddress,
      owner,
      token_id: tokenId,
    };

    if(tag) {
      if (typeof tag === 'number') {
        queryParams['block_height'] = tag;
      } else if (tag instanceof Date) {
        queryParams['date'] = tag.toISOString(); // Convert Date object to ISO string
      }
    }

    // Construct query string
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const url = `/${version}/${network}/nft/is-owner?${queryString}`;
    return this.client.makeGetRequest<NFTOwnershipResponseDto>(url, options);
  }

  /**
   * Checks if a specific address owns an NFT (ERC721 or ERC1155).
   * @param {GetNFTOwnerDto} dto - The DTO containing the ownership details (token address, token ID, and owner address).
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the user is the owner.
   */
  async isOwnerOfToken(dto: GetNFTOwnerDto, options?: RequestOptions): Promise<boolean> {
    const response = await this.checkOwnerOfToken(dto, options);
    return response.is_owner;
  }

  // Implement other NFT-related methods as needed
}

export default NFTService;
