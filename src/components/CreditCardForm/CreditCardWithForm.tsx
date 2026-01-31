import { useState, useCallback, useMemo, useEffect, type ChangeEvent } from "react";
import type {
  FormLayout,
  CreditCardWithFormProps,
  AddressData,
  CustomField,
  CardField,
} from "../../types/creditCard.types";
import { cn } from "../../utils/cn";
import { useCreditCard } from "../../hooks/useCreditCard";
import { CreditCard } from "../CreditCard/CreditCard";
import { CARD_LIMITS } from "../../constants/creditCard.constants";
import { formatCardNumberWithDashes } from "../../utils/formatCardNumber";
import { CardBrandLogo } from "../CreditCard/CardBrandLogo";

const LAYOUT_CLASSES: Record<FormLayout, string> = {
  vertical: "flex flex-col items-center",
  "horizontal-left": "flex flex-col lg:flex-row-reverse items-center lg:items-start",
  "horizontal-right": "flex flex-col lg:flex-row items-center lg:items-start",
};

const EMPTY_ADDRESS: AddressData = {
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CreditCardWithForm({
  layout = "vertical",
  gap = "2rem",
  onSubmit,
  onCardChange,
  isSubmitting = false,
  submitLabel = "Submit",
  showBankName = false,
  showAddress = false,
  customFields = [],
  customFieldsPosition = "after",
  initialValues,
  className,
  cardClassName,
  formClassName,
  cardSize = "lg",
  cardProps,
  formProps,
  children,
  renderHeader,
  renderFooter,
}: CreditCardWithFormProps) {
  const { state, validation, handlers, formattedCardNumber } = useCreditCard();

  const [bankName, setBankName] = useState(initialValues?.bankName ?? "");
  const [address, setAddress] = useState<AddressData>({
    ...EMPTY_ADDRESS,
    ...initialValues?.address,
  });
  const [customValues, setCustomValues] = useState<Record<string, string>>(
    initialValues?.customFields ?? {}
  );

  const gapStyle = typeof gap === "number" ? `${gap}px` : gap;

  const formData = useMemo(
    () => ({
      cardNumber: state.cardNumber,
      cardholderName: state.cardholderName,
      expiryDate: state.expiryDate,
      cvv: state.cvv,
      brand: state.brand,
      bankName: showBankName ? bankName : undefined,
      address: showAddress ? address : undefined,
      customFields: customFields.length > 0 ? customValues : undefined,
    }),
    [state, bankName, address, customValues, showBankName, showAddress, customFields.length]
  );

  useEffect(() => {
    onCardChange?.(formData);
  }, [formData, onCardChange]);

  const handleCardNumberInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const cleaned = e.target.value.replace(/\D/g, "").slice(0, CARD_LIMITS.maxCardNumberLength);
      handlers.setCardNumber(cleaned);
    },
    [handlers]
  );

  const handleExpiryInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      handlers.setExpiryDate(value);
    },
    [handlers]
  );

  const handleCvvInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handlers.setCvv(e.target.value.replace(/\D/g, ""));
    },
    [handlers]
  );

  const handleFocus = useCallback(
    (field: CardField) => () => handlers.setFocusedField(field),
    [handlers]
  );

  const handleBlur = useCallback(() => handlers.setFocusedField(null), [handlers]);

  const handleAddressChange = useCallback(
    (field: keyof AddressData) => (e: ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleCustomFieldChange = useCallback(
    (id: string) => (value: string) => {
      setCustomValues((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (validation.isValid && onSubmit) {
        await onSubmit(formData);
      }
    },
    [validation.isValid, onSubmit, formData]
  );

  const inputWrapperClass = cn(
    "flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 border border-gray-200 rounded-xl",
    formProps?.classNames?.inputWrapper
  );

  const inputClass = cn(
    "flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400",
    formProps?.classNames?.input
  );

  const labelClass = cn("text-sm font-medium", formProps?.classNames?.label);
  const hintClass = cn("text-xs text-gray-500", formProps?.classNames?.hint);
  const fieldClass = cn("space-y-1.5", formProps?.classNames?.field);

  const renderCustomFields = (fields: CustomField[]) =>
    fields.map((field) => (
      <div key={field.id} className={cn(fieldClass, field.className)}>
        {field.label && <label htmlFor={field.id} className={labelClass}>{field.label}</label>}
        {field.hint && <p className={hintClass}>{field.hint}</p>}
        {field.render ? (
          field.render({
            value: customValues[field.id] ?? "",
            onChange: handleCustomFieldChange(field.id),
            onFocus: () => {},
            onBlur: () => {},
          })
        ) : (
          <div className={inputWrapperClass}>
            <input
              id={field.id}
              type={field.type ?? "text"}
              value={customValues[field.id] ?? ""}
              onChange={(e) => handleCustomFieldChange(field.id)(e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              required={field.required}
              className={inputClass}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div className={cn(LAYOUT_CLASSES[layout], className)} style={{ gap: gapStyle }}>
      <div className={cn("w-full", layout !== "vertical" && "lg:flex-1", cardClassName)}>
        <CreditCard
          cardNumber={formattedCardNumber}
          cardholderName={state.cardholderName}
          expiryDate={state.expiryDate}
          cvv={state.cvv}
          brand={state.brand}
          isFlipped={state.isFlipped}
          focusedField={state.focusedField}
          bankName={showBankName ? bankName : undefined}
          size={cardSize}
          {...cardProps}
        />
      </div>

      <div className={cn("w-full", layout !== "vertical" && "lg:flex-1", formClassName)}>
        <form onSubmit={handleSubmit} className={cn("w-full max-w-md mx-auto space-y-4 sm:space-y-5", formProps?.className)}>
          {renderHeader?.()}

          {showBankName && (
            <div className={fieldClass}>
              <label htmlFor="bankName" className={labelClass}>Bank Name</label>
              <p className={hintClass}>Optional</p>
              <div className={inputWrapperClass}>
                <input
                  id="bankName"
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value.toUpperCase())}
                  placeholder="BANK NAME"
                  maxLength={20}
                  className={cn(inputClass, "uppercase")}
                />
              </div>
            </div>
          )}

          {customFieldsPosition === "before" && renderCustomFields(customFields)}

          <div className={fieldClass}>
            <label htmlFor="cardNumber" className={labelClass}>Card Number</label>
            <div className={inputWrapperClass}>
              {state.brand !== "unknown" && (
                <div className="w-8 h-5 sm:w-10 sm:h-6 shrink-0">
                  <CardBrandLogo brand={state.brand} className="w-full h-full" />
                </div>
              )}
              <input
                id="cardNumber"
                type="text"
                value={formatCardNumberWithDashes(state.cardNumber)}
                onChange={handleCardNumberInput}
                onFocus={handleFocus("cardNumber")}
                onBlur={handleBlur}
                placeholder="0000 - 0000 - 0000 - 0000"
                inputMode="numeric"
                autoComplete="cc-number"
                className={cn(inputClass, "font-mono tracking-wider")}
              />
              {validation.cardNumber && state.cardNumber.length > 0 && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          <div className={fieldClass}>
            <label htmlFor="cardholderName" className={labelClass}>Cardholder Name</label>
            <div className={inputWrapperClass}>
              <input
                id="cardholderName"
                type="text"
                value={state.cardholderName}
                onChange={(e) => handlers.setCardholderName(e.target.value.slice(0, 22))}
                onFocus={handleFocus("cardholderName")}
                onBlur={handleBlur}
                placeholder="JOHN DOE"
                maxLength={22}
                autoComplete="cc-name"
                className={cn(inputClass, "uppercase")}
              />
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <div className={cn(fieldClass, "flex-1")}>
              <label htmlFor="expiryDate" className={labelClass}>Expiry</label>
              <div className={inputWrapperClass}>
                <input
                  id="expiryDate"
                  type="text"
                  value={state.expiryDate}
                  onChange={handleExpiryInput}
                  onFocus={handleFocus("expiryDate")}
                  onBlur={handleBlur}
                  placeholder="MM/YY"
                  maxLength={CARD_LIMITS.maxExpiryLength}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  className={cn(inputClass, "text-center font-mono")}
                />
              </div>
            </div>

            <div className={cn(fieldClass, "flex-1")}>
              <label htmlFor="cvv" className={labelClass}>CVV</label>
              <div className={inputWrapperClass}>
                <input
                  id="cvv"
                  type="password"
                  value={state.cvv}
                  onChange={handleCvvInput}
                  onFocus={handleFocus("cvv")}
                  onBlur={handleBlur}
                  placeholder="•••"
                  maxLength={CARD_LIMITS.maxCvvLength}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  className={cn(inputClass, "text-center font-mono")}
                />
              </div>
            </div>
          </div>

          {showAddress && (
            <>
              <div className={fieldClass}>
                <label htmlFor="address1" className={labelClass}>Address</label>
                <div className={inputWrapperClass}>
                  <input
                    id="address1"
                    type="text"
                    value={address.address1}
                    onChange={handleAddressChange("address1")}
                    placeholder="Street address"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className={fieldClass}>
                <div className={inputWrapperClass}>
                  <input
                    id="address2"
                    type="text"
                    value={address.address2}
                    onChange={handleAddressChange("address2")}
                    placeholder="Apt, suite, etc. (optional)"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className={cn(fieldClass, "flex-1")}>
                  <div className={inputWrapperClass}>
                    <input
                      id="city"
                      type="text"
                      value={address.city}
                      onChange={handleAddressChange("city")}
                      placeholder="City"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className={cn(fieldClass, "flex-1")}>
                  <div className={inputWrapperClass}>
                    <input
                      id="state"
                      type="text"
                      value={address.state}
                      onChange={handleAddressChange("state")}
                      placeholder="State"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className={cn(fieldClass, "flex-1")}>
                  <div className={inputWrapperClass}>
                    <input
                      id="zip"
                      type="text"
                      value={address.zip}
                      onChange={handleAddressChange("zip")}
                      placeholder="ZIP Code"
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className={cn(fieldClass, "flex-1")}>
                  <div className={inputWrapperClass}>
                    <input
                      id="country"
                      type="text"
                      value={address.country}
                      onChange={handleAddressChange("country")}
                      placeholder="Country"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {customFieldsPosition === "after" && renderCustomFields(customFields)}

          {children}

          <button
            type="submit"
            disabled={!validation.isValid || isSubmitting}
            className={cn(
              "w-full h-10 sm:h-12 rounded-xl font-medium text-white transition-colors",
              validation.isValid && !isSubmitting
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed",
              formProps?.classNames?.submitButton
            )}
          >
            {isSubmitting ? "Processing..." : submitLabel}
          </button>

          {renderFooter?.()}
        </form>
      </div>
    </div>
  );
}
