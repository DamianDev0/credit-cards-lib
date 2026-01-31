export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unionpay"
  | "maestro"
  | "mir"
  | "elo"
  | "hipercard"
  | "hiper"
  | "verve"
  | "unknown";

export type CardType = "credit" | "debit" | "prepaid" | "unknown";

export type CardLevel =
  | "classic"
  | "gold"
  | "platinum"
  | "signature"
  | "infinite"
  | "black"
  | "business"
  | "corporate"
  | "unknown";

export type CardRegion = "global" | "latam" | "europe" | "asia" | "africa" | "unknown";

export interface CardMetadata {
  brand: CardBrand;
  type: CardType;
  level: CardLevel;
  country?: string;
  bank?: string;
  region: CardRegion;
  supportsInstallments: boolean;
  maxInstallments?: number;
  isRegional: boolean;
}

export interface CardFormat {
  gaps: number[];
  lengths: number[];
  code: {
    name: string;
    size: number;
  };
}

export interface CardDetectionResult {
  brand: CardBrand;
  possibleBrands: CardBrand[];
  metadata: CardMetadata;
  format: CardFormat;
  isComplete: boolean;
  normalized: string;
  formatted: string;
  masked: string;
}

export type ValidationErrorCode =
  | "empty"
  | "invalid_characters"
  | "invalid_length"
  | "invalid_length_for_brand"
  | "invalid_luhn"
  | "invalid_prefix"
  | "expired"
  | "invalid_month"
  | "invalid_cvv_length"
  | "unknown_brand";

export interface ValidationError {
  code: ValidationErrorCode;
  message: string;
  hint?: string;
  field: "cardNumber" | "expiryDate" | "cvv" | "cardholderName";
}

export interface CardValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  brand: CardBrand;
  metadata: CardMetadata;
  checks: {
    luhn: boolean;
    length: boolean;
    prefix: boolean;
    expiry: boolean;
    cvv: boolean;
  };
}

export interface ExpiryValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  month: number | null;
  year: number | null;
  isExpired: boolean;
  expiresThisMonth: boolean;
}

export interface CvvValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  expectedLength: number;
}

export interface FullCardValidation {
  isValid: boolean;
  cardNumber: CardValidationResult;
  expiryDate: ExpiryValidationResult;
  cvv: CvvValidationResult;
  cardholderName: {
    isValid: boolean;
    errors: ValidationError[];
  };
  metadata: CardMetadata;
}

export interface DetectOptions {
  strict?: boolean;
  includeMetadata?: boolean;
}

export interface ValidateOptions {
  strict?: boolean;
  allowTestCards?: boolean;
  requireCvv?: boolean;
  requireExpiry?: boolean;
}

export const BRAND_NAMES: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  diners: "Diners Club",
  jcb: "JCB",
  unionpay: "UnionPay",
  maestro: "Maestro",
  mir: "Mir",
  elo: "Elo",
  hipercard: "Hipercard",
  hiper: "Hiper",
  verve: "Verve",
  unknown: "Unknown",
};

export const LATAM_BRANDS: CardBrand[] = ["elo", "hipercard", "hiper"];

export const REGIONAL_BRANDS: Record<CardRegion, CardBrand[]> = {
  global: ["visa", "mastercard", "amex", "discover", "jcb"],
  latam: ["elo", "hipercard", "hiper"],
  europe: ["maestro"],
  asia: ["unionpay", "jcb"],
  africa: ["verve"],
  unknown: [],
};

export const INSTALLMENT_SUPPORT: Partial<Record<CardBrand, { supported: boolean; max: number }>> = {
  visa: { supported: true, max: 48 },
  mastercard: { supported: true, max: 48 },
  amex: { supported: true, max: 24 },
  elo: { supported: true, max: 12 },
  hipercard: { supported: true, max: 12 },
  diners: { supported: true, max: 12 },
};
