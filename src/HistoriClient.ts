import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BalanceService from './services/BalanceService';
import TokenService from './services/TokenService';
import AllowanceService from './services/AllowanceService';
import { RequestOptions } from './types/RequestOptions';

// Define the options interface for the client
interface HistoriClientOptions {
  version?: string;
  network?: string;
  debug?: boolean;
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number; // in milliseconds
  source?: string;
}

// Argument interface for the getTokens method
interface GetTokensArgs {
  page: number;
  limit: number;
  options?: Record<string, any>;
}

class HistoriClient {
  private apiKey: string;
  private axiosInstance: AxiosInstance;
  public version: string;
  public network: string;
  private debug: boolean;
  private enableRetry: boolean;
  private maxRetries: number;
  private retryDelay: number;
  private source: string;

  // Services
  public BalanceService: BalanceService;
  public TokenService: TokenService;
  public AllowanceService: AllowanceService;
  
  /**
   * Creates an instance of HistoriClient.
   * @param {string} apiKey - Your API key for authentication.
   * @param {HistoriClientOptions} [options={}] - Options to configure the client behavior.
   */
  constructor(apiKey: string, options: HistoriClientOptions) {
    this.apiKey = apiKey;
    this.version = options.version || 'v1';
    this.network = options.network || 'eth-mainnet';
    this.debug = options.debug || false;
    this.enableRetry = options.enableRetry !== undefined ? options.enableRetry : true;
    this.maxRetries = options.maxRetries || 2;
    this.retryDelay = options.retryDelay || 2000;
    this.source = options.source || '';

    this.axiosInstance = axios.create({
      baseURL: 'https://api.histori.xyz',
      headers: {
        'x-api-key': this.apiKey,
      },
    });

    // Initialize services
    this.BalanceService = new BalanceService(this);
    this.TokenService = new TokenService(this);
    this.AllowanceService = new AllowanceService(this);
  }

 /**
   * Makes a GET request to the specified URL with optional parameters.
   * @template T
   * @param {string} url - The URL for the GET request.
   * @param {RequestOptions} [options] - Optional parameters to override the client's default settings.
   * @param {number} [retries] - Number of retries allowed, defaults to the maxRetries set in the client.
   * @returns {Promise<T>} The response data as a promise.
   */
 public async makeGetRequest<T>(url: string, options?: RequestOptions, retries: number = this.maxRetries): Promise<T> {
  try {
    const params = options ? { ...options, source: this.source } : { source: this.source };
    
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, { params });

    if (this.debug || options?.debug) {
      console.log(`GET ${url}`, {
        params,
        status: response.status,
        data: response.data,
      });
    }

    return response.data;
  } catch (error: any) {
    if ((this.enableRetry || options?.enableRetry) && retries > 0 && error.response?.status === 429) {
      if (this.debug || options?.debug) {
        console.warn(`Rate limit hit, retrying in ${this.retryDelay}ms... (${this.maxRetries - retries + 1}/${this.maxRetries})`);
      }

      const delay = options?.retryDelay || this.retryDelay;
      await this.delay(delay);
      return this.makeGetRequest(url, options, retries - 1);
    }

    if (options?.debug || this.debug) {
      console.error(`Error in GET ${url}`, {
        params: options,
        error: error.message,
        response: error.response?.data,
      });
    }

    throw {
      message: error.message,
      status: error.response?.status || 500,
    };
  }
}

  // Helper method to implement delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Retrieves a paginated list of tokens.
   * @param {GetTokensArgs} args - Object containing pagination and query parameters.
   * @returns {Promise<any>} A promise resolving to the list of tokens.
   */
  async getTokens(args: GetTokensArgs): Promise<any> {
    const { page, limit, options } = args;
    const url = `/${this.version}/${this.network}/token`;
    return this.makeGetRequest(url, { ...options, page, limit });
  }

  // Add other methods that use descriptive arguments and the updated request method
}

export default HistoriClient;
