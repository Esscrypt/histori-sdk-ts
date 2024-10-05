export function bigIntParser(input: string): bigint | null {
    try {
      return BigInt(input);
    } catch (error) {
      console.error(`Invalid input for BigInt: ${input}`, error);
      return null;
    }
  }

  
  export function calculatePrettyBalance(value: number | bigint, decimals: number, isBigInt: boolean, precision: number): string {
    let numericalValue: number;
  
    if (isBigInt) {
      // Convert bigint to number, might cause precision loss for very large numbers
      numericalValue = Number(value) / Math.pow(10, decimals);
    } else {
      numericalValue = (value as number) / Math.pow(10, decimals);
    }
  
    return numericalValue.toFixed(precision);
  }

  export function isValidApiKey(apiKey: string): boolean {
    const apiKeyPattern = /^histori_[a-zA-Z0-9]{8,}$/; // Alphanumeric with at least 8 characters after 'histori_'
    return apiKeyPattern.test(apiKey);
  }

  export function prettifyCurrency(amount: number | bigint, decimals: number, currency: string): string {
    try {
      let numericalAmount: number;
  
      if (typeof amount === 'bigint') {
        // Convert bigint to number, potential precision loss for very large values
        numericalAmount = Number(amount) / Math.pow(10, decimals);
      } else {
        numericalAmount = amount / Math.pow(10, decimals);
      }
  
      return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(numericalAmount);
    } catch (error) {
      console.error(`Error formatting currency: ${amount}`, error);
      return amount.toString();
    }
  }
  