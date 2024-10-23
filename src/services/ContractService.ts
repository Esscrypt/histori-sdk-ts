import ApiClient from '../HistoriClient';
import { ContractTypeResponseDto, GetContractTypeDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class ContractService {
  private client: ApiClient;

  /**
   * Creates an instance of ContractService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Checks if a contract implements a specific ERC standard.
   * @param {GetContractTypeDto} dto - The DTO containing all parameters for the request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<ContractTypeResponseDto>} A promise that resolves to a `ContractTypeResponseDto` object indicating whether the contract implements the specified ERC standard.
   */
  async checkContractType(dto: GetContractTypeDto, options?: RequestOptions): Promise<ContractTypeResponseDto> {
    const { tokenAddress, tokenType } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    const url = `/${version}/${network}/contract/is-of-type?token_address=${tokenAddress}&token_type=${tokenType}`;
    return this.client.makeGetRequest<ContractTypeResponseDto>(url, options);
  }

  // Implement other contract-related methods as needed
}

export default ContractService;
