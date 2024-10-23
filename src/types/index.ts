export interface GetAllowanceDto {
  owner?: string;
  spender?: string;
  tokenAddress?: string;
  tag?: number | Date;
}

export interface AllowanceResponseDto {
  network_name: string;
  chain_id: number;
  token_address: string;
  token_name: string;
  token_symbol: string;
  token_type: string;
  owner: string;
  spender: string;
  allowance: string;
  checked_at_block: number;
  checked_at_timestamp: string;
}

export interface GetBalanceDto {
  holder?: string;
  tokenAddress?: string;
  tag?: number | Date;
}

export interface BalanceResponseDto {
  network_name: string;
  chain_id: number;
  token_address: string;
  token_name: string;
  token_symbol: string;
  token_type: string;
  holder: string;
  balance: string;
  checked_at_block: number;
  checked_at_timestamp: string;
}

export interface BlockHeightResponseDto {
  network_name: string;
  chain_id: number;
  block_height: number;
}

export interface GetGasPriceRequestDto {
  type: 'native_transfer' | 'erc_transfer' | 'swap'; // Enum for type safety
}

export interface GasPriceResponseDto {
  network_name: string;
  chain_id: number;
  currency: string;
  event_type: string;
  gas_required: string;
  total_cost_dollars: string;
  gas_cost_wei: string;
  gas_cost_gwei: string;
  gas_cost_eth: string;
  fee_dollars: string;
  fee_wei: string;
  fee_gwei: string;
  fee_eth: string;
  tip_dollars: string;
  tip_wei: string;
  tip_gwei: string;
  tip_eth: string;
}

export interface GetBlockRequestDto {
  blockHash?: string;
  tag?: number | Date;
}

export interface BlockResponseDto {
  network_name: string;
  chain_id: number;
  block_hash: string;
  signed_at: string; // ISO date
  signed_at_timestamp: number;
  block_height: number;
  block_parent_hash: string;
  extra_data: string;
  miner_address: string;
  gas_used: number;
  gas_limit: number;
  block_gas_cost: string;
}


export interface GetTokenUriDto {
  tokenAddress: string;
  tokenId: number;
}

export interface TokenUriResponseDto {
  network_name: string;
  chain_id: number;
  token_id: number;
  token_uri: string;
  metadata: {
    [key: string]: any; // Additional metadata fields
  };
}

export interface GetNFTOwnerDto {
  tokenAddress: string;
  owner: string;
  tokenId: number;
  tag?: number | Date;
}

export interface NFTOwnershipResponseDto {
  network_name: string;
  chain_id: number;
  is_owner: boolean;
  owner: string;
  token_id: number;
  checked_at_block: number;
  checked_at_timestamp: string;
}


export interface GetTokenSupplyDto {
  tokenAddress: string;
  tag?: number | Date;
}

export interface TokenSupplyDto {
  contractAddress: string;
  blockNumber: number;
  totalSupply: string;
}

export interface UniswapV3PriceResponseDto {
  chain_id: number,
  network: string,
  block_height: number,
  price: string
}

export interface PaginatedTokensResponseDto {
  network_name: string;
  chain_id: number;
  page: number;
  limit: number;
  next?: string;
  previous?: string;
  tokens: TokenResponseDto[];
}

export interface GetTokensDto {
  tokenType?: string;
  page?: number;
  limit?: number;
}

export interface GetTokenByAddressDto {
  tokenAddress: string;
}

export interface TokenResponseDto {
  network_name: string;
  chain_id: number;
  token_address: string;
  block_height: number;
  token_type: string;
  name: string;
  symbol: string;
  decimals?: number;
  granularity?: string;
}

export interface GetContractTypeDto {
  tokenAddress: string;
  tokenType: 'erc20' | 'erc721' | 'erc777' | 'erc1155'; // Token types as enums for better type safety
}

export interface ContractTypeResponseDto {
  network_name: string;
  chain_id: number;
  token_address: string;
  type_checked: 'erc20' | 'erc721' | 'erc777' | 'erc1155'; // The token type that was checked
  is_of_type: boolean; // Whether the contract is of the specified type
}

export interface GetTransactionDetailsDto {
  txHash: string; // The transaction hash for which the details are requested
}

export interface LogEventDto {
  log_index: number;
  raw_log_topics: readonly string[];
  sender_address: string;
  raw_log_data: string;
}

export interface TransactionDto {
  block_signed_at: string; // ISO timestamp when the block was signed
  block_height: number; // The height (number) of the block
  block_hash: string; // Hash of the block containing the transaction
  tx_hash: string; // Transaction hash (unique identifier)
  tx_index: number; // Index of the transaction within the block
  successful: boolean; // Whether the transaction was successful
  from: string; // Address that initiated the transaction
  to: string | null; // Recipient address (can be null for contract creation)
  value: string; // Transaction value in Ether
  gas_offered: string; // Gas limit offered by the sender
  gas_spent: string; // Gas actually spent
  gas_price: string; // Gas price in gwei
  fees_paid: string; // Transaction fees paid, denominated in Ether
  input_data: string; // Input data for contract interactions
  explorer_url: string; // URL to view the transaction on a block explorer
  log_events: LogEventDto[]; // List of log events emitted during the transaction
}

export interface TransactionDetailsResponseDto {
  network_name: string; // Blockchain network name (e.g., eth-mainnet)
  chain_id: number; // Blockchain network ID (e.g., Ethereum mainnet is 1)
  transaction: TransactionDto; // Detailed transaction information
}
