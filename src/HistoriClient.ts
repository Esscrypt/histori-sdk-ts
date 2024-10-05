import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BalanceService from './services/BalanceService';
import TokenService from './services/TokenService';
import AllowanceService from './services/AllowanceService';

// Define the options interface for the client
interface HistoriClientOptions {
  version?: string;
  network?: string;
  debug?: boolean;
  threadCount?: number;
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
  private threadCount: number;
  private enableRetry: boolean;
  private maxRetries: number;
  private retryDelay: number;
  private source: string;

  // Services
  public BalanceService: BalanceService;
  public TokenService: TokenService;
  public AllowanceService: AllowanceService;
  // public NameResolutionService: NameResolutionService;

  constructor(apiKey: string, options: HistoriClientOptions) {
    this.apiKey = apiKey;
    this.version = options.version || 'v1';
    this.network = options.network || 'eth-mainnet';
    this.debug = options.debug || false;
    this.threadCount = options.threadCount || 2;
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
    // this.NameResolutionService = new NameResolutionService();
  }

  // Generic method for making GET requests
  public async makeGetRequest<T>(url: string, params?: Record<string, any>, retries: number = this.maxRetries): Promise<T> {
    try {
      if (this.source) {
        params = { ...params, source: this.source };
      }

      const response: AxiosResponse<T> = await this.axiosInstance.get(url, { params });

      if (this.debug) {
        console.log(`GET ${url}`, {
          params,
          status: response.status,
          data: response.data,
        });
      }

      return response.data;
    } catch (error: any) {
      if (this.enableRetry && retries > 0 && error.response?.status === 429) {
        if (this.debug) {
          console.warn(`Rate limit hit, retrying in ${this.retryDelay}ms... (${this.maxRetries - retries + 1}/${this.maxRetries})`);
        }

        await this.delay(this.retryDelay);
        return this.makeGetRequest(url, params, retries - 1);
      }

      if (this.debug) {
        console.error(`Error in GET ${url}`, {
          params,
          error: error.message,
          response: error.response?.data,
        });
      }

      throw {
        data: null,
        error: true,
        error_message: error.message,
        error_code: error.response?.status || 500,
      };
    }
  }

  // Helper method to implement delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Example method using the default version and network, with descriptive arguments
  async getTokens(args: GetTokensArgs): Promise<any> {
    const { page, limit, options } = args;
    const url = `/${this.version}/${this.network}/token`;
    return this.makeGetRequest(url, { ...options, page, limit });
  }

  // Add other methods that use descriptive arguments and the updated request method
}

export default HistoriClient;
