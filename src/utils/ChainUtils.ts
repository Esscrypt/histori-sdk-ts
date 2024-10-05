export enum ChainNames {
    ETH_MAINNET = 'eth-mainnet',
    ETH_ROPSTEN = 'eth-ropsten',
    // Add other chain names...
  }
  
  export enum ChainIDs {
    ETH_MAINNET = 1,
    ETH_ROPSTEN = 3,
    // Add other chain IDs...
  }
  
  export function normalizeChainInput(chain: string | number): string {
    if (typeof chain === 'number') {
      switch (chain) {
        case 1:
          return ChainNames.ETH_MAINNET;
        case 3:
          return ChainNames.ETH_ROPSTEN;
        // Handle other IDs...
        default:
          throw new Error('Unsupported chain ID');
      }
    }
    return chain;
  }
  