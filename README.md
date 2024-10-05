
# Histori SDK for TypeScript

The Histori SDK is the easiest way to interact with the Histori API for working with historical blockchain data. This SDK supports various blockchain networks, including Ethereum Mainnet and Testnets.

**Recommended:** Use Node.js v18 or above for the best experience.

> **Note:** An API key is required. You can register for a free key on the Histori [website](https://histori.xyz).

## Installation

Install the SDK using npm:
```bash
npm install @esscrypt/histori-sdk
```

## Creating a Client with HistoriClient
The `HistoriClient` is the main entry point for interacting with the Histori API. You need to pass your API key and optional settings to configure the default version and network.
```bash
import HistoriClient from '@esscrypt/histori-sdk';

const client = new HistoriClient('<YOUR_API_KEY>', {
  version: 'v1',          // Optional, default is 'v1'
  network: 'eth-mainnet'  // Optional, default is 'eth-mainnet'
});
```

### Options for HistoriClient
- `version (string)`: The API version to use. Default is 'v1'.
- `network (string)`: The blockchain network to connect to. Default is 'eth-mainnet'.

## Using the HistoriClient
### Fetching Tokens
The `getTokens` method retrieves a list of tokens with pagination options. It accepts an object with descriptive properties to specify the pagination parameters and any optional query parameters.
```bash
async function fetchTokens() {
  try {
    const tokens = await client.getTokens({
      page: 1,          // Page number for pagination
      limit: 10,        // Number of tokens to fetch per page
      options: {        // Optional query parameters
        tokenType: 'ERC20'
      }
    });

    console.log('Tokens:', tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
  }
}

fetchTokens();

```

## Fetching Balance
You can use the `BalanceService` to fetch the balance of a specific wallet for a given token:
```bash
async function fetchBalance() {
  try {
    const balance = await client.BalanceService.getBalance({
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      tokenAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
      blockNumber: 123456
    });

    console.log('Balance:', balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

fetchBalance();
```

## Default Network and Version
You can specify the `version` and `network` at the time of client creation. These values will be used as defaults for all subsequent API calls.
```bash
const client = new HistoriClient('<YOUR_API_KEY>', {
  version: 'v1',
  network: 'eth-mainnet'
});
```
If you want to override these defaults for a specific call, you can provide them as part of the arguments in individual methods.

### Options Object in Methods
Most service methods accept an optional options object to allow for additional query parameters, providing flexibility in making API calls.

### Utility Functions
The SDK also includes various utility functions for working with blockchain data:

- `bigIntParser(input: string): bigint` - Converts a string to a bigint.
- `calculatePrettyBalance(value: number, decimals: number, isBigInt: boolean, precision: number): string `- Formats a balance into a human-readable string.
- `isValidApiKey(apiKey: string): boolean` - Checks if an API key is valid.
- `prettifyCurrency(amount: number, decimals: number, currency: string): string `- Formats a number into a currency string.

## Error Handling
All methods in the SDK throw errors with a standardized format:
``` bash
{
  "data": null,
  "error": true,
  "error_message": "Detailed error message",
  "error_code": 500
}
```

## Examples
```
async function runExamples() {
  // Fetch tokens with pagination
  const tokens = await client.getTokens({ page: 1, limit: 10 });
  console.log('Tokens:', tokens);

  // Fetch balance for a wallet
  const balance = await client.BalanceService.getBalance({
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    tokenAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    blockNumber: 123456
  });
  console.log('Balance:', balance);
}

runExamples();
```

## Options reference
Here’s how to create a `HistoriClient` instance with the new options:
```bash
import HistoriClient from '@esscrypt/histori-sdk';

const client = new HistoriClient('<YOUR_API_KEY>', {
  version: 'v1',
  network: 'eth-mainnet',
  debug: true,
  threadCount: 3,
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 3000, // 3 seconds
  source: 'my-analytics-source',
});

async function testClient() {
  try {
    const tokens = await client.getTokens({ page: 1, limit: 10 });
    console.log('Tokens:', tokens);
  } catch (error) {
    console.error('Error fetching tokens:', error);
  }
}

testClient();

```
- `debug`: Logs detailed request information if true.
- `threadCount`: Added to the options but requires a more complex implementation for handling concurrent requests.
- `enableRetry`: Controls whether the client retries on HTTP 429 errors.
- `maxRetries`: Sets the maximum number of retry attempts.
- `retryDelay`: Specifies the delay between retries in milliseconds.
- `source`: Appended to request parameters for analytics purposes.

## Contributing
Contributions, issues, and feature requests are welcome! Feel free to check out the issues page for open tasks.

## Show Your Support
Give a ⭐️ if this project has helped you!

## License
This project is licensed under the Apache-2.0 license.