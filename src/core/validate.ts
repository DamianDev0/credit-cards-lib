/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CardBrand,
  CardValidationResult,
  ExpiryValidationResult,
  CvvValidationResult,
  FullCardValidation,
  ValidationError,
  ValidateOptions,
} from "./types";
import { detectCard } from "./detect";
import { BRAND_NAMES } from "./types";

function luhnCheck(number: string): boolean {
  const digits = number.replace(/\D/g, "");
  if (digits.length === 0) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function validateCardNumber(
  number: string,
  _options: ValidateOptions = {}
): CardValidationResult {
  const errors: ValidationError[] = [];
  const detection = detectCard(number);
  const normalized = detection.normalized;

  const checks = {
    luhn: false,
    length: false,
    prefix: false,
    expiry: true,
    cvv: true,
  };

  if (!normalized) {
    errors.push({
      code: "empty",
      message: "Enter your card number",
      hint: "You'll find it on the front of your card",
      field: "cardNumber",
    });
    return {
      isValid: false,
      errors,
      brand: "unknown",
      metadata: detection.metadata,
      checks,
    };
  }

  if (!/^\d+$/.test(normalized)) {
    errors.push({
      code: "invalid_characters",
      message: "Only numbers allowed",
      hint: "Remove any spaces, letters or symbols",
      field: "cardNumber",
    });
  }

  const validLengths = detection.format.lengths;
  const isValidLength = validLengths.includes(normalized.length);
  checks.length = isValidLength;

  if (!isValidLength && normalized.length > 0) {
    const remaining = validLengths[0] - normalized.length;
    if (remaining > 0) {
      errors.push({
        code: "invalid_length_for_brand",
        message: `${remaining} more digit${remaining > 1 ? "s" : ""} needed`,
        hint: `Enter all ${validLengths[0]} digits from your card`,
        field: "cardNumber",
      });
    } else {
      errors.push({
        code: "invalid_length_for_brand",
        message: "Too many digits",
        hint: `${BRAND_NAMES[detection.brand]} cards have ${validLengths.join(" or ")} digits`,
        field: "cardNumber",
      });
    }
  }

  const isValidLuhn = luhnCheck(normalized);
  checks.luhn = isValidLuhn;

  if (!isValidLuhn && isValidLength) {
    errors.push({
      code: "invalid_luhn",
      message: "This card number doesn't look right",
      hint: "Double-check the numbers on your card",
      field: "cardNumber",
    });
  }

  if (detection.brand === "unknown" && normalized.length >= 6) {
    errors.push({
      code: "unknown_brand",
      message: "Card not recognized",
      hint: "We accept Visa, Mastercard, Amex and more",
      field: "cardNumber",
    });
  }

  checks.prefix = detection.brand !== "unknown";

  const isValid = errors.length === 0 && isValidLength && isValidLuhn && checks.prefix;

  return {
    isValid,
    errors,
    brand: detection.brand,
    metadata: detection.metadata,
    checks,
  };
}

export function validateExpiryDate(expiry: string): ExpiryValidationResult {
  const errors: ValidationError[] = [];

  const cleaned = expiry.replace(/\D/g, "");
  let month: number | null = null;
  let year: number | null = null;

  if (!cleaned) {
    errors.push({
      code: "empty",
      message: "Enter expiry date",
      hint: "Find MM/YY on the front of your card",
      field: "expiryDate",
    });
    return { isValid: false, errors, month: null, year: null, isExpired: false, expiresThisMonth: false };
  }

  if (cleaned.length >= 2) {
    month = parseInt(cleaned.slice(0, 2), 10);
  }

  if (cleaned.length >= 4) {
    year = parseInt(cleaned.slice(2, 4), 10) + 2000;
  } else if (cleaned.length === 3) {
    year = parseInt(cleaned.slice(2, 3), 10) + 2020;
  }

  if (month !== null && (month < 1 || month > 12)) {
    errors.push({
      code: "invalid_month",
      message: "Invalid month",
      hint: "Enter a month between 01 and 12",
      field: "expiryDate",
    });
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  let isExpired = false;
  let expiresThisMonth = false;

  if (month !== null && year !== null) {
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      isExpired = true;
      errors.push({
        code: "expired",
        message: "This card has expired",
        hint: "Please use a different card",
        field: "expiryDate",
      });
    }

    if (year === currentYear && month === currentMonth) {
      expiresThisMonth = true;
    }
  }

  const isComplete = month !== null && year !== null && cleaned.length >= 4;
  const isValid = isComplete && errors.length === 0;

  return {
    isValid,
    errors,
    month,
    year,
    isExpired,
    expiresThisMonth,
  };
}

export function validateCvv(cvv: string, brand: CardBrand = "unknown"): CvvValidationResult {
  const errors: ValidationError[] = [];
  const cleaned = cvv.replace(/\D/g, "");

  const expectedLength = brand === "amex" ? 4 : 3;

  if (!cleaned) {
    errors.push({
      code: "empty",
      message: "Enter security code",
      hint: brand === "amex"
        ? "4 digits on the front of your card"
        : "3 digits on the back of your card",
      field: "cvv",
    });
    return { isValid: false, errors, expectedLength };
  }

  if (cleaned.length !== expectedLength) {
    errors.push({
      code: "invalid_cvv_length",
      message: `Enter ${expectedLength} digits`,
      hint: brand === "amex"
        ? "Find the 4-digit code on the front"
        : "Find the 3-digit code on the back",
      field: "cvv",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    expectedLength,
  };
}

export function validateCardholderName(name: string): { isValid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const trimmed = name.trim();

  if (!trimmed) {
    errors.push({
      code: "empty",
      message: "Enter cardholder name",
      hint: "Name as shown on your card",
      field: "cardholderName",
    });
    return { isValid: false, errors };
  }

  if (trimmed.length < 2) {
    errors.push({
      code: "invalid_length",
      message: "Name too short",
      hint: "Enter your full name",
      field: "cardholderName",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateCard(
  cardNumber: string,
  expiryDate: string = "",
  cvv: string = "",
  cardholderName: string = "",
  options: ValidateOptions = {}
): FullCardValidation {
  const cardValidation = validateCardNumber(cardNumber, options);
  const expiryValidation = validateExpiryDate(expiryDate);
  const cvvValidation = validateCvv(cvv, cardValidation.brand);
  const nameValidation = validateCardholderName(cardholderName);

  const isValid =
    cardValidation.isValid &&
    (options.requireExpiry === false || expiryValidation.isValid) &&
    (options.requireCvv === false || cvvValidation.isValid) &&
    nameValidation.isValid;

  return {
    isValid,
    cardNumber: cardValidation,
    expiryDate: expiryValidation,
    cvv: cvvValidation,
    cardholderName: nameValidation,
    metadata: cardValidation.metadata,
  };
}

export function isValidCardNumber(number: string): boolean {
  return validateCardNumber(number).isValid;
}

export function isValidExpiry(expiry: string): boolean {
  return validateExpiryDate(expiry).isValid;
}

export function isValidCvv(cvv: string, brand?: CardBrand): boolean {
  return validateCvv(cvv, brand).isValid;
}

export function getValidationErrors(
  cardNumber: string,
  expiryDate: string = "",
  cvv: string = "",
  cardholderName: string = ""
): ValidationError[] {
  const validation = validateCard(cardNumber, expiryDate, cvv, cardholderName);
  return [
    ...validation.cardNumber.errors,
    ...validation.expiryDate.errors,
    ...validation.cvv.errors,
    ...validation.cardholderName.errors,
  ];
}
