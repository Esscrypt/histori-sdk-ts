import ApiClient from '../HistoriClient';
import { TransactionDetailsResponseDto, GetTransactionDetailsDto } from '../types';
import { RequestOptions } from '../types/RequestOptions';

class TransactionService {
  private client: ApiClient;

  /**
   * Creates an instance of TransactionService.
   * @param {ApiClient} client - An instance of the API client to make requests.
   */
  constructor(client: ApiClient) {
    this.client = client;
  }

  /**
   * Fetches transaction details by transaction hash.
   * @param {GetTransactionDetailsDto} dto - The DTO containing the transaction hash and network.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings for this request.
   * @returns {Promise<TransactionDetailsResponseDto>} A promise that resolves to a `TransactionDetailsResponseDto` object containing the transaction details.
   */
  async getTransactionDetails(dto: GetTransactionDetailsDto, options?: RequestOptions): Promise<TransactionDetailsResponseDto> {
    const { txHash } = dto;
    const network = options?.network || this.client.network;
    const version = options?.version || this.client.version;

    const url = `/${version}/${network}/transaction?tx_hash=${txHash}`;
    return this.client.makeGetRequest<TransactionDetailsResponseDto>(url, options);
  }

  // Implement other transaction-related methods as needed
}

export default TransactionService;
