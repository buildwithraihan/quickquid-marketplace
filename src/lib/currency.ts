/**
 * Currency formatting utilities for QuickQUID marketplace
 * Formats prices in Indian Rupees (INR) using Intl.NumberFormat
 */

/**
 * Formats a numeric amount as Indian Rupee currency
 * @param amount - The numeric amount to format
 * @returns Formatted currency string (e.g., "₹5,000")
 */
export function formatCurrency(amount: number | undefined | null): string {
  // Fallback for undefined/null values
  if (amount === undefined || amount === null || isNaN(amount)) {
    return "₹0";
  }

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    // Fallback in case of formatting error
    console.warn("Currency formatting error:", error);
    return `₹${amount.toLocaleString("en-IN")}`;
  }
}

/**
 * Formats a price range (e.g., for service packages)
 * @param minAmount - Minimum price
 * @param maxAmount - Maximum price
 * @returns Formatted price range string (e.g., "₹5,000 - ₹15,000")
 */
export function formatPriceRange(
  minAmount: number | undefined | null,
  maxAmount: number | undefined | null
): string {
  const formattedMin = formatCurrency(minAmount);
  const formattedMax = formatCurrency(maxAmount);
  
  if (minAmount === maxAmount) {
    return formattedMin;
  }
  
  return `${formattedMin} - ${formattedMax}`;
}

/**
 * Formats currency with "Starting at" prefix for service listings
 * @param amount - The starting price amount
 * @returns Formatted string (e.g., "Starting at ₹5,000")
 */
export function formatStartingPrice(amount: number | undefined | null): string {
  return `Starting at ${formatCurrency(amount)}`;
}