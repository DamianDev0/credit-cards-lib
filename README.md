# Credit Card UI

A React component library for displaying and handling credit card input with real-time validation, brand detection, and animated card preview.

## Features

- Real-time card brand detection (Visa, Mastercard, Amex, Discover, JCB, Diners, UnionPay, Maestro, Elo, Hipercard)
- Card level detection (Classic, Gold, Platinum, Signature, Infinite, Black, Business, Corporate)
- Animated 3D card flip with customizable gradients
- Support for MeshGradient and GrainGradient effects
- Level-based visual effects (gold shimmer, platinum metallic, black brushed metal)
- Full form validation with detailed error messages
- Headless API for custom implementations
- TypeScript support
- Tailwind CSS compatible

## Installation

```bash
npm install @your-scope/credit-card-ui
```

### Peer Dependencies

```bash
npm install react react-dom
```

## Quick Start

### Basic Card Display

```tsx
import { CreditCard } from "@your-scope/credit-card-ui";

function App() {
  return (
    <CreditCard
      cardNumber="4111 1111 1111 1111"
      cardholderName="JOHN DOE"
      expiryDate="12/28"
      cvv="123"
      brand="visa"
      level="gold"
    />
  );
}
```

### Card with Form

```tsx
import { CreditCardWithForm } from "@your-scope/credit-card-ui";

function App() {
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <CreditCardWithForm
      onSubmit={handleSubmit}
      submitLabel="Pay Now"
    />
  );
}
```

### Using the Hook

```tsx
import { useCreditCard, CreditCard } from "@your-scope/credit-card-ui";

function App() {
  const {
    state,
    validation,
    metadata,
    handlers,
    formattedCardNumber,
  } = useCreditCard();

  return (
    <div>
      <CreditCard
        cardNumber={formattedCardNumber}
        cardholderName={state.cardholderName}
        expiryDate={state.expiryDate}
        cvv={state.cvv}
        brand={state.brand}
        level={metadata.level}
        isFlipped={state.isFlipped}
      />

      <input
        value={state.cardNumber}
        onChange={(e) => handlers.setCardNumber(e.target.value)}
        onFocus={() => handlers.setFocusedField("cardNumber")}
      />
    </div>
  );
}
```

---

## Components

### CreditCard

The main card display component with animated gradient backgrounds.

```tsx
import { CreditCard } from "@your-scope/credit-card-ui";
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cardNumber` | `string` | required | Card number to display |
| `cardholderName` | `string` | required | Cardholder name |
| `expiryDate` | `string` | required | Expiry date (MM/YY) |
| `cvv` | `string` | required | CVV/CVC code |
| `brand` | `CardBrand` | required | Card brand |
| `level` | `CardLevel` | `"unknown"` | Card level for visual effects |
| `isFlipped` | `boolean` | `false` | Show back of card |
| `focusedField` | `CardField \| null` | `null` | Currently focused field |
| `bankName` | `string` | - | Optional bank name to display |
| `size` | `CardSize` | `"lg"` | Card size preset |
| `width` | `number \| string` | - | Custom card width |
| `animation` | `CardAnimationConfig` | - | Animation settings |
| `gradient` | `CardGradientConfig` | - | Gradient customization |
| `visibility` | `CardVisibilityConfig` | - | Element visibility |
| `placeholders` | `CardPlaceholders` | - | Placeholder text |
| `labels` | `CardLabels` | - | Card labels |
| `style` | `CardStyleConfig` | - | Style overrides |
| `classNames` | `CardClassNames` | - | CSS class overrides |

#### CardBrand

```typescript
type CardBrand =
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
```

#### CardLevel

```typescript
type CardLevel =
  | "classic"
  | "gold"
  | "platinum"
  | "signature"
  | "infinite"
  | "black"
  | "business"
  | "corporate"
  | "unknown";
```

#### CardSize

```typescript
type CardSize = "sm" | "md" | "lg" | "xl";
```

#### CardAnimationConfig

