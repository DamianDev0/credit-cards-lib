export type CardBrand =
  | "visa"
  | "mastercard"
  | "amex"
  | "discover"
  | "diners"
  | "jcb"
  | "unknown";

export type CardField = "cardNumber" | "cardholderName" | "expiryDate" | "cvv";

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
  isFlipped: boolean;
  focusedField: CardField | null;
  bankName?: string;
  className?: string;
}

export interface CreditCardFrontProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  brand: CardBrand;
  focusedField: CardField | null;
  bankName?: string;
}

export interface CreditCardBackProps {
  cvv: string;
  cardNumber: string;
}

export interface CardBrandLogoProps {
  brand: CardBrand;
  className?: string;
}

export type FormVariant = "default" | "minimal" | "compact";

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
  showValidation?: boolean;
  bankName?: string;
  onBankNameChange?: (value: string) => void;
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
