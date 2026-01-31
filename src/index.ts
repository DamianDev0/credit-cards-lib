// Components
export {
  CreditCard,
  CreditCardFront,
  CreditCardBack,
  CardBrandLogo,
  BRAND_GRADIENTS,
  CSS_FALLBACKS,
} from "./components/CreditCard";
export type { GradientColors } from "./components/CreditCard";

export { CreditCardForm } from "./components/CreditCardForm";

// Hooks
export { useCreditCard } from "./hooks/useCreditCard";

// Utils
export { cn } from "./utils/cn";
export {
  formatCardNumber,
  formatCardNumberWithDashes,
  cleanCardNumber,
  getLastFourDigits,
} from "./utils/formatCardNumber";
export {
  detectBrand,
  validateCardNumber,
  validateExpiryDate,
  validateCvv,
} from "./utils/detectBrand";

// Constants
export {
  CARD_PLACEHOLDERS,
  CARD_LIMITS,
  BRAND_PATTERNS,
  BRAND_LOGO_PATHS,
  ANIMATION_CONFIG,
} from "./constants/creditCard.constants";

// Types
export type {
  CardBrand,
  CardField,
  FormVariant,
  CreditCardData,
  BillingAddress,
  CreditCardValidation,
  CreditCardState,
  CreditCardProps,
  CreditCardFrontProps,
  CreditCardBackProps,
  CardBrandLogoProps,
  CreditCardFormProps,
  UseCreditCardReturn,
} from "./types/creditCard.types";