```typescript
interface CardAnimationConfig {
  flipDuration?: number;
  gradientTransitionDuration?: number;
  logoTransitionDuration?: number;
  disableAnimations?: boolean;
}
```

#### CardGradientConfig

```typescript
interface CardGradientConfig {
  type?: "mesh" | "grain";
  colors?: GradientColors;
  colorBack?: string;
  speed?: number;
  softness?: number;
  intensity?: number;
  noise?: number;
  disabled?: boolean;
}
```

#### CardVisibilityConfig

```typescript
interface CardVisibilityConfig {
  chip?: boolean;
  contactless?: boolean;
  brandLogo?: boolean;
  bankName?: boolean;
  magneticStripe?: boolean;
  signatureStrip?: boolean;
  legalText?: boolean;
}
```

#### CardStyleConfig

```typescript
interface CardStyleConfig {
  borderRadius?: string;
  shadow?: string;
  aspectRatio?: string;
}
```

#### CardClassNames

```typescript
interface CardClassNames {
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
```

#### Examples

Custom gradient:

```tsx
<CreditCard
  cardNumber="4111 1111 1111 1111"
  cardholderName="JOHN DOE"
  expiryDate="12/28"
  cvv="123"
  brand="visa"
  gradient={{
    type: "mesh",
    colors: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
    speed: 0.2,
    noise: 0.15,
  }}
/>
```

Grain gradient:

```tsx
<CreditCard
  cardNumber="5555 5555 5555 4444"
  cardholderName="JOHN DOE"
  expiryDate="12/28"
  cvv="123"
  brand="mastercard"
  gradient={{
    type: "grain",
    colors: ["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"],
    colorBack: "#000000",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.25,
  }}
/>
```

Disable animations:

```tsx
<CreditCard
  cardNumber="4111 1111 1111 1111"
  cardholderName="JOHN DOE"
  expiryDate="12/28"
  cvv="123"
  brand="visa"
  animation={{ disableAnimations: true }}
  gradient={{ disabled: true }}
/>
```

---

### CreditCardWithForm

Complete form component with card preview and validation.

```tsx
import { CreditCardWithForm } from "@your-scope/credit-card-ui";
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `FormLayout` | `"vertical"` | Form layout |
| `gap` | `number \| string` | `"2rem"` | Gap between card and form |
| `onSubmit` | `(data: FormSubmitData) => void` | - | Submit handler |
| `onCardChange` | `(data: FormSubmitData) => void` | - | Change handler |
| `isSubmitting` | `boolean` | `false` | Loading state |
| `submitLabel` | `string` | `"Submit"` | Button text |
| `showBankName` | `boolean` | `false` | Show bank name field |
| `showAddress` | `boolean` | `false` | Show address fields |
| `showSubmitButton` | `boolean` | `true` | Show submit button |
| `customFields` | `CustomField[]` | `[]` | Additional fields |
| `customFieldsPosition` | `"before" \| "after"` | `"after"` | Custom fields position |
| `initialValues` | `Partial<FormSubmitData>` | - | Initial form values |
| `className` | `string` | - | Root class |
| `cardClassName` | `string` | - | Card container class |
| `formClassName` | `string` | - | Form container class |
| `cardSize` | `CardSize` | `"lg"` | Card size |
| `cardWidth` | `number \| string` | - | Custom card width |
| `cardAnimation` | `CardAnimationConfig` | - | Card animation config |
| `cardGradient` | `CardGradientConfig` | - | Card gradient config |
| `cardVisibility` | `CardVisibilityConfig` | - | Card visibility config |
| `cardPlaceholders` | `CardPlaceholders` | - | Card placeholders |
| `cardLabels` | `CardLabels` | - | Card labels |
| `cardStyle` | `CardStyleConfig` | - | Card style config |
| `cardClassNames` | `CardClassNames` | - | Card class names |
| `formInputLabels` | `FormInputLabels` | - | Form field labels |
| `formInputPlaceholders` | `FormInputPlaceholders` | - | Form field placeholders |
| `cardProps` | `Partial<CreditCardProps>` | - | Additional card props |
| `formProps` | `FormStyleProps` | - | Form style props |
| `children` | `ReactNode` | - | Additional form content |
| `renderHeader` | `() => ReactNode` | - | Header render function |
| `renderFooter` | `() => ReactNode` | - | Footer render function |

#### FormLayout

```typescript
type FormLayout = "vertical" | "horizontal-left" | "horizontal-right";
```

#### FormSubmitData

```typescript
interface FormSubmitData {
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
```

#### FormInputLabels

```typescript
interface FormInputLabels {
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
```

#### FormInputPlaceholders

```typescript
interface FormInputPlaceholders {
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
```

#### CustomField

```typescript
interface CustomField {
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
  }) => ReactNode;
}
```

#### Examples

Horizontal layout with custom labels:

```tsx
<CreditCardWithForm
  layout="horizontal-left"
  onSubmit={handleSubmit}
  formInputLabels={{
    cardNumber: "Numero de Tarjeta",
    cardholderName: "Nombre del Titular",
    expiryDate: "Vencimiento",
    cvv: "Codigo",
  }}
  formInputPlaceholders={{
    cardholderName: "NOMBRE APELLIDO",
  }}
/>
```

With address and custom fields:

```tsx
<CreditCardWithForm
  onSubmit={handleSubmit}
  showAddress
  customFields={[
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "email@example.com",
      required: true,
    },
    {
      id: "phone",
      label: "Phone",
      type: "tel",
      placeholder: "+1 (555) 000-0000",
    },
  ]}
  customFieldsPosition="before"
