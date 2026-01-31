// Core API (Headless)
export {
  detectCard,
  detectBrand,
  detectPossibleBrands,
  getCardMetadata,
  formatCard,
  maskCard,
  isLatamCard,
  supportsInstallments,
  getMaxInstallments,
} from "./core/detect";

export {
  validateCardNumber,
  validateExpiryDate,
  validateCvv,
  validateCardholderName,
  validateCard,
  isValidCardNumber,
  isValidExpiry,
  isValidCvv,
  getValidationErrors,
} from "./core/validate";

// Test Cards (for development/testing)
export {
  TEST_CARDS,
  getTestCardsByBrand,
  getTestCardsByType,
  getTestCardsByLevel,
  getRandomTestCard,
  findTestCard,
} from "./core/testCards";
export type { TestCard } from "./core/testCards";

// Components
export {
  CreditCard,
  CreditCardFront,
  CreditCardBack,
  CardBrandLogo,
  BRAND_GRADIENTS,
  CSS_FALLBACKS,
  LEVEL_EFFECTS,
  getLevelBadge,
  getLevelOverlayStyle,
} from "./components/CreditCard";
export type { LevelEffect } from "./components/CreditCard";

export { CreditCardWithForm, useCreditCardForm } from "./components/CreditCardForm";

export { CheckIcon } from "./components/icons";

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

// Constants
export {
  CARD_PLACEHOLDERS,
  CARD_LIMITS,
  ANIMATION_CONFIG,
} from "./constants/creditCard.constants";

// All types (re-exported from creditCard.types which includes core types)
export type {
  // Core types
  CardBrand,
  CardType,
  CardLevel,
  CardRegion,
  CardMetadata,
  CardFormat,
  CardDetectionResult,
  ValidationError,
  ValidationErrorCode,
  CardValidationResult,
  ExpiryValidationResult,
  CvvValidationResult,
  FullCardValidation,
  DetectOptions,
  ValidateOptions,
  // UI types
  CardField,
  CardSize,
  GradientColors,
  CardAnimationConfig,
  CardGradientConfig,
  CardVisibilityConfig,
  CardPlaceholders,
  CardLabels,
  CardStyleConfig,
  CardClassNames,
  FormLayout,
  FormClassNames,
  FormStyleProps,
  CustomField,
  AddressData,
  FormSubmitData,
  CreditCardData,
  BillingAddress,
  CreditCardValidation,
  CreditCardState,
  CreditCardProps,
  CreditCardFrontProps,
  CreditCardBackProps,
  CardBrandLogoProps,
  CreditCardWithFormProps,
  UseCreditCardReturn,
  DetailedValidation,
} from "./types/creditCard.types";

// Constants from core
export {
  BRAND_NAMES,
  LATAM_BRANDS,
  REGIONAL_BRANDS,
  INSTALLMENT_SUPPORT,
} from "./types/creditCard.types";
