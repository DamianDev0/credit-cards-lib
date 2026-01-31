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