/>
```

Custom styling:

```tsx
<CreditCardWithForm
  onSubmit={handleSubmit}
  cardGradient={{ noise: 0.2 }}
  cardStyle={{ borderRadius: "1.5rem" }}
  formProps={{
    classNames: {
      input: "bg-gray-100 border-none",
      submitButton: "bg-blue-600 hover:bg-blue-700",
    },
  }}
/>
```

---

## Hooks

### useCreditCard

Hook for managing credit card state and validation.

```tsx
import { useCreditCard } from "@your-scope/credit-card-ui";
```

#### Return Value

```typescript
interface UseCreditCardReturn {
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
```

#### CreditCardState

```typescript
interface CreditCardState {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  brand: CardBrand;
  isFlipped: boolean;
  focusedField: CardField | null;
}
```

#### CreditCardValidation

```typescript
interface CreditCardValidation {
  cardNumber: boolean;
  cardholderName: boolean;
  expiryDate: boolean;
  cvv: boolean;
  isValid: boolean;
}
```

#### CardMetadata

```typescript
interface CardMetadata {
  brand: CardBrand;
  type: CardType;
  level: CardLevel;
  region: CardRegion;
  country?: string;
  bank?: string;
  supportsInstallments: boolean;
  maxInstallments?: number;
  isRegional: boolean;
}
```

### useCreditCardForm

Hook used internally by CreditCardWithForm. Can be used for custom form implementations.

```tsx
import { useCreditCardForm } from "@your-scope/credit-card-ui";
```

---

## Core API

Headless utilities for card detection and validation.

### Detection Functions

```tsx
import {
  detectCard,
  detectBrand,
  detectPossibleBrands,
  getCardMetadata,
  formatCard,
  maskCard,
  isLatamCard,
  supportsInstallments,
  getMaxInstallments,
} from "@your-scope/credit-card-ui";
```

#### detectCard

Full card detection with metadata.

```typescript
function detectCard(number: string): CardDetectionResult;

interface CardDetectionResult {
  brand: CardBrand;
  possibleBrands: CardBrand[];
  metadata: CardMetadata;
  format: CardFormat;
  isComplete: boolean;
  normalized: string;
  formatted: string;
  masked: string;
}
```

Example:

```typescript
const result = detectCard("4111111111111111");
// {
//   brand: "visa",
//   possibleBrands: ["visa"],
//   metadata: { brand: "visa", type: "credit", level: "classic", ... },
//   isComplete: true,
//   formatted: "4111 1111 1111 1111",
//   masked: "************1111",
// }
```

#### detectBrand

Get brand only.

```typescript
function detectBrand(number: string): CardBrand;

detectBrand("4111111111111111"); // "visa"
detectBrand("5555555555554444"); // "mastercard"
detectBrand("378282246310005");  // "amex"
```

#### detectPossibleBrands

Get all possible brands for partial input.

```typescript
function detectPossibleBrands(number: string): CardBrand[];

detectPossibleBrands("4"); // ["visa"]
detectPossibleBrands("5"); // ["mastercard", "maestro"]
```

#### getCardMetadata

Get detailed card metadata.

```typescript
function getCardMetadata(number: string): CardMetadata;

getCardMetadata("4532015112830366");
// { brand: "visa", type: "credit", level: "gold", ... }
```

#### formatCard

Format card number with spaces.

```typescript
function formatCard(number: string): string;

formatCard("4111111111111111"); // "4111 1111 1111 1111"
formatCard("378282246310005");  // "3782 822463 10005"
```

#### maskCard

Mask card number showing only last 4 digits.

```typescript
function maskCard(number: string): string;

maskCard("4111111111111111"); // "************1111"
```

#### isLatamCard

Check if card is from Latin America.

```typescript
function isLatamCard(number: string): boolean;

isLatamCard("6362970000457013"); // true (Elo)
isLatamCard("4111111111111111"); // false
```

#### supportsInstallments

Check if card brand supports installment payments.

```typescript
function supportsInstallments(number: string): boolean;

supportsInstallments("4111111111111111"); // true (Visa)
supportsInstallments("6362970000457013"); // true (Elo)
```

#### getMaxInstallments

Get maximum installments for card brand.

```typescript
function getMaxInstallments(number: string): number | undefined;

getMaxInstallments("4111111111111111"); // 12
getMaxInstallments("6362970000457013"); // 18
```

### Validation Functions

```tsx
import {
  validateCardNumber,
  validateExpiryDate,
  validateCvv,
  validateCardholderName,
  validateCard,
  isValidCardNumber,
  isValidExpiry,
  isValidCvv,
  getValidationErrors,
} from "@your-scope/credit-card-ui";
```

#### validateCardNumber

Full card number validation with detailed errors.

```typescript
function validateCardNumber(number: string): CardValidationResult;

interface CardValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  brand: CardBrand;
  metadata: CardMetadata;
  checks: {
    luhn: boolean;
    length: boolean;
    prefix: boolean;
  };
}
```

Example:

```typescript
validateCardNumber("4111111111111111");
// { isValid: true, errors: [], brand: "visa", ... }

