import { useCallback, type ChangeEvent } from "react";
import type { CreditCardFormProps, CardField } from "../../types/creditCard.types";
import { CARD_LIMITS } from "../../constants/creditCard.constants";
import { cn } from "../../utils/cn";
import { formatCardNumberWithDashes } from "../../utils/formatCardNumber";
import { CardBrandLogo } from "../CreditCard/CardBrandLogo";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CreditCardForm({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  brand,
  validation,
  onCardNumberChange,
  onCardholderNameChange,
  onExpiryDateChange,
  onCvvChange,
  onFocusChange,
  onSubmit,
  className,
  isSubmitting = false,
  submitLabel = "Add Card",
  bankName,
  onBankNameChange,
}: CreditCardFormProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validation.isValid && onSubmit) {
        onSubmit();
      }
    },
    [validation.isValid, onSubmit]
  );

  const handleCardNumberInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/\D/g, "").slice(0, CARD_LIMITS.maxCardNumberLength);
      onCardNumberChange(cleaned);
    },
    [onCardNumberChange]
  );

  const handleExpiryInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      onExpiryDateChange(value);
    },
    [onExpiryDateChange]
  );

  const handleCvvInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onCvvChange(e.target.value.replace(/\D/g, ""));
    },
    [onCvvChange]
  );

  const handleFocus = useCallback(
    (field: CardField) => () => {
      onFocusChange(field);
    },
    [onFocusChange]
  );

  const handleBlur = useCallback(() => {
    onFocusChange(null);
  }, [onFocusChange]);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-md mx-auto space-y-4 sm:space-y-5", className)}
    >
      {/* Bank Name */}
      {onBankNameChange && (
        <div className="space-y-1.5">
          <label htmlFor="bankName" className="text-sm font-medium">
            Bank Name
          </label>
          <p className="text-xs text-gray-500">Optional</p>
          <div className="flex items-center gap-2 p-2.5 sm:p-3 border border-gray-200 rounded-xl">
            <input
              id="bankName"
              type="text"
              value={bankName || ""}
              onChange={(e) => onBankNameChange(e.target.value)}
              placeholder="BBVA"
              maxLength={20}
              className="flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400 uppercase"
            />
          </div>
        </div>
      )}

      {/* Card Number */}
      <div className="space-y-1.5">
        <label htmlFor="cardNumber" className="text-sm font-medium">
          Card Number
        </label>
        <p className="text-xs text-gray-500">
          Enter the 16-digit card number
        </p>
        <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 border border-gray-200 rounded-xl">
          {brand !== "unknown" && (
            <div className="w-8 h-5 sm:w-10 sm:h-6 shrink-0">
              <CardBrandLogo brand={brand} className="w-full h-full" />
            </div>
          )}
          <input
            id="cardNumber"
            type="text"
            value={formatCardNumberWithDashes(cardNumber)}
            onChange={handleCardNumberInput}
            onFocus={handleFocus("cardNumber")}
            onBlur={handleBlur}
            placeholder="0000 - 0000 - 0000 - 0000"
            inputMode="numeric"
            autoComplete="cc-number"
            className="flex-1 font-mono text-sm bg-transparent outline-none placeholder:text-gray-400 tracking-wider"
          />
          {validation.cardNumber && cardNumber.length > 0 && (
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Cardholder Name */}
      <div className="space-y-1.5">
        <label htmlFor="cardholderName" className="text-sm font-medium">
          Cardholder Name
        </label>
        <p className="text-xs text-gray-500">
          Enter your name as on the card
        </p>
        <div className="flex items-center gap-2 p-2.5 sm:p-3 border border-gray-200 rounded-xl">
          <input
            id="cardholderName"
            type="text"
            value={cardholderName}
            onChange={(e) => onCardholderNameChange(e.target.value.slice(0, 22))}
            onFocus={handleFocus("cardholderName")}
            onBlur={handleBlur}
            placeholder="John Doe"
            maxLength={22}
            autoComplete="cc-name"
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400 uppercase"
          />
        </div>
      </div>

      {/* Expiry & CVV Row */}
      <div className="flex gap-3 sm:gap-4">
        <div className="flex-1 space-y-1.5">
          <label htmlFor="expiryDate" className="text-sm font-medium">
            Expiry Date
          </label>
          <p className="text-xs text-gray-500">MM/YY</p>
          <div className="flex items-center gap-2 p-2.5 sm:p-3 border border-gray-200 rounded-xl">
            <input
              id="expiryDate"
              type="text"
              value={expiryDate}
              onChange={handleExpiryInput}
              onFocus={handleFocus("expiryDate")}
              onBlur={handleBlur}
              placeholder="MM/YY"
              maxLength={CARD_LIMITS.maxExpiryLength}
              inputMode="numeric"
              autoComplete="cc-exp"
              className="w-full text-center font-mono text-sm bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          <label htmlFor="cvv" className="text-sm font-medium">
            CVV
          </label>
          <p className="text-xs text-gray-500">3 or 4 digits</p>
          <div className="flex items-center gap-2 p-2.5 sm:p-3 border border-gray-200 rounded-xl">
            <input
              id="cvv"
              type="password"
              value={cvv}
              onChange={handleCvvInput}
              onFocus={handleFocus("cvv")}
              onBlur={handleBlur}
              placeholder="•••"
              maxLength={CARD_LIMITS.maxCvvLength}
              inputMode="numeric"
              autoComplete="cc-csc"
              className="w-full text-center font-mono text-sm bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!validation.isValid || isSubmitting}
        className={cn(
          "w-full h-10 sm:h-12 rounded-xl font-medium text-white transition-colors",
          validation.isValid && !isSubmitting
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        )}
      >
        {isSubmitting ? "Processing..." : submitLabel}
      </button>
    </form>
  );
}
