import creditCardType from "credit-card-type";
import type { CardBrand } from "../types/creditCard.types";

const TYPE_MAP: Record<string, CardBrand> = {
  visa: "visa",
  mastercard: "mastercard",
  "american-express": "amex",
  "diners-club": "diners",
  discover: "discover",
  jcb: "jcb",
};

/**
 * Detects the card brand based on the card number prefix
 */
export function detectBrand(cardNumber: string): CardBrand {
  const cleaned = cardNumber.replace(/\D/g, "");

  if (!cleaned) return "unknown";

  const results = creditCardType(cleaned);

  if (results.length === 0) return "unknown";

  const type = results[0].type;
  return TYPE_MAP[type] ?? "unknown";
}

/**
 * Validates a card number using the Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, "");

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validates expiry date (MM/YY format)
 */
export function validateExpiryDate(expiry: string): boolean {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);

  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
}

/**
 * Validates CVV based on card brand
 */
export function validateCvv(cvv: string, brand: CardBrand): boolean {
  const cleaned = cvv.replace(/\D/g, "");

  const typeKey = Object.entries(TYPE_MAP).find(([, v]) => v === brand)?.[0];
  if (typeKey) {
    const info = creditCardType.getTypeInfo(typeKey);
    if (info) {
      return cleaned.length === info.code.size;
    }
  }

  // Fallback for unknown brands
  return cleaned.length === 3;
}
