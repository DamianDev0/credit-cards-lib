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

const DEFAULT_INPUT_LABELS = {
  cardNumber: "Card Number",
  cardholderName: "Cardholder Name",
  expiryDate: "Expiry",
  cvv: "CVV",
  bankName: "Bank Name",
  address: "Address",
  address2: "Apt, suite, etc. (optional)",
  city: "City",
  state: "State",
  zip: "ZIP Code",
  country: "Country",
};

const DEFAULT_INPUT_PLACEHOLDERS = {
  cardNumber: "0000 - 0000 - 0000 - 0000",
  cardholderName: "JOHN DOE",
  expiryDate: "MM/YY",
  cvv: "•••",
  bankName: "BANK NAME",
  address: "Street address",
  address2: "Apt, suite, etc. (optional)",
  city: "City",
  state: "State",
  zip: "ZIP Code",
  country: "Country",
};

export function CreditCardWithForm({
  layout = "vertical",
  gap = "2rem",
  onSubmit,
  onCardChange,
  onValidationError,
  isSubmitting: isSubmittingProp,
  disabled = false,
  submitLabel = "Submit",
  showBankName = false,
  showAddress = false,
  showSubmitButton = true,
  customFields = [],
  customFieldsPosition = "after",
  initialValues,
  className,
  cardClassName,
  formClassName,
  cardSize = "lg",
  cardWidth,
  cardAnimation,
  cardGradient,
  cardVisibility,
  cardPlaceholders,
  cardLabels,
  cardStyle,
  cardClassNames,
  formInputLabels,
  formInputPlaceholders,
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
    autoSubmitting,
    getFirstError,
    handlers,
  } = useCreditCardForm({
    initialValues,
    showBankName,
    showAddress,
    customFields,
    onCardChange,
    onSubmit,
    onValidationError,
  });

  // Auto-manage isSubmitting: prop takes precedence, then auto-detect from Promise
  const isSubmitting = isSubmittingProp ?? autoSubmitting;

  const labels = { ...DEFAULT_INPUT_LABELS, ...formInputLabels };
  const placeholders = { ...DEFAULT_INPUT_PLACEHOLDERS, ...formInputPlaceholders };
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
              disabled={disabled}
              className={styles.input}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div className={cn(LAYOUT_CLASSES[layout], "w-full", className)} style={{ gap: gapStyle }}>
      <div className={cn("w-full flex justify-center", layout !== "vertical" && "lg:flex-1 lg:min-w-[320px] lg:shrink-0", cardClassName)}>
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
          width={cardWidth}
          animation={cardAnimation}
          gradient={cardGradient}
          visibility={cardVisibility}
          placeholders={cardPlaceholders}
          labels={cardLabels}
          style={cardStyle}
          classNames={cardClassNames}
          {...cardProps}
        />
      </div>

      <div className={cn("w-full", layout !== "vertical" && "lg:flex-1", formClassName)}>
        <form
          onSubmit={handlers.handleSubmit}
          className={cn("w-full max-w-md mx-auto space-y-4 sm:space-y-5", formProps?.className)}
        >
          {renderHeader?.()}

          {showBankName && (
            <div className={styles.field}>
              <label htmlFor="bankName" className={styles.label}>
                {labels.bankName}
              </label>
              <p className={styles.hint}>Optional</p>
              <div className={styles.inputWrapper}>
                <input
                  id="bankName"
                  type="text"
                  value={bankName}
                  onChange={handlers.handleBankNameChange}
                  placeholder={placeholders.bankName}
                  maxLength={20}
                  disabled={disabled}
                  className={cn(styles.input, "uppercase")}
                />
              </div>
            </div>
          )}

          {customFieldsPosition === "before" && renderCustomFields(customFields)}

          <div className={styles.field}>
            <label htmlFor="cardNumber" className={styles.label}>
              {labels.cardNumber}
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
                placeholder={placeholders.cardNumber}
                inputMode="numeric"
                autoComplete="cc-number"
                disabled={disabled}
                className={cn(styles.input, "font-mono tracking-wider")}
              />
              {validation.cardNumber && state.cardNumber.length > 0 && (
                <div className={styles.validIcon}>
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

          <div className={styles.field}>
            <label htmlFor="cardholderName" className={styles.label}>
              {labels.cardholderName}
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="cardholderName"
                type="text"
                value={state.cardholderName}
                onChange={handlers.handleCardholderNameInput}
                onFocus={handlers.handleFocus("cardholderName")}
                onBlur={handlers.handleBlur}
                placeholder={placeholders.cardholderName}
                maxLength={22}
                autoComplete="cc-name"
                disabled={disabled}
                className={cn(styles.input, "uppercase")}
              />
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <div className={cn(styles.field, "flex-1")}>
              <label htmlFor="expiryDate" className={styles.label}>
                {labels.expiryDate}
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="expiryDate"
                  type="text"
                  value={state.expiryDate}
                  onChange={handlers.handleExpiryInput}
                  onFocus={handlers.handleFocus("expiryDate")}
                  onBlur={handlers.handleBlur}
                  placeholder={placeholders.expiryDate}
                  maxLength={CARD_LIMITS.maxExpiryLength}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  disabled={disabled}
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
                {labels.cvv}
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="cvv"
                  type="password"
                  value={state.cvv}
                  onChange={handlers.handleCvvInput}
                  onFocus={handlers.handleFocus("cvv")}
                  onBlur={handlers.handleBlur}
                  placeholder={placeholders.cvv}
                  maxLength={CARD_LIMITS.maxCvvLength}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  disabled={disabled}
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

          {showAddress && (
            <>
              <div className={styles.field}>
                <label htmlFor="address1" className={styles.label}>
                  {labels.address}
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="address1"
                    type="text"
                    value={address.address1}
                    onChange={handlers.handleAddressChange("address1")}
                    placeholder={placeholders.address}
                    disabled={disabled}
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
                    placeholder={placeholders.address2}
                    disabled={disabled}
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
                      placeholder={placeholders.city}
                      disabled={disabled}
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
                      placeholder={placeholders.state}
                      disabled={disabled}
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
                      placeholder={placeholders.zip}
                      inputMode="numeric"
                      disabled={disabled}
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
                      placeholder={placeholders.country}
                      disabled={disabled}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {customFieldsPosition === "after" && renderCustomFields(customFields)}

          {children}

          {showSubmitButton && (
            <button
              type="submit"
              disabled={!validation.isValid || isSubmitting || disabled}
              className={styles.submitButton(validation.isValid && !disabled, isSubmitting || disabled)}
            >
              {isSubmitting ? "Processing..." : submitLabel}
            </button>
          )}

          {renderFooter?.()}
        </form>
      </div>
    </div>
  );
}
