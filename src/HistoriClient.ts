import axios, { AxiosInstance, AxiosResponse } from 'axios';
import BalanceService from './services/BalanceService';
import TokenService from './services/TokenService';
import AllowanceService from './services/AllowanceService';
import { RequestOptions } from './types/RequestOptions';
import UniswapV3Service from './services/UniswapV3Service';
import TransactionService from './services/TransactionService';
import TokenSupplyService from './services/TokenSupplyService';
import NFTService from './services/NFTService';
import ContractService from './services/ContractService';
import ChainService from './services/ChainService';

interface HistoriClientOptions {
  baseUrl?: string,
  version?: string;
  network?: string;
  debug?: boolean;
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number; // in milliseconds
  source?: string;
}

class HistoriClient {
  private apiKey: string;
  private axiosInstance: AxiosInstance;
  public version: string;
  public network: string;
  private baseUrl: string;
  private debug: boolean;
  private enableRetry: boolean;
  private maxRetries: number;
  private retryDelay: number;

  public BalanceService: BalanceService;
  public TokenService: TokenService;
  public AllowanceService: AllowanceService;
  public ChainService: ChainService;
  public ContractService: ContractService;
  public NFTService: NFTService;
  public TokenSupplyService: TokenSupplyService;
  public TransactionService: TransactionService;
  public UniswapV3Service: UniswapV3Service;

  constructor(apiKey: string, options: HistoriClientOptions = {}) {
    this.apiKey = apiKey;
    this.version = options.version || 'v1';
    this.network = options.network || 'eth-mainnet';
    this.baseUrl = options.baseUrl || 'https://api.histori.xyz'; // Default base URL
    this.debug = options.debug || false;
    this.enableRetry = options.enableRetry !== undefined ? options.enableRetry : true;
    this.maxRetries = options.maxRetries || 2;
    this.retryDelay = options.retryDelay || 2000;

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: { 'x-api-key': this.apiKey },
    });

    this.BalanceService = new BalanceService(this);
    this.AllowanceService = new AllowanceService(this);
    this.TokenService = new TokenService(this);
    this.ContractService = new ContractService(this);
    this.ChainService = new ChainService(this);
    this.TransactionService = new TransactionService(this);
    this.TokenSupplyService = new TokenSupplyService(this);
    this.UniswapV3Service = new UniswapV3Service(this);
    this.NFTService = new NFTService(this);
  }

  async makeGetRequest<T>(url: string, options?: RequestOptions, retries: number = this.maxRetries): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url);
      if (this.debug || options?.debug) {
        console.log(`GET ${url}`, { status: response.status, data: response.data });
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

      if (this.debug || options?.debug) {
        console.error(`Error in GET ${url}`, { params: options, error: error.message, response: error.response?.data });
      }
      let errorMessage;
      if(error.response.data) {
        errorMessage = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(' and ') // Concatenate array items with space
        : error.response.data.message;          // Use the value directly if it's not an array
      }

      throw { message: errorMessage || "Request failed. We could not deduct the failure reason.", error: error.response.data.error || "Network Error", status: error.response?.status || 500 };
      
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default HistoriClient;
