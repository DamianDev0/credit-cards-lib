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
} from "../core/types";

export {
  BRAND_NAMES,
  LATAM_BRANDS,
  REGIONAL_BRANDS,
  INSTALLMENT_SUPPORT,
} from "../core/types";

import type { CardBrand, CardLevel, CardMetadata } from "../core/types";

export type CardField = "cardNumber" | "cardholderName" | "expiryDate" | "cvv";

export type CardSize = "sm" | "md" | "lg" | "xl";

export type GradientColors = [string, string, string, string];

export interface CardAnimationConfig {
  flipDuration?: number;
  gradientTransitionDuration?: number;
  logoTransitionDuration?: number;
  disableAnimations?: boolean;
}

export type GradientType = "mesh" | "grain";

export interface CardGradientConfig {
  type?: GradientType;
  colors?: GradientColors;
  colorBack?: string;
  speed?: number;
  softness?: number;
  intensity?: number;
  noise?: number;
  disabled?: boolean;
}

export interface CardVisibilityConfig {
  chip?: boolean;
  contactless?: boolean;
  brandLogo?: boolean;
  bankName?: boolean;
  magneticStripe?: boolean;
  signatureStrip?: boolean;
  legalText?: boolean;
  hologram?: boolean;
  barcode?: boolean;
}

export interface CardPlaceholders {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface CardLabels {
  bankDisclaimer?: string;
  customerService?: string;
  termsAndConditions?: string;
  authorizedSignature?: string;
  securityNotice?: string;
}

export interface CardStyleConfig {
  borderRadius?: string;
  shadow?: string;
  aspectRatio?: string;
}

export interface CardClassNames {
  root?: string;
  front?: string;
  back?: string;
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  chip?: string;
  contactless?: string;
  brandLogo?: string;
  bankName?: string;
  magneticStripe?: string;
  signatureStrip?: string;
  hologram?: string;
  barcode?: string;
}

export interface CreditCardData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface BillingAddress {
  address1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CreditCardValidation {
  cardNumber: boolean;
  cardholderName: boolean;
  expiryDate: boolean;
  cvv: boolean;
  isValid: boolean;
}

export interface CreditCardState extends CreditCardData {
  brand: CardBrand;
  isFlipped: boolean;
  focusedField: CardField | null;
}

export interface CreditCardProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  brand: CardBrand;
  level?: CardLevel;
  isFlipped?: boolean;
  focusedField?: CardField | null;
  bankName?: string;
  className?: string;
  size?: CardSize;
  width?: number | string;
  animation?: CardAnimationConfig;
  gradient?: CardGradientConfig;
  visibility?: CardVisibilityConfig;
  placeholders?: CardPlaceholders;
  labels?: CardLabels;
  style?: CardStyleConfig;
  classNames?: CardClassNames;
  locale?: string;
}

export interface CreditCardFrontProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  brand: CardBrand;
  level?: CardLevel;
  focusedField?: CardField | null;
  bankName?: string;
  visibility?: CardVisibilityConfig;
  placeholders?: CardPlaceholders;
  classNames?: CardClassNames;
  animation?: CardAnimationConfig;
}

export interface CreditCardBackProps {
  cvv: string;
  cardNumber: string;
  visibility?: CardVisibilityConfig;
  placeholders?: CardPlaceholders;
  labels?: CardLabels;
  classNames?: CardClassNames;
}

export interface CardBrandLogoProps {
  brand: CardBrand;
  className?: string;
  size?: "sm" | "md" | "lg";
  animation?: CardAnimationConfig;
}

export type FormLayout = "vertical" | "horizontal-left" | "horizontal-right";

export interface FormClassNames {
  root?: string;
  field?: string;
  label?: string;
  hint?: string;
  input?: string;
  inputWrapper?: string;
  submitButton?: string;
  validIcon?: string;
}

export interface FormStyleProps {
  className?: string;
  classNames?: FormClassNames;
}

export interface CustomField {
  id: string;
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "number" | "password";
  required?: boolean;
  maxLength?: number;
  className?: string;
  render?: (props: {
    value: string;
    onChange: (value: string) => void;
    onFocus: () => void;
    onBlur: () => void;
  }) => React.ReactNode;
}

export interface AddressData {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface FormSubmitData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  brand: CardBrand;
  bankName?: string;
  address?: AddressData;
  customFields?: Record<string, string>;
  metadata?: CardMetadata;
}

export interface FormInputLabels {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface FormInputPlaceholders {
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  bankName?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface CreditCardWithFormProps {
  layout?: FormLayout;
  gap?: number | string;
  onSubmit?: (data: FormSubmitData) => void | Promise<void>;
  onCardChange?: (data: FormSubmitData) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  showBankName?: boolean;
  showAddress?: boolean;
  showSubmitButton?: boolean;
  customFields?: CustomField[];
  customFieldsPosition?: "before" | "after";
  initialValues?: Partial<FormSubmitData>;
  className?: string;
  cardClassName?: string;
  formClassName?: string;
  cardSize?: CardSize;
  cardWidth?: number | string;
  cardAnimation?: CardAnimationConfig;
  cardGradient?: CardGradientConfig;
  cardVisibility?: CardVisibilityConfig;
  cardPlaceholders?: CardPlaceholders;
  cardLabels?: CardLabels;
  cardStyle?: CardStyleConfig;
  cardClassNames?: CardClassNames;
  formInputLabels?: FormInputLabels;
  formInputPlaceholders?: FormInputPlaceholders;
  cardProps?: Partial<CreditCardProps>;
  formProps?: FormStyleProps;
  children?: React.ReactNode;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

export interface DetailedValidation {
  cardNumber: {
    isValid: boolean;
    errors: Array<{ code: string; message: string; hint?: string }>;
  };
  expiryDate: {
    isValid: boolean;
    errors: Array<{ code: string; message: string; hint?: string }>;
    isExpired: boolean;
    expiresThisMonth: boolean;
  };
  cvv: {
    isValid: boolean;
    errors: Array<{ code: string; message: string; hint?: string }>;
  };
  cardholderName: {
    isValid: boolean;
    errors: Array<{ code: string; message: string; hint?: string }>;
  };
}

export interface UseCreditCardReturn {
  state: CreditCardState;
  validation: CreditCardValidation;
  detailedValidation: DetailedValidation;
  metadata: CardMetadata;
  handlers: {
    setCardNumber: (value: string) => void;
    setCardholderName: (value: string) => void;
    setExpiryDate: (value: string) => void;
    setCvv: (value: string) => void;
    setFocusedField: (field: CardField | null) => void;
    reset: () => void;
  };
  formattedCardNumber: string;
  maskedCardNumber: string;
  isComplete: boolean;
  possibleBrands: CardBrand[];
}
