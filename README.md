# Credit Card UI React

<p align="center">
  <img src="https://res.cloudinary.com/dpqbn1gqb/image/upload/v1769927646/credit_tltruh.gif" alt="Credit Card UI Demo" width="800" />
</p>

<p align="center">
  A modern, animated credit card component for React with real-time validation and brand detection.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/credit-card-ui-react"><img src="https://img.shields.io/npm/v/credit-card-ui-react.svg" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/credit-card-ui-react"><img src="https://img.shields.io/npm/dm/credit-card-ui-react.svg" alt="npm downloads" /></a>
  <a href="https://github.com/DamianDev0/credit-cards-lib/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/credit-card-ui-react.svg" alt="license" /></a>
</p>

---

## Features

- Real-time card brand detection (Visa, Mastercard, Amex, Discover, JCB, Diners, UnionPay, Maestro, Elo, Hipercard)
- Card level styling (Classic, Gold, Platinum, Signature, Infinite, Black, Business, Corporate)
- Animated 3D flip effect
- MeshGradient and GrainGradient background effects
- Full form validation with detailed error messages
- Headless API for custom implementations
- TypeScript support
- Tailwind CSS compatible

---

## Install

```bash
npm install credit-card-ui-react
```

### Import Styles

```tsx
import "credit-card-ui-react/styles.css";
```

> No Tailwind CSS required — all styles are pre-compiled and included.

---

## Usage

### Basic Card Component

```tsx
import { CreditCard } from "credit-card-ui-react";

<CreditCard
  cardNumber="4111 1111 1111 1111"
  cardholderName="JOHN DOE"
  expiryDate="12/28"
  cvv="123"
  brand="visa"
  level="gold"
/>
```

### Complete Payment Form

```tsx
import { useState } from "react";
import { CreditCardWithForm, type FormSubmitData } from "credit-card-ui-react";

function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormSubmitData) => {
    setIsSubmitting(true);

    await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setIsSubmitting(false);
  };

  return (
    <CreditCardWithForm
      layout="vertical"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitLabel="Pay Now"
      showBankName
    />
  );
}
```

### Using the Hook (Headless)

```tsx
import { useCreditCard, CreditCard } from "credit-card-ui-react";

function CustomForm() {
  const { state, validation, metadata, handlers, formattedCardNumber } = useCreditCard();

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

## Props

### CreditCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cardNumber` | `string` | **required** | Card number to display |
| `cardholderName` | `string` | **required** | Cardholder name |
| `expiryDate` | `string` | **required** | Expiry date (MM/YY) |
| `cvv` | `string` | **required** | CVV/CVC code |
| `brand` | `CardBrand` | **required** | Card brand |
| `level` | `CardLevel` | `"unknown"` | Card level for visual effects |
| `isFlipped` | `boolean` | `false` | Show back of card |
| `focusedField` | `CardField` | `null` | Currently focused field |
| `bankName` | `string` | - | Bank name to display |
| `size` | `CardSize` | `"lg"` | Size preset (`sm`, `md`, `lg`, `xl`) |
| `width` | `number \| string` | - | Custom card width |
| `animation` | `CardAnimationConfig` | - | Animation settings |
| `gradient` | `CardGradientConfig` | - | Gradient customization |
| `visibility` | `CardVisibilityConfig` | - | Element visibility |
| `placeholders` | `CardPlaceholders` | - | Placeholder text |
| `labels` | `CardLabels` | - | Back card labels |
| `style` | `CardStyleConfig` | - | Style overrides |
| `classNames` | `CardClassNames` | - | CSS class overrides |

### CreditCardWithForm

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `FormLayout` | `"vertical"` | Layout (`vertical`, `horizontal-left`, `horizontal-right`) |
| `gap` | `number \| string` | `"2rem"` | Gap between card and form |
| `onSubmit` | `function` | - | Submit handler `(data: FormSubmitData) => void \| Promise<void>` |
| `onCardChange` | `function` | - | Change handler |
| `onValidationError` | `function` | - | Called on invalid submit `(errors, data) => void` |
| `isSubmitting` | `boolean` | - | Loading state (auto-detected from async `onSubmit` if omitted) |
| `disabled` | `boolean` | `false` | Disable all form inputs and submit button |
| `submitLabel` | `string` | `"Submit"` | Button text |
| `showBankName` | `boolean` | `false` | Show bank name field |
| `showAddress` | `boolean` | `false` | Show address fields |
| `showSubmitButton` | `boolean` | `true` | Show submit button |
| `customFields` | `CustomField[]` | `[]` | Additional form fields |
| `initialValues` | `object` | - | Initial form values |
| `cardGradient` | `CardGradientConfig` | - | Card gradient config |
| `cardLabels` | `CardLabels` | - | Card back labels |
| `formInputLabels` | `FormInputLabels` | - | Form field labels |
| `formProps` | `FormStyleProps` | - | Form styling props |

---

## Types

```typescript
type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb" | "unionpay" | "maestro" | "mir" | "elo" | "hipercard" | "hiper" | "verve" | "unknown";

type CardLevel = "classic" | "gold" | "platinum" | "signature" | "infinite" | "black" | "business" | "corporate" | "unknown";

type CardSize = "sm" | "md" | "lg" | "xl";
```

---

## Configuration Objects

### CardGradientConfig

```typescript
{
  type?: "mesh" | "grain";
  colors?: [string, string, string, string];
  colorBack?: string;
  speed?: number;
  softness?: number;
  intensity?: number;
  noise?: number;
  disabled?: boolean;
}
```

### CardLabels (Back Text)

