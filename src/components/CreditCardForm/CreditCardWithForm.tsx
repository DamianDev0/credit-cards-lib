import type { CreditCardWithFormProps, CustomField } from "../../types/creditCard.types";
import { cn } from "../../utils/cn";
import { CreditCard } from "../CreditCard/CreditCard";
import { CARD_LIMITS } from "../../constants/creditCard.constants";
import { formatCardNumberWithDashes } from "../../utils/formatCardNumber";
import { CardBrandLogo } from "../CreditCard/CardBrandLogo";
import { CheckIcon } from "../icons/CheckIcon";
import { LAYOUT_CLASSES } from "./constants";
import { getFormStyles } from "./styles";
import { useCreditCardForm } from "./hooks/useCreditCardForm";

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
  const {
    state,
    validation,
    detailedValidation,
    metadata,
    formattedCardNumber,
    bankName,
    address,
    customValues,
    getFirstError,
    handlers,
  } = useCreditCardForm({
    initialValues,
    showBankName,
    showAddress,
    customFields,
    onCardChange,
    onSubmit,
  });

  const gapStyle = typeof gap === "number" ? `${gap}px` : gap;
  const styles = getFormStyles(formProps);

  const renderCustomFields = (fields: CustomField[]) =>
    fields.map((field) => (
      <div key={field.id} className={cn(styles.field, field.className)}>
        {field.label && (
          <label htmlFor={field.id} className={styles.label}>
            {field.label}
          </label>
        )}
        {field.hint && <p className={styles.hint}>{field.hint}</p>}
        {field.render ? (
          field.render({
            value: customValues[field.id] ?? "",
            onChange: handlers.handleCustomFieldChange(field.id),
            onFocus: () => {},
            onBlur: () => {},
          })
        ) : (
          <div className={styles.inputWrapper}>
            <input
              id={field.id}
              type={field.type ?? "text"}
              value={customValues[field.id] ?? ""}
              onChange={(e) => handlers.handleCustomFieldChange(field.id)(e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              required={field.required}
              className={styles.input}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div className={cn(LAYOUT_CLASSES[layout], className)} style={{ gap: gapStyle }}>
      {/* Card Preview */}
      <div className={cn("w-full", layout !== "vertical" && "lg:flex-1", cardClassName)}>
        <CreditCard
          cardNumber={formattedCardNumber}
          cardholderName={state.cardholderName}
          expiryDate={state.expiryDate}
          cvv={state.cvv}
          brand={state.brand}
          level={metadata.level}
          isFlipped={state.isFlipped}
          focusedField={state.focusedField}
          bankName={showBankName ? bankName : undefined}
          size={cardSize}
          {...cardProps}
        />
      </div>

      {/* Form */}
      <div className={cn("w-full", layout !== "vertical" && "lg:flex-1", formClassName)}>
        <form
          onSubmit={handlers.handleSubmit}
          className={cn("w-full max-w-md mx-auto space-y-4 sm:space-y-5", formProps?.className)}
        >
          {renderHeader?.()}

          {/* Bank Name Field */}
          {showBankName && (
            <div className={styles.field}>
              <label htmlFor="bankName" className={styles.label}>
                Bank Name
              </label>
              <p className={styles.hint}>Optional</p>
              <div className={styles.inputWrapper}>
                <input
                  id="bankName"
                  type="text"
                  value={bankName}
                  onChange={handlers.handleBankNameChange}
                  placeholder="BANK NAME"
                  maxLength={20}
                  className={cn(styles.input, "uppercase")}
                />
              </div>
            </div>
          )}

          {customFieldsPosition === "before" && renderCustomFields(customFields)}

          {/* Card Number Field */}
          <div className={styles.field}>
            <label htmlFor="cardNumber" className={styles.label}>
              Card Number
            </label>
            <div className={styles.inputWrapper}>
              {state.brand !== "unknown" && (
                <div className="w-8 h-5 sm:w-10 sm:h-6 shrink-0">
                  <CardBrandLogo brand={state.brand} className="w-full h-full" />
                </div>
              )}
              <input
                id="cardNumber"
                type="text"
                value={formatCardNumberWithDashes(state.cardNumber)}
                onChange={handlers.handleCardNumberInput}
                onFocus={handlers.handleFocus("cardNumber")}
                onBlur={handlers.handleBlur}
                placeholder="0000 - 0000 - 0000 - 0000"
                inputMode="numeric"
                autoComplete="cc-number"
                className={cn(styles.input, "font-mono tracking-wider")}
              />
              {validation.cardNumber && state.cardNumber.length > 0 && (
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            {state.cardNumber.length > 0 && getFirstError("cardNumber") && (
              <p className="text-xs text-red-500 mt-1">
                {getFirstError("cardNumber")?.hint || getFirstError("cardNumber")?.message}
              </p>
            )}
            {metadata.type !== "unknown" && state.cardNumber.length >= 6 && (
              <p className="text-xs text-gray-500 mt-1">
                {metadata.type.charAt(0).toUpperCase() + metadata.type.slice(1)} card
                {metadata.level !== "unknown" &&
                  ` • ${metadata.level.charAt(0).toUpperCase() + metadata.level.slice(1)}`}
                {metadata.supportsInstallments &&
                  ` • Supports installments${metadata.maxInstallments ? ` (up to ${metadata.maxInstallments})` : ""}`}
              </p>
            )}
          </div>

          {/* Cardholder Name Field */}
          <div className={styles.field}>
            <label htmlFor="cardholderName" className={styles.label}>
              Cardholder Name
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="cardholderName"
                type="text"
                value={state.cardholderName}
                onChange={handlers.handleCardholderNameInput}
                onFocus={handlers.handleFocus("cardholderName")}
                onBlur={handlers.handleBlur}
                placeholder="JOHN DOE"
                maxLength={22}
                autoComplete="cc-name"
                className={cn(styles.input, "uppercase")}
              />
            </div>
          </div>

          {/* Expiry and CVV Fields */}
          <div className="flex gap-3 sm:gap-4">
            <div className={cn(styles.field, "flex-1")}>
              <label htmlFor="expiryDate" className={styles.label}>
                Expiry
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="expiryDate"
                  type="text"
                  value={state.expiryDate}
                  onChange={handlers.handleExpiryInput}
                  onFocus={handlers.handleFocus("expiryDate")}
                  onBlur={handlers.handleBlur}
                  placeholder="MM/YY"
                  maxLength={CARD_LIMITS.maxExpiryLength}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  className={cn(styles.input, "text-center font-mono")}
                />
              </div>
              {state.expiryDate.length > 0 && getFirstError("expiryDate") && (
                <p className="text-xs text-red-500 mt-1">
                  {getFirstError("expiryDate")?.hint || getFirstError("expiryDate")?.message}
                </p>
              )}
              {detailedValidation.expiryDate.expiresThisMonth &&
                !detailedValidation.expiryDate.isExpired && (
                  <p className="text-xs text-amber-500 mt-1">Expires this month</p>
                )}
            </div>

            <div className={cn(styles.field, "flex-1")}>
              <label htmlFor="cvv" className={styles.label}>
                CVV
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="cvv"
                  type="password"
                  value={state.cvv}
                  onChange={handlers.handleCvvInput}
                  onFocus={handlers.handleFocus("cvv")}
                  onBlur={handlers.handleBlur}
                  placeholder="•••"
                  maxLength={CARD_LIMITS.maxCvvLength}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  className={cn(styles.input, "text-center font-mono")}
                />
              </div>
              {state.cvv.length > 0 && getFirstError("cvv") && (
                <p className="text-xs text-red-500 mt-1">
                  {getFirstError("cvv")?.hint || getFirstError("cvv")?.message}
                </p>
              )}
            </div>
          </div>

          {/* Address Fields */}
          {showAddress && (
            <>
              <div className={styles.field}>
                <label htmlFor="address1" className={styles.label}>
                  Address
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="address1"
                    type="text"
                    value={address.address1}
                    onChange={handlers.handleAddressChange("address1")}
                    placeholder="Street address"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <div className={styles.inputWrapper}>
                  <input
                    id="address2"
                    type="text"
                    value={address.address2}
                    onChange={handlers.handleAddressChange("address2")}
                    placeholder="Apt, suite, etc. (optional)"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className={cn(styles.field, "flex-1")}>
                  <div className={styles.inputWrapper}>
                    <input
                      id="city"
                      type="text"
                      value={address.city}
                      onChange={handlers.handleAddressChange("city")}
                      placeholder="City"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={cn(styles.field, "flex-1")}>
                  <div className={styles.inputWrapper}>
                    <input
                      id="state"
                      type="text"
                      value={address.state}
                      onChange={handlers.handleAddressChange("state")}
                      placeholder="State"
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className={cn(styles.field, "flex-1")}>
                  <div className={styles.inputWrapper}>
                    <input
                      id="zip"
                      type="text"
                      value={address.zip}
                      onChange={handlers.handleAddressChange("zip")}
                      placeholder="ZIP Code"
                      inputMode="numeric"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={cn(styles.field, "flex-1")}>
                  <div className={styles.inputWrapper}>
                    <input
                      id="country"
                      type="text"
                      value={address.country}
                      onChange={handlers.handleAddressChange("country")}
                      placeholder="Country"
                      className={styles.input}
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
            className={styles.submitButton(validation.isValid, isSubmitting)}
          >
            {isSubmitting ? "Processing..." : submitLabel}
          </button>

          {renderFooter?.()}
        </form>
      </div>
    </div>
  );
}
