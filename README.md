
# Histori SDK for TypeScript

![Histori SDK Banner](./assets/banner.webp)


The Histori SDK is the easiest way to interact with the Histori API for working with historical blockchain data. This SDK supports various blockchain networks, including Ethereum Mainnet and Testnets.

**Recommended:** Use Node.js v18 or above for the best experience.

> **Note:** An API key is required. You can register for a free key on the Histori [website](https://histori.xyz).

## Table of Contents
- [Histori SDK for TypeScript](#histori-sdk-for-typescript)
  - [Table of Contents](#table-of-contents)
  - [Documentation](#documentation)
  - [Installation](#installation)
  - [Creating a Client with HistoriClient](#creating-a-client-with-historiclient)
  - [Using the HistoriClient](#using-the-historiclient)
    - [Fetching Tokens](#fetching-tokens)
    - [Fetching Balance](#fetching-balance)
    - [Fetching Allowance](#fetching-allowance)
    - [Fetching ETH to USDT Price](#fetching-eth-to-usdt-price)
  - [Examples](#examples)
  - [Default Network and Version](#default-network-and-version)
  - [Options Object in Methods](#options-object-in-methods)
  - [Options reference](#options-reference)
  - [Error Handling](#error-handling)
  - [Contributing](#contributing)
  - [Show Your Support](#show-your-support)
  - [License](#license)

## [Documentation](https://esscrypt.github.io/histori-sdk-ts)
For detailed API documentation and additional examples, visit the official [Histori SDK Documentation](https://esscrypt.github.io/histori-sdk-ts) or the [Interactive Histori API Documentation](https://docs.histori.xyz/docs/api/balance-controller-get-single-balance)

---

## Installation

Install the SDK using npm:
```javascript
npm install @esscrypt/histori-sdk
```

## Creating a Client with HistoriClient
The `HistoriClient` is the main entry point for interacting with the Histori API. You need to pass your API key and optional settings to configure the default version and network.
```javascript
import HistoriClient from '@esscrypt/histori-sdk';

const client = new HistoriClient('<YOUR_API_KEY>');
```

## Using the HistoriClient
### Fetching Tokens
The `getTokens` method retrieves a list of tokens with pagination options. It accepts an object with descriptive properties to specify the pagination parameters and any optional query parameters.
```javascript
const tokens = await client.TokenService.getTokens();
```

### Fetching Balance
You can use the `BalanceService` to fetch the balance of a specific wallet for a given token:
```javascript
const balance = await client.BalanceService.getBalance({
  holder: 'vitalik.eth',
  tokenAddress: '0xF2ec4a773ef90c58d98ea734c0eBDB538519b988',
  tag: 20853281,
});
```

### Fetching Allowance
The `AllowanceService` can be used to get the allowance between an owner and a spender for a specific token:
```javascript
const allowance = await client.AllowanceService.getAllowance({
  owner: '0xa24D38b1B49E32c1c63731810a8D42ec9dd9aa8C',
  spender: '0x858646372CC42E1A627fcE94aa7A7033e7CF075A',
  tokenAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  tag: 20984269,
});
```

### Fetching ETH to USDT Price
Fetch the ETH to USDT price from the Uniswap V3 pool. Example:
```javascript
const price = await client.UniswapV3Service.getETHToUSDTPrice();
console.log('ETH to USDT Price:', price);
```

---

## Examples
```typescript
import HistoriClient from '@esscrypt/histori-sdk';


// Initialize HistoriClient with your API key
const client = new HistoriClient('<YOUR_API_KEY>');

// Example 1: Fetch paginated tokens
async function fetchTokens() {
  const tokens = await client.TokenService.getTokens();
  console.log('Tokens:', tokens);
}

// Example 2: Fetch balance for a wallet as of specific date
async function fetchBalance() {
  const balance = await client.BalanceService.getBalance({
    holder: 'vitalik.eth',
    tokenAddress: '0xF2ec4a773ef90c58d98ea734c0eBDB538519b988',
    tag: new Date('2024-10-22')
  });
  console.log('Balance:', balance);
}

// Example 3: Fetch allowance for owner and spender as of specific date
async function fetchAllowance() {
  const allowance = await client.AllowanceService.getAllowance({
    owner: '0xa24D38b1B49E32c1c63731810a8D42ec9dd9aa8C',
    spender: '0x858646372CC42E1A627fcE94aa7A7033e7CF075A',
    tokenAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
    tag: new Date('2024-10-22')
  });
  console.log('Allowance:', allowance);
}

// Example 4: Fetch the current block height for specific network
async function fetchBlockHeight() {
  const blockHeight = await client.ChainService.getBlockHeight();
  console.log('Block Height:', blockHeight);
}

// Example 5: Fetch gas info for common transaction types
async function fetchGasPrice() {
  const gasPrice = await client.ChainService.getGasInfo({
    type: 'native_transfer',
  });
  console.log('Gas Info:', gasPrice);
}

// Example 6: Fetch transaction details based on transaction hash
async function fetchTransactionDetails() {
  const transaction = await client.TransactionService.getTransactionDetails({
    txHash: '0xf85e0f37296608a3a23ffd8b2349c4cb25e9174d357c32d4416d3eb1d214080e',
  });
  console.log('Transaction Details:', transaction);
}

// Example 7: Fetch Historical token supply as of specific block height
async function fetchTokenSupply() {
  const tokenSupply = await client.TokenSupplyService.getTokenSupply({
    tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    tag: 20000000,
  });
  console.log('Token Supply:', tokenSupply);
}

// Example 8: Fetch the current ETH to USDT price from Uniswap V3
async function fetchETHToUSDTPrice() {
  const price = await client.UniswapV3Service.getETHToUSDPrice();
  console.log('ETH to USDT Price:', price);
}

// Example 9: Fetch NFT token URI
async function fetchNFTTokenUri() {
  const tokenUri = await client.NFTService.getTokenUri({
    tokenAddress: '0x630aa263CD2D9afed696AC6ca76268AFcD0ab1b2',
    tokenId: 1,
  });
  console.log('NFT Token URI:', tokenUri);
}

// Example 10: Check NFT ownership as of specific Date
async function checkNFTOwnership() {
  const is_owner: boolean = await client.NFTService.isOwnerOfToken({
    tokenAddress: '0xB3e782D5919924Faa456B5b5689B0A45963da4b7',
    owner: '0xd5470BaFb6074B10107b303D0cCe03cA5539b6E3',
    tokenId: 1,
    tag: new Date('2024-10-22')
  });
  console.log('Is Owner:', is_owner);
}

// Run all examples
async function runAllExamples() {
  await fetchTokens();
  await fetchBalance();
  await fetchAllowance();
  await fetchBlockHeight();
  await fetchGasPrice();
  await fetchTransactionDetails();
  await fetchTokenSupply();
  await fetchETHToUSDTPrice();
  await fetchNFTTokenUri();
  await checkNFTOwnership();
}

runAllExamples().then(() => {
  console.log('All examples executed successfully');
}).catch((error) => {
  console.error('Error executing examples:', error);
});
```

## Default Network and Version
You can specify the `version` and `network` at the time of client creation. These values will be used as defaults for all subsequent API calls.
```javascript
const client = new HistoriClient('<YOUR_API_KEY>', {
  version: 'v1',
  network: 'eth-mainnet'
});
```
## Options Object in Methods
If you want to override these defaults for a specific call, you can provide them as part of the arguments in individual methods. Example:
```javascript
const allowance = await client.AllowanceService.getAllowance({
  owner: '0xOwnerAddress',
  spender: '0xSpenderAddress',
  tokenAddress: '0xTokenAddress',
  tag: 123456}
  { version:'v1', network: 'eth-mainnet' } // Override settings for this request
);
```

## Options reference
Here’s how to create a `HistoriClient` instance with options:
```javascript
import HistoriClient from '@esscrypt/histori-sdk';

const client = new HistoriClient('<YOUR_API_KEY>', {
  baseUrl: 'api.histori.xyz'
  version: 'v1',
  network: 'eth-mainnet',
  debug: true,
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 3000, // 3 seconds
});
```
- `debug (boolean)`: Enables server logs for API calls. Very useful for development. Default: `false`.
- `baseUrl (string)`: The API baseUrl to use. Default is `api.histori.xyz`. You most likely don't need to set or change it.
- `version (string)`: The API version to use. Default is `v1`. Currently, only `v1` is supported.
- `network (string)`: The blockchain network to connect to. Default is `eth-mainnet`. Currently, only `eth-mainnet` is supported.
- `enableRetry (boolean)`: Enables retrying API calls on rate limit errors (HTTP 429). Default: `true`.
- `maxRetries (number)`: Sets the number of retries on rate limit errors. Requires enableRetry to be true. Default: `2`.
- `retryDelay (number)`: Sets the delay (in ms) before retrying on rate limit errors. Requires enableRetry to be true. Default: `2000`.

## Error Handling
All methods in the SDK throw errors with a standardized format. Example:
```bash
{
  "message": "Detailed error message(s), explaining how to correctly send the request",
  "error": "Not Found|Bad Request"
  "status": 404
}
```

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to check out the issues page for open tasks.

## Show Your Support
Give a ⭐️ if this project has helped you!

## License
This project is licensed under the MIT license.