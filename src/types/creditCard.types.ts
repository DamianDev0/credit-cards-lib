export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unknown";

export type CardField = "cardNumber" | "cardholderName" | "expiryDate" | "cvv";

export type CardSize = "sm" | "md" | "lg" | "xl";

export type GradientColors = [string, string, string, string];

export interface CardAnimationConfig {
  flipDuration?: number;
  gradientTransitionDuration?: number;
  logoTransitionDuration?: number;
  disableAnimations?: boolean;
}

export interface CardGradientConfig {
  colors?: GradientColors;
  speed?: number;
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

// Component Props
export interface CreditCardProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  brand: CardBrand;
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

export type FormVariant = "default" | "minimal" | "compact";

export type FormLayout = "vertical" | "horizontal-left" | "horizontal-right";

export interface FormLabels {
  cardNumber?: string;
  cardNumberHint?: string;
  cardholderName?: string;
  cardholderNameHint?: string;
  expiryDate?: string;
  expiryDateHint?: string;
  cvv?: string;
  cvvHint?: string;
  bankName?: string;
  bankNameHint?: string;
  submit?: string;
  processing?: string;
}

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

export interface CreditCardFormProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  brand: CardBrand;
  validation: CreditCardValidation;
  onCardNumberChange: (value: string) => void;
  onCardholderNameChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onFocusChange: (field: CardField | null) => void;
  onSubmit?: () => void;
  className?: string;
  isSubmitting?: boolean;
  submitLabel?: string;
  variant?: FormVariant;
  showLabels?: boolean;
  showHints?: boolean;
  showValidation?: boolean;
  bankName?: string;
  onBankNameChange?: (value: string) => void;
  labels?: FormLabels;
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
  customFields?: CustomField[];
  customFieldsPosition?: "before" | "after";
  initialValues?: Partial<FormSubmitData>;
  className?: string;
  cardClassName?: string;
  formClassName?: string;
  cardSize?: CardSize;
  cardProps?: Partial<CreditCardProps>;
  formProps?: Partial<Omit<CreditCardFormProps, "onSubmit">>;
  children?: React.ReactNode;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

// Hook return type
export interface UseCreditCardReturn {
  state: CreditCardState;
  validation: CreditCardValidation;
  handlers: {
    setCardNumber: (value: string) => void;
    setCardholderName: (value: string) => void;
    setExpiryDate: (value: string) => void;
    setCvv: (value: string) => void;
    setFocusedField: (field: CardField | null) => void;
    reset: () => void;
  };
  formattedCardNumber: string;
}
