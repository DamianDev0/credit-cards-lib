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

const DEFAULT_LABELS = {
  cardNumber: "Card Number",
  cardNumberHint: "Enter the 16-digit card number",
  cardholderName: "Cardholder Name",
  cardholderNameHint: "Enter your name as on the card",
  expiryDate: "Expiry Date",
  expiryDateHint: "MM/YY",
  cvv: "CVV",
  cvvHint: "3 or 4 digits",
  bankName: "Bank Name",
  bankNameHint: "Optional",
  submit: "Add Card",
  processing: "Processing...",
};

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
  submitLabel,
  showLabels = true,
  showHints = true,
  bankName,
  onBankNameChange,
  labels,
  classNames,
}: CreditCardFormProps) {
  const mergedLabels = { ...DEFAULT_LABELS, ...labels };
  const finalSubmitLabel = submitLabel ?? mergedLabels.submit;

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

  const inputWrapperClass = cn(
    "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 border border-gray-200 rounded-xl",
    classNames?.inputWrapper
  );

  const inputClass = cn(
    "flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400",
    classNames?.input
  );

  const labelClass = cn("text-sm font-medium", classNames?.label);
  const hintClass = cn("text-xs text-gray-500", classNames?.hint);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-md mx-auto space-y-4 sm:space-y-5", className, classNames?.root)}
    >
      {onBankNameChange && (
        <div className={cn("space-y-1.5", classNames?.field)}>
          {showLabels && (
            <label htmlFor="bankName" className={labelClass}>
              {mergedLabels.bankName}
            </label>
          )}
          {showHints && <p className={hintClass}>{mergedLabels.bankNameHint}</p>}
          <div className={inputWrapperClass}>
            <input
              id="bankName"
              type="text"
              value={bankName || ""}
              onChange={(e) => onBankNameChange(e.target.value)}
              placeholder="BBVA"
              maxLength={20}
              className={cn(inputClass, "uppercase")}
            />
          </div>
        </div>
      )}

      <div className={cn("space-y-1.5", classNames?.field)}>
        {showLabels && (
          <label htmlFor="cardNumber" className={labelClass}>
            {mergedLabels.cardNumber}
          </label>
        )}
        {showHints && <p className={hintClass}>{mergedLabels.cardNumberHint}</p>}
        <div className={inputWrapperClass}>
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
            className={cn(inputClass, "font-mono tracking-wider")}
          />
          {validation.cardNumber && cardNumber.length > 0 && (
            <div
              className={cn(
                "w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0",
                classNames?.validIcon
              )}
            >
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className={cn("space-y-1.5", classNames?.field)}>
        {showLabels && (
          <label htmlFor="cardholderName" className={labelClass}>
            {mergedLabels.cardholderName}
          </label>
        )}
        {showHints && <p className={hintClass}>{mergedLabels.cardholderNameHint}</p>}
        <div className={inputWrapperClass}>
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
            className={cn(inputClass, "uppercase")}
          />
        </div>
      </div>

      <div className="flex gap-3 sm:gap-4">
        <div className={cn("flex-1 space-y-1.5", classNames?.field)}>
          {showLabels && (
            <label htmlFor="expiryDate" className={labelClass}>
              {mergedLabels.expiryDate}
            </label>
          )}
          {showHints && <p className={hintClass}>{mergedLabels.expiryDateHint}</p>}
          <div className={inputWrapperClass}>
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
              className={cn(inputClass, "w-full text-center font-mono")}
            />
          </div>
        </div>

        <div className={cn("flex-1 space-y-1.5", classNames?.field)}>
          {showLabels && (
            <label htmlFor="cvv" className={labelClass}>
              {mergedLabels.cvv}
            </label>
          )}
          {showHints && <p className={hintClass}>{mergedLabels.cvvHint}</p>}
          <div className={inputWrapperClass}>
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
              className={cn(inputClass, "w-full text-center font-mono")}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!validation.isValid || isSubmitting}
        className={cn(
          "w-full h-10 sm:h-12 rounded-xl font-medium text-white transition-colors",
          validation.isValid && !isSubmitting
            ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed",
          classNames?.submitButton
        )}
      >
        {isSubmitting ? mergedLabels.processing : finalSubmitLabel}
      </button>
    </form>
  );
}
