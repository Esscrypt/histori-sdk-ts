export interface TokenDto {
  tokenAddress: string;
  blockNumber: number;
  tokenType: string;
  name: string;
  symbol: string;
  decimals?: number;
  granularity?: string;
}

export interface BalanceDto {
  walletAddress: string;
  tokenAddress: string;
  balance: string;
  blockNumber: number;
  tokenId?: number;
  tokenType: string;
}

export interface AllowanceDto {
  ownerAddress: string;
  spenderAddress: string;
  tokenAddress: string;
  blockNumber: number;
  allowance?: string;
  tokenId?: number;
  tokenType: string;
} 

export interface TokenSupplyDto {
  tokenAddress: string;
  blockNumber: number;
  totalSupply: string;
}

export interface TokenIDDto {
  contractAddress: string;
  tokenId: number;
  tokenUri?: string;
}
  
  export interface QueryParameters {
      page?: number;
      limit?: number;
      [key: string]: any;
  }

  export interface GetAllowanceDto {
    ownerAddress: string;
    spenderAddress: string;
    tokenAddress: string;
    blockNumber?: number;
  }

  export interface GetBalanceDto {
    walletAddress: string;
    tokenAddress: string;
    blockNumber: number;
  }
  
  export interface GetTokensDto {
    page: number;
    limit: number;
  }