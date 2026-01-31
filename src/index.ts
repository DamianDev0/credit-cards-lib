// Import CSS for Tailwind classes
import "./index.css";

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

export {
  TEST_CARDS,
  getTestCardsByBrand,
  getTestCardsByType,
  getTestCardsByLevel,
  getRandomTestCard,
  findTestCard,
} from "./core/testCards";
export type { TestCard } from "./core/testCards";

export {
  CreditCard,
  CreditCardFront,
  CreditCardBack,
  CardBrandLogo,
  NoiseOverlay,
  BRAND_GRADIENTS,
  CSS_FALLBACKS,
  LEVEL_EFFECTS,
  getLevelBadge,
  getLevelOverlayStyle,
} from "./components/CreditCard";
export type { LevelEffect } from "./components/CreditCard";

export { CreditCardWithForm, useCreditCardForm } from "./components/CreditCardForm";

export { CheckIcon } from "./components/icons";

export { useCreditCard } from "./hooks/useCreditCard";

export { cn } from "./utils/cn";
export {
  formatCardNumber,
  formatCardNumberWithDashes,
  cleanCardNumber,
  getLastFourDigits,
} from "./utils/formatCardNumber";

export {
  CARD_PLACEHOLDERS,
  CARD_LIMITS,
  ANIMATION_CONFIG,
} from "./constants/creditCard.constants";

export type {
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
  CardField,
  CardSize,
  GradientType,
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
  FormInputLabels,
  FormInputPlaceholders,
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

export {
  BRAND_NAMES,
  LATAM_BRANDS,
  REGIONAL_BRANDS,
  INSTALLMENT_SUPPORT,
} from "./types/creditCard.types";