validateCardNumber("4111111111111112");
// { isValid: false, errors: [{ code: "invalid_luhn", message: "..." }], ... }
```

#### validateExpiryDate

Expiry date validation.

```typescript
function validateExpiryDate(expiry: string): ExpiryValidationResult;

interface ExpiryValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  month: number | null;
  year: number | null;
  isExpired: boolean;
  expiresThisMonth: boolean;
}
```

#### validateCvv

CVV validation (considers Amex 4-digit CVV).

```typescript
function validateCvv(cvv: string, brand?: CardBrand): CvvValidationResult;

interface CvvValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  expectedLength: number;
}
```

#### validateCard

Validate all card fields at once.

```typescript
function validateCard(
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  cardholderName: string
): FullCardValidation;
```

#### Boolean Validators

```typescript
isValidCardNumber("4111111111111111"); // true
isValidExpiry("12/28");                // true
isValidCvv("123");                     // true
isValidCvv("1234", "amex");            // true
```

#### getValidationErrors

Get all validation errors for a card.

```typescript
function getValidationErrors(
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  cardholderName: string
): ValidationError[];
```

---

## Test Cards

Test card numbers for development and testing.

```tsx
import {
  TEST_CARDS,
  getTestCardsByBrand,
  getTestCardsByType,
  getTestCardsByLevel,
  getRandomTestCard,
  findTestCard,
} from "@your-scope/credit-card-ui";
```

### Available Test Cards

| Brand | Level | Number | CVV |
|-------|-------|--------|-----|
| Visa | Classic | 4111111111111111 | 123 |
| Visa | Gold | 4532015112830366 | 123 |
| Visa | Platinum | 4539578763621486 | 123 |
| Visa | Signature | 4917610000000000 | 123 |
| Visa | Infinite | 4844111111111111 | 123 |
| Mastercard | Classic | 5111111111111118 | 123 |
| Mastercard | Gold | 5200828282828210 | 123 |
| Mastercard | Platinum | 5425233430109903 | 123 |
| Mastercard | Black | 5555555555554444 | 123 |
| Amex | Gold | 340000000000009 | 1234 |
| Amex | Platinum | 378282246310005 | 1234 |
| Amex | Black | 374200000000004 | 1234 |
| Discover | Classic | 6011111111111117 | 123 |
| JCB | Classic | 3528000000000000 | 123 |
| Diners | Classic | 30569309025904 | 123 |
| Elo | Classic | 6362970000457013 | 123 |
| Hipercard | Classic | 6062825624254001 | 123 |

### Functions

```typescript
getTestCardsByBrand("visa");
getTestCardsByType("credit");
getTestCardsByLevel("gold");
getRandomTestCard();
findTestCard("platinum");
```

---

## Utilities

### formatCardNumber

Format card number with spaces.

```tsx
import { formatCardNumber } from "@your-scope/credit-card-ui";