```typescript
{
  bankDisclaimer?: string;
  customerService?: string;
  termsAndConditions?: string;
  authorizedSignature?: string;
  securityNotice?: string;
}
```

### CardVisibilityConfig

```typescript
{
  chip?: boolean;
  contactless?: boolean;
  brandLogo?: boolean;
  bankName?: boolean;
  magneticStripe?: boolean;
  signatureStrip?: boolean;
  legalText?: boolean;
}
```

---

## Gradient Effects

The library supports two types of animated gradient backgrounds:

### Mesh Gradient (Default)

Smooth, fluid gradient animation with color blending.

### Grain Gradient

Textured gradient with noise effect for a premium look.

<p align="center">
  <img src="https://res.cloudinary.com/dpqbn1gqb/image/upload/v1769927645/credit-noise_qpjhyb.gif" alt="Grain Gradient Effect" width="800" />
</p>

```tsx
<CreditCard
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

**With CreditCardWithForm:**

```tsx
<CreditCardWithForm
  onSubmit={handleSubmit}
  cardGradient={{
    type: "grain",
    colors: ["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"],
    colorBack: "#000000",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.25,
  }}
/>
```

---

## Examples

### Full Example with All Props

```tsx
import { useState } from "react";
import { CreditCardWithForm, type FormSubmitData } from "credit-card-ui-react";

function CheckoutPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormSubmitData) => {
    setIsSubmitting(true);
    console.log("Payment data:", data);
    // Process payment...
    setIsSubmitting(false);
  };

  const handleCardChange = (data: FormSubmitData) => {
    console.log("Card changed:", data.brand, data.metadata?.level);
  };

  return (
    <CreditCardWithForm
      // Layout
      layout="vertical"
      gap="2rem"
      className="max-w-4xl mx-auto"
      cardClassName="mb-4"
      formClassName="px-4"

      // Form behavior
      onSubmit={handleSubmit}
      onCardChange={handleCardChange}
      isSubmitting={isSubmitting}
      submitLabel="Pay $99.00"
      showSubmitButton={true}

      // Form fields
      showBankName={true}
      showAddress={true}
      initialValues={{
        bankName: "BBVA",
        cardholderName: "JOHN DOE",
      }}

      // Custom fields
      customFields={[
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
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

      // Card appearance
      cardSize="lg"
      cardGradient={{
        type: "grain",
        colors: ["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"],
        colorBack: "#000000",
        softness: 0.5,
        intensity: 0.5,
        noise: 0.25,
      }}
      cardAnimation={{
        flipDuration: 0.6,
        gradientTransitionDuration: 0.5,
      }}
      cardVisibility={{
        chip: true,
        contactless: true,
        brandLogo: true,
        bankName: true,
      }}
      cardStyle={{
        borderRadius: "1rem",
        shadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      }}

      // Card back labels
      cardLabels={{
        bankDisclaimer: "This card is property of the issuing bank.",
        customerService: "Customer Service: 1-800-123-4567",
        authorizedSignature: "AUTHORIZED SIGNATURE",
      }}

      // Form labels (i18n)
      formInputLabels={{
        cardNumber: "Card Number",
        cardholderName: "Cardholder Name",
        expiryDate: "Expiry",
        cvv: "CVV",
        bankName: "Bank Name",
        address: "Address",
        city: "City",
        state: "State",
        zip: "ZIP Code",
        country: "Country",
      }}

      // Form placeholders
      formInputPlaceholders={{
        cardNumber: "0000 - 0000 - 0000 - 0000",
        cardholderName: "JOHN DOE",
        expiryDate: "MM/YY",
        cvv: "•••",
      }}

      // Form styling
      formProps={{
        classNames: {
          submitButton: "bg-zinc-900 hover:bg-zinc-800",
          input: "text-gray-900",
          label: "text-gray-700",
        },
      }}

      // Optional header/footer
      renderHeader={() => (
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">Secure Payment</h2>
        </div>
      )}
      renderFooter={() => (
        <p className="text-xs text-gray-500 text-center mt-4">
          Your payment is secured with 256-bit SSL encryption.
        </p>
      )}
    />
  );
}
```

### Minimal Setup

```tsx
<CreditCardWithForm
  onSubmit={(data) => console.log(data)}
  submitLabel="Pay Now"
/>
```

---

## Detection & Validation API

```typescript
import {
  detectBrand,
  formatCard,
  maskCard,
  isValidCardNumber,
  isValidExpiry,
  isValidCvv,
} from "credit-card-ui-react";

detectBrand("4111111111111111");      // "visa"
detectBrand("5555555555554444");      // "mastercard"
formatCard("4111111111111111");       // "4111 1111 1111 1111"
maskCard("4111111111111111");         // "************1111"
isValidCardNumber("4111111111111111"); // true
isValidExpiry("12/28");               // true
isValidCvv("123");                    // true
```

---

## Test Cards

| Brand | Level | Number | CVV |
|-------|-------|--------|-----|
| Visa | Classic | 4111111111111111 | 123 |
| Visa | Gold | 4532015112830366 | 123 |
| Visa | Platinum | 4539578763621486 | 123 |
| Mastercard | Classic | 5111111111111118 | 123 |
| Mastercard | Gold | 5200828282828210 | 123 |
| Mastercard | Black | 5555555555554444 | 123 |
| Amex | Platinum | 378282246310005 | 1234 |
| Discover | Classic | 6011111111111117 | 123 |

---

## Styling

Include the library in your Tailwind config:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/credit-card-ui-react/**/*.{js,ts,jsx,tsx}",
  ],
};
```

---

## License

MIT
