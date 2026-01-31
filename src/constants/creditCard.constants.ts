import type { CardBrand } from "../types/creditCard.types";

export const CARD_PLACEHOLDERS = {
  number: "•••• •••• •••• ••••",
  name: "YOUR NAME",
  expiry: "MM/YY",
  cvv: "•••",
} as const;

export const CARD_LIMITS = {
  maxCardNumberLength: 16,
  maxExpiryLength: 5,
  minCvvLength: 3,
  maxCvvLength: 4,
  amexCvvLength: 4,
} as const;

export const BRAND_PATTERNS: Record<CardBrand, RegExp | null> = {
  visa: /^4/,
  mastercard: /^(5[1-5]|2[2-7])/,
  amex: /^3[47]/,
  discover: /^6(?:011|5)/,
  diners: /^3(?:0[0-5]|[68])/,
  jcb: /^(?:2131|1800|35)/,
  unknown: null,
};

export const BRAND_LOGO_PATHS: Record<CardBrand, string> = {
  visa: "visa",
  mastercard: "mastercard",
  amex: "amex",
  discover: "discover",
  diners: "diners",
  jcb: "jcb",
  unknown: "",
};

export const ANIMATION_CONFIG = {
  flip: {
    duration: 0.6,
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  },
  focus: {
    duration: 200,
  },
} as const;