formatCardNumber("4111111111111111"); // "4111 1111 1111 1111"
```

### formatCardNumberWithDashes

Format with dashes for input fields.

```tsx
import { formatCardNumberWithDashes } from "@your-scope/credit-card-ui";

formatCardNumberWithDashes("4111111111111111"); // "4111 - 1111 - 1111 - 1111"
```

### cleanCardNumber

Remove non-digit characters.

```tsx
import { cleanCardNumber } from "@your-scope/credit-card-ui";

cleanCardNumber("4111 - 1111 - 1111 - 1111"); // "4111111111111111"
```

### getLastFourDigits

Get last 4 digits.

```tsx
import { getLastFourDigits } from "@your-scope/credit-card-ui";

getLastFourDigits("4111111111111111"); // "1111"
```

### cn

Utility for merging Tailwind classes.

```tsx
import { cn } from "@your-scope/credit-card-ui";

cn("text-red-500", condition && "bg-blue-500");
```

---

## Constants

```tsx
import {
  BRAND_GRADIENTS,
  CSS_FALLBACKS,
  LEVEL_EFFECTS,
  BRAND_NAMES,
  LATAM_BRANDS,
  CARD_PLACEHOLDERS,
  CARD_LIMITS,
} from "@your-scope/credit-card-ui";
```

### BRAND_GRADIENTS

Default gradient colors for each brand.

```typescript
BRAND_GRADIENTS.visa;       // ["#1a1f71", "#2d5bbd", "#1a1f71", "#5a88d6"]
BRAND_GRADIENTS.mastercard; // ["#eb001b", "#ff5f00", "#f79e1b", "#eb001b"]
```

### LEVEL_EFFECTS

Visual effects for card levels.

```typescript
LEVEL_EFFECTS.gold;
LEVEL_EFFECTS.platinum;
LEVEL_EFFECTS.black;
```

### BRAND_NAMES

Display names for brands.

```typescript
BRAND_NAMES.visa;       // "Visa"
BRAND_NAMES.mastercard; // "Mastercard"
BRAND_NAMES.amex;       // "American Express"
```

---

## TypeScript

All types are exported for use in your application.

```tsx
import type {
  CardBrand,
  CardType,
  CardLevel,
  CardMetadata,
  CreditCardProps,
  CreditCardWithFormProps,
  UseCreditCardReturn,
  ValidationError,
  FormSubmitData,
} from "@your-scope/credit-card-ui";
```

---

## Styling

The library uses Tailwind CSS. Include the library in your Tailwind content configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@your-scope/credit-card-ui/**/*.{js,ts,jsx,tsx}",
  ],
};
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

MIT
