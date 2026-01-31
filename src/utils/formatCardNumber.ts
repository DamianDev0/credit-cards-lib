/**
 * Formats a card number with spaces every 4 digits
 * @example formatCardNumber("4111111111111111") => "4111 1111 1111 1111"
 */
export function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const parts: string[] = [];

  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.slice(i, i + 4));
  }

  return parts.join(" ");
}

/**
 * Formats a card number with dashes for display in forms
 * @example formatCardNumberWithDashes("4111111111111111") => "4111 - 1111 - 1111 - 1111"
 */
export function formatCardNumberWithDashes(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  const parts: string[] = [];

  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.slice(i, i + 4));
  }

  return parts.join(" - ");
}

/**
 * Removes all non-digit characters from a string
 */
export function cleanCardNumber(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Gets the last 4 digits of a card number
 */
export function getLastFourDigits(cardNumber: string): string {
  const cleaned = cleanCardNumber(cardNumber);
  return cleaned.slice(-4) || "••••";
}
